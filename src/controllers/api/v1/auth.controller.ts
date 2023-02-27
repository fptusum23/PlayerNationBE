import { BaseController } from "@/controllers/base/base.controller";
import { authService } from "@/services";
import { Request, Response } from "@/controllers/base/base.controller"
import { AuthService } from "@/services/api/v1/auth.service";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
export class AuthController extends BaseController {
    constructor() {
        super()
        this.service = authService
        this.path = 'auth'
        this.router.get('/info', this.authMiddlewares(), this.route(this.info))
        this.router.post('/login', this.route(this.login));
        this.router.post('/register', this.route(this.userRegisterInApp));
        this.router.post('/token', this.route(this.revokeToken));
    }
    service: AuthService
    async info(req: Request, res: Response) {
        const _id = `${req.tokenInfo?.id}`
        const result = await this.service.info(_id);
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
}
