import { IAccessToken } from "@/interfaces/auth/accessToken.interface";
import { IChangePasswordRequest } from "@/interfaces/auth/changePasswordRequest.interface";
import { IForgotPasswordRequest } from "@/interfaces/auth/forgotPasswordRequest.interface";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { IResetPasswordRequest } from "@/interfaces/auth/resetPasswordRequest.interface";
import { IUpdateProfileRequest } from "@/interfaces/auth/updateProfileRequest.interface";
import { userRepository } from "@/repositories";
import { bcryptService, errorService, loginService, nodemailerService, tokenService } from "@/services";
import { ERROR_MESSAGE } from "@/services/errors/errorMessage";

export class AuthService {
    async info(_id: string): Promise<ILoginResponse> {
        return await loginService.info(_id)
    }
    async updateProfile(_id: string, updateProfileRequest: IUpdateProfileRequest) {
        return await userRepository.update(updateProfileRequest, { filter: { _id } })
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

    async changePassword(changePasswordRequest: IChangePasswordRequest) {
        const { id, newPassword, oldPassword } = changePasswordRequest;
        const user = await userRepository.findById(id);
        const checkPassword = await bcryptService.compareDataWithHash(oldPassword, user.password)
        if (!checkPassword) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.PASSWORD_INCORRECT);
        }
        return await userRepository.update({ password: await bcryptService.hashData(newPassword) }, { filter: { _id: id } })
    }
    async resetPassword(resetPasswordRequest: IResetPasswordRequest) {
        const { newPassword, token } = resetPasswordRequest;
        const result = tokenService.decodeToken(token);
        return await userRepository.update({ password: await bcryptService.hashData(newPassword) }, { filter: { _id: result.id } })
    }
    async forgotPassword(forgotPasswordRequest: IForgotPasswordRequest) {
        const { callbackUrl, email } = forgotPasswordRequest
        const userEntity = await userRepository.findByEmail(email);
        const accessTokenPayload: IAccessToken = {
            id: userEntity._id,
            loginType: userEntity.loginType,
            roles: [userEntity.role],
            type: "USER"
        }
        const accessToken = await loginService.generateAccessToken(accessTokenPayload);
        const url = `${callbackUrl}?token=${accessToken}`
    
        return await nodemailerService.sendEmail({
            to: email,
            preview: `Hello ${email}`,
            description: `  
             <p style="text-align: center">
                <a href="${url}"
                style=" margin: auto; background:#868686;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; padding:16px 20px;display:inline-block;border-radius:2px;">
                Click me</a>
             </p>
        `
        })
    }
}
