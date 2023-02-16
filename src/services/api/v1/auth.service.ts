import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { loginService } from "@/services";

export class AuthService {
    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        return await loginService.userLoginInApp(reqLogin)
    }
}
