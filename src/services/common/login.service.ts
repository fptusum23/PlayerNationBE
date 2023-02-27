import { ERole } from "@/enums/role.enum";
import { IAccessToken } from "@/interfaces/auth/accessToken.interface";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { refreshTokenUserRepository, userRepository } from "@/repositories";
import { bcryptService, errorService, tokenService } from "..";
import { ERROR_MESSAGE } from "../errors/errorMessage";

export class LoginService {
    constructor() { }
    async info(_id: string): Promise<any> {

        return await userRepository.findOne({ filter: { _id } });
    }
    async userRegisterInApp(registerRequest: IRegisterUserInAppRequest): Promise<ILoginResponse> {
        const reqLogin: ILoginInAppRequest = {
            ...registerRequest
        }
        const existedUser = await userRepository.findByEmail(registerRequest.email);

        if (existedUser) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_ALREADY_REGISTERED)
        }
        registerRequest.password = await bcryptService.hashData(registerRequest.password);
        await userRepository.create(registerRequest, { filter: {} });
        return await this.userLoginInApp(reqLogin)
    }

    async userRevokeTokenInApp(revokeToken: IRevokeTokenRequest): Promise<ILoginResponse> {
        const refreshToken = await refreshTokenUserRepository.findOneByRefreshToken(revokeToken.refreshToken);
        if (!refreshToken) {
            throw errorService.auth.badToken()
        }
        const { userId } = refreshToken
        const user = await userRepository.findOne({ filter: { _id: userId } });
        if (!user) {
            throw errorService.auth.badToken()
        }
        const accessTokenPayload: IAccessToken = {
            id: user._id,
            loginType: user.loginType,
            roles: [ERole.NORMAL],

            type: "USER"
        }
        const accessToken = await this.generateAccessToken(accessTokenPayload);

        return { accessToken }

    }

    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        const { email, password } = reqLogin
        let userEntity = await userRepository.findOne({
            filter: {
                email
            }
        })
        if (!userEntity) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_DOES_NOT_EXIST);
        }

        console.log("password ===> ", password)
        console.log("password ===> ", userEntity.password)
        if (!await bcryptService.compareDataWithHash(password, userEntity.password)) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.PASSWORD_OR_USERNAME_INCORRECT)
        }
        const accessTokenPayload: IAccessToken = {
            id: userEntity.id,
            loginType: userEntity.loginType,
            roles: [ERole.NORMAL],
            type: "USER"
        }

        return {
            accessToken: await this.generateAccessToken(accessTokenPayload),
            //  refreshToken: await this.generateRefreshTokenUser(accessTokenPayload.id)
        };
    }

    async generateAccessToken(accessTokenPayload: IAccessToken): Promise<string> {
        return await tokenService.generateToken(accessTokenPayload)
    }

    async generateRefreshTokenUser(userId: string): Promise<string> {
        const refreshTokenUser = await refreshTokenUserRepository.findOneByUserId(userId);
        if (refreshTokenUser) {
            try {
                tokenService.decodeToken(refreshTokenUser.refreshToken);
                return refreshTokenUser.refreshToken
            } catch (e) {
            }
        }
        const refreshToken = await tokenService.generateToken({}, { exp: '1 years' })
        const newRefreshTokenUser = await refreshTokenUserRepository.create({
            userId,
            refreshToken
        })
        return newRefreshTokenUser.refreshToken
    }


}