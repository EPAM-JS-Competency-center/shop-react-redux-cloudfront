export const isHandlerEnabled = (config: any = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
  }
  return request;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
  }
  return response;
};

export const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
  }
  return Promise.reject({ ...error });
};
