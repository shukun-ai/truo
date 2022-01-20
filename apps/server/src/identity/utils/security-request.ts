import { Request } from 'express';

export interface SecurityRequest extends Request {
  userId: string | undefined;
}
