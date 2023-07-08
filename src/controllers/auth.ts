import { NextFunction, Request, Response } from 'express';

let redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

if (process.env.NODE_ENV === 'prod') {
  redirectUrl = `${process.env.BASE_URL}`;
}

const login = (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.redirect(`${redirectUrl}/api-docs`);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};

export { login, logout };
