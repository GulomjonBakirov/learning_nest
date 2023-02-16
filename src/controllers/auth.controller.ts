import { NextFunction, Request, Response } from "express";

class AuthController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      let { login, password } = req.body;
      console.log("Login: ", login);
      console.log("Password: ", password);

      res.status(200).json({
        msg: "Thank You",
      });
    } catch (error: any) {
      console.log("Sign Up Error: ", error);
    }
  }
}

export default new AuthController();
