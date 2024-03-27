terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.92.0"
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
