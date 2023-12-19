# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "front_end_rg" {
  name     = "rg-frontend-sand-ne-001"
  location = "northeurope"
}

resource "azurerm_storage_account" "front_end_storage_account" {
  name                     = "stgsandfrontendne0001"
  location                 = "northeurope"

  account_replication_type = "LRS"
  account_tier             = "Standard"
  account_kind             = "StorageV2"
  resource_group_name      = azurerm_resource_group.front_end_rg.name

  static_website {
    index_document = "index.html"
  }
}

## Product Service Function
resource "azurerm_resource_group" "product_service_rg" {
  location = "northeurope"
  name     = "rg-product-service-sand-ne-001"
}

resource "azurerm_storage_account" "products_service_fa" {
  name     = "stgsangproductsfane0001"
  location = "northeurope"

  account_replication_type = "LRS"
  account_tier             = "Standard"
  account_kind             = "StorageV2"

  resource_group_name = azurerm_resource_group.product_service_rg.name
}

resource "azurerm_storage_share" "products_service_fa" {
  name  = "fa-products-service-share"
  quota = 2

  storage_account_name = azurerm_storage_account.products_service_fa.name
}

resource "azurerm_service_plan" "product_service_plan" {
  name     = "asp-product-service-sand-ne-001"
  location = "northeurope"

  os_type  = "Windows"
  sku_name = "Y1"

  resource_group_name = azurerm_resource_group.product_service_rg.name
}

resource "azurerm_application_insights" "products_service_fa" {
  name             = "appins-fa-products-service-sand-ne-001"
  application_type = "web"
  location         = "northeurope"

  resource_group_name = azurerm_resource_group.product_service_rg.name
}

resource "azurerm_windows_function_app" "products_service" {
  name     = "fa-products-service-ne-0001"
  location = "northeurope"

  service_plan_id     = azurerm_service_plan.product_service_plan.id
  resource_group_name = azurerm_resource_group.product_service_rg.name

  storage_account_name       = azurerm_storage_account.products_service_fa.name
  storage_account_access_key = azurerm_storage_account.products_service_fa.primary_access_key

  functions_extension_version = "~4"
  builtin_logging_enabled     = false

  site_config {
    always_on = false

    application_insights_key               = azurerm_application_insights.products_service_fa.instrumentation_key
    application_insights_connection_string = azurerm_application_insights.products_service_fa.connection_string

    # For production systems set this to false
    use_32_bit_worker = false

    # Enable function invocations from Azure Portal.
    cors {
      allowed_origins = ["https://portal.azure.com"]
    }

    application_stack {
      node_version = "~16"
    }
  }

  app_settings = {
    WEBSITE_CONTENTAZUREFILECONNECTIONSTRING = azurerm_storage_account.products_service_fa.primary_connection_string
    WEBSITE_CONTENTSHARE                     = azurerm_storage_share.products_service_fa.name
  }

  # The app settings changes cause downtime on the Function App. e.g. with Azure Function App Slots
  # Therefore it is better to ignore those changes and manage app settings separately off the Terraform.
  lifecycle {
    ignore_changes = [
      app_settings,
      tags["hidden-link: /app-insights-instrumentation-key"],
      tags["hidden-link: /app-insights-resource-id"],
      tags["hidden-link: /app-insights-conn-string"]
    ]
  }
}

## App Config
resource "azurerm_app_configuration" "products_config" {
  location            = "northeurope"
  name                = "appconfig-products-service-sand-ne-001"
  resource_group_name = azurerm_resource_group.product_service_rg.name

  sku = "free"
}

## APIM
resource "azurerm_resource_group" "apim" {
  location = "northeurope"
  name     = "rg-apim-sand-ne-001"
}

## API Management
resource "azurerm_api_management" "core_apim" {
  location        = "northeurope"
  name            = "apim-sand-ne-0001"
  publisher_email = "dmytro_shulzhenko@epam.com"
  publisher_name  = "Dmytro Shulzhenko"

  resource_group_name = azurerm_resource_group.apim.name
  sku_name            = "Consumption_0"
}

## API Products
resource "azurerm_api_management_api" "products_api" {
  api_management_name = azurerm_api_management.core_apim.name
  name                = "products-service-api"
  resource_group_name = azurerm_resource_group.apim.name
  revision            = "1"
  path                = "products-service"

  display_name = "Products Service API"

  protocols = ["https"]
}

## Backend
data "azurerm_function_app_host_keys" "products_keys" {
  name                = azurerm_windows_function_app.products_service.name
  resource_group_name = azurerm_resource_group.product_service_rg.name
}

resource "azurerm_api_management_backend" "products_fa" {
  name                = "products-service-backend"
  resource_group_name = azurerm_resource_group.apim.name
  api_management_name = azurerm_api_management.core_apim.name
  protocol            = "http"
  url                 = "https://${azurerm_windows_function_app.products_service.name}.azurewebsites.net/api"
  description         = "Products API"

  credentials {
    certificate = []
    query       = {}

    header = {
      "x-functions-key" = data.azurerm_function_app_host_keys.products_keys.default_function_key
    }
  }
}

## API Policy
resource "azurerm_api_management_api_policy" "api_policy" {
  api_management_name = azurerm_api_management.core_apim.name
  api_name            = azurerm_api_management_api.products_api.name
  resource_group_name = azurerm_resource_group.apim.name

  xml_content = <<XML
 <policies>
 	<inbound>
 		<set-backend-service backend-id="${azurerm_api_management_backend.products_fa.name}"/>
 		<base/>
 	</inbound>
 	<backend>
 		<base/>
 	</backend>
 	<outbound>
 		<base/>
 	</outbound>
 	<on-error>
 		<base/>
 	</on-error>
 </policies>
XML
}

## API Operation
resource "azurerm_api_management_api_operation" "get_products" {
  api_management_name = azurerm_api_management.core_apim.name
  api_name            = azurerm_api_management_api.products_api.name
  display_name        = "Get Products"
  method              = "GET"
  operation_id        = "get-products"
  resource_group_name = azurerm_resource_group.apim.name
  url_template        = "/products"
}
