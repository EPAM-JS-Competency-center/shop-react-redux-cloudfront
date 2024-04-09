import { AppConfigurationClient } from '@azure/app-configuration';
import { Context } from '@azure/functions/types/Context';

const getConfigFromConfigService = async (ctx: Context) => {
  // Create an App Config Client to interact with the service
  const connection_string = process.env.AZURE_APP_CONFIG_CONNECTION_STRING;
  const client = new AppConfigurationClient(connection_string);

  // Retrieve a configuration key
  const configs = await client.getConfigurationSetting({
    key: 'DATA_FROM_APP_CONFIG',
  });
  ctx.log('configs::', configs);
};

export default getConfigFromConfigService;
