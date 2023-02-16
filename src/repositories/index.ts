
import { RefreshTokenUserRepository } from "./common/refreshTokenUser.repository";
import { PlayerRepository } from "./common/player.repository";
import { UserRepository } from "./common/user.repository";
import { NationRepository } from "./common/nation.repository";

const userRepository = new UserRepository();
const playerRepository = new PlayerRepository();
const nationRepository = new NationRepository();
const refreshTokenUserRepository = new RefreshTokenUserRepository();

export {
    userRepository,
    playerRepository,
    nationRepository,
    refreshTokenUserRepository
}