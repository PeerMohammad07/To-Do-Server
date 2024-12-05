import { NextFunction, Request, Response } from "express";
import { HttpStatusEnum } from "../../enums/statusCodeEnum";
import IUserUseCase from "../../infrastructure/interfaces/IUserUseCase";

export default class UserController {
  private userUseCase: IUserUseCase;

  constructor(userUseCase: IUserUseCase) {
    this.userUseCase = userUseCase;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  private setAuthCookies(res: Response, token: string, refreshToken: string): void {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    };

    res.cookie("userToken", token, { ...cookieOptions, maxAge: 3600000 });
    res.cookie("userRefreshToken", refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const response = await this.userUseCase.register({ name, email, password })
      
      this.setAuthCookies(res, response.data.token, response.data.refreshToken);

      res.status(HttpStatusEnum.OK).json({
        status: true,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error); 
    }
  }

  async login(req: Request<any>, res: Response<any>, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this.userUseCase.login(email, password);

      this.setAuthCookies(res, response.data.token, response.data.refreshToken);

      res.status(HttpStatusEnum.OK).json({
        status: true,
        message: response.message,
        data: response.data.user,
      });
    } catch (error) {
      next(error);  
    }
  }

  async logout(req: Request<any>, res: Response<any>): Promise<void> {
    try {       
      res.cookie("userToken", "", { maxAge: 0 });
      res.cookie("userRefreshToken", "", { maxAge: 0 });
      res.status(HttpStatusEnum.OK).json({ status: true, message: "User logout successfully" });
    } catch (error) {
      console.log(error);
    }
  }

}