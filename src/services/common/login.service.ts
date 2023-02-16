import { ELoginType } from "@/enums/loginType.enum";
import { ERole } from "@/enums/role.enum";
import { IAccessToken } from "@/interfaces/auth/accessToken.interface";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { UserEntity } from "@/models/entities";
import { refreshTokenUserRepository, userRepository } from "@/repositories";
import { bcryptService, errorService, tokenService } from "..";
import { ERROR_MESSAGE } from "../errors/errorMessage";

export class LoginService {
    constructor() { }

    async registerUser(registerRequest: IRegisterUserInAppRequest): Promise<ILoginResponse> {
        const existedUser = await userRepository.findByEmail(registerRequest.email);

        if (existedUser) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_ALREADY_REGISTERED)
        }
        registerRequest.password = await bcryptService.hashData(registerRequest.password);
        const { username, password } = await userRepository.create(registerRequest, {});

        const reqLogin: ILoginInAppRequest = {
            username,
            password
        }
        return await this.userLoginInApp(reqLogin)
    }


    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        const { username, password } = reqLogin
        let userEntity = await UserEntity.findOne({
            where: {
                username,
            },
        })
        if (!userEntity) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_DOES_NOT_EXIST);
        }
        if (userEntity.loginType != ELoginType.INAPP) {
            switch (userEntity.loginType) {
                case ELoginType.GOOGLE: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_GOOGLE)
                }
                case ELoginType.APPLE: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_APPLE)
                }
                case ELoginType.KAKAO: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_KAKAOTALK)
                }
            }
        }
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
            refreshToken: await this.generateRefreshTokenUser(accessTokenPayload.id)
        };
    }

    async generateAccessToken(accessTokenPayload: IAccessToken): Promise<string> {
        return await tokenService.generateToken(accessTokenPayload)
    }

    async generateRefreshTokenUser(userId: string): Promise<string> {
        const refreshTokenUser = await refreshTokenUserRepository.findOneByUserId(userId);
        if (refreshTokenUser) {
            try {
                await tokenService.decodeToken(refreshTokenUser.refreshToken);
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