import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';

const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction):void => {
  console.log(err);
  
  if (err instanceof CustomError) {
     res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
    return
  }

    res.status(500).json({
    status: false,
    message: 'Something went wrong!',
  });
  return
};

export default errorMiddleware;