import { BaseController } from "@/controllers/base/base.controller";
import { authService } from "@/services";
import { Request, Response } from "@/controllers/base/base.controller"
import { AuthService } from "@/services/api/v1/auth.service";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
export class AuthController extends BaseController {
    constructor() {
        super()
        this.service = authService
        this.path = 'auth'
        this.router.get('/login', this.route(this.login));
    }
    service: AuthService
    async login(req: Request, res: Response) {
        const { username, password } = req.body
        const loginInAppRequest: ILoginInAppRequest = {
            username, password
        }
        const result = await this.service.userLoginInApp(loginInAppRequest);
        this.onSuccess(res, result);
    }
}
