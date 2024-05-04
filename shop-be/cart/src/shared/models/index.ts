import { Request } from 'express';

export interface AppRequest extends Request {
  requestContext?: {
    authorizer: {
      userId: string;
    };
  };
}
