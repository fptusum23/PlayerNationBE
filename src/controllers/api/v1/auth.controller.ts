import { BaseController } from "@/controllers/base/base.controller";
import { authService } from "@/services";
import { Request, Response } from "@/controllers/base/base.controller"
import { AuthService } from "@/services/api/v1/auth.service";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { IChangePasswordRequest } from "@/interfaces/auth/changePasswordRequest.interface";
import { IForgotPasswordRequest } from "@/interfaces/auth/forgotPasswordRequest.interface";
import { IResetPasswordRequest } from "@/interfaces/auth/resetPasswordRequest.interface";
import { IUpdateProfileRequest } from "@/interfaces/auth/updateProfileRequest.interface";
export class AuthController extends BaseController {
    constructor() {
        super()
        this.service = authService
        this.path = 'auth'
        this.router.get('/info', this.authMiddlewares(), this.route(this.info));
        this.router.post('/login', this.route(this.login));
        this.router.post('/register', this.route(this.userRegisterInApp));
        this.router.post('/token', this.route(this.revokeToken));
        this.router.post('/change_password', this.authMiddlewares(), this.route(this.changePassword));
        this.router.post('/forgot_password', this.route(this.forgotPassword));
        this.router.post('/reset_password', this.route(this.resetPassword));
        this.router.put('/profile', this.authMiddlewares(), this.route(this.updateProfile));
    }
    service: AuthService
    async info(req: Request, res: Response) {
        const _id = `${req.tokenInfo?.id}`
        const result = await this.service.info(_id);
        this.onSuccess(res, result);
    }
    async updateProfile(req: Request, res: Response) {
        const _id = `${req.tokenInfo?.id}`
        const updateProfileRequest: IUpdateProfileRequest = {
            ...req.body,
        }
        const result = await this.service.updateProfile(_id,updateProfileRequest);
        this.onSuccess(res, result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        const loginInAppRequest: ILoginInAppRequest = {
            email, password
        }
        const result = await this.service.userLoginInApp(loginInAppRequest);
        this.onSuccess(res, result);
    }
    async userRegisterInApp(req: Request, res: Response) {
        const registerInAppRequest: IRegisterUserInAppRequest = {
            ...req.body,
        }
        const result = await this.service.userRegisterInApp(registerInAppRequest);
        this.onSuccess(res, result);
    }

    async revokeToken(req: Request, res: Response) {
        const revokeTokenRequest: IRevokeTokenRequest = {
            ...req.body
        }
        const result = await this.service.revokeTokenInApp(revokeTokenRequest);
        this.onSuccess(res, result);
    }

    async changePassword(req: Request, res: Response) {
        const _id = `${req.tokenInfo?.id}`
        const changePasswordRequest: IChangePasswordRequest = {
            ...req.body,
            id: _id
        }
        const result = await this.service.changePassword(changePasswordRequest);
        this.onSuccess(res, result);
    }
    async forgotPassword(req: Request, res: Response) {
        const forgotPasswordRequest: IForgotPasswordRequest = {
            ...req.body,
        }
        const result = await this.service.forgotPassword(forgotPasswordRequest);
        this.onSuccess(res, result);
    }

    async resetPassword(req: Request, res: Response) {
        const resetPasswordRequest: IResetPasswordRequest = {
            ...req.body,
        }
        const result = await this.service.resetPassword(resetPasswordRequest);
        this.onSuccess(res, result);
    }
}
