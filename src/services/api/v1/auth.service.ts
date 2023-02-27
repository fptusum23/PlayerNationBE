import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { loginService } from "@/services";

export class AuthService {
    async info(_id: string): Promise<ILoginResponse> {
        return await loginService.info(_id)
    }


    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        return await loginService.userLoginInApp(reqLogin)
    }

    async userRegisterInApp(reqRegister: IRegisterUserInAppRequest): Promise<ILoginResponse> {
        return await loginService.userRegisterInApp(reqRegister)
    }

    async revokeTokenInApp(revokeToken: IRevokeTokenRequest): Promise<ILoginResponse> {
        return await loginService.userRevokeTokenInApp(revokeToken)
    }

}
