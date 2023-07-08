import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const handleErrors = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const universalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'dev') console.log({ err });
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
  });
};

export const fourOhFour = (err: any, req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: 'Sorry, we appear to have lost that page.' });
};

export const addUniversalResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
};

export const validate = (schema: Joi.ObjectSchema, customOptions?: Joi.BaseValidationOptions) => {
  const options = {
    abortEarly: false,
    debug: process.env.NODE_ENV === 'dev' ? true : false,
    stack: process.env.NODE_ENV === 'dev' ? true : false,
    stripUnknown: false,
    ...customOptions,
  };
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, options);
    if (error) {
      let errors = error.details.map((err) => {
        let msg = err.message.replace(/"/g, '');
        return msg.charAt(0).toUpperCase() + msg.slice(1);
      });
      return res.status(400).json({ validationErrors: errors });
    }
    next();
  };
};

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
};
