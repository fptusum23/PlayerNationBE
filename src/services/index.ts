
import { ErrorService } from "./errorService";


// Crud
import { ICrudExecOption, ICrudOptionMongo, BaseMongoService } from "./base/baseMongo.service";
import { NationService } from "./api/v1/nation.service";
import { BaseSequelizeService, ICrudOptionSequelize } from "./base/baseSequelize.service";
import { UserService } from "./api/v1/user.service";
import { TokenService } from "./common/token.service";
import { ScheduleService } from "./common/schedule.service";
import { ImageService } from "./api/image.service";
import { UtilService } from "./common/utilService";
import { FileService } from "./api/file.service";
import { PlayerService } from "./api/v1/player.service";
import { BcryptService } from "./common/bcrypt.service";
import { LoginService } from "./common/login.service";
import { AuthService } from "./api/v1/auth.service";
import { NodemailerService } from "./common/nodemailer.service";
// import { FirebaseService } from "./common/firebase.service";

const fileService = new FileService();
const imageService = new ImageService();
// const firebaseService = new FirebaseService();
const scheduleService = new ScheduleService();
const tokenService = new TokenService();
const utilService = new UtilService();
const loginService = new LoginService()
const bcryptService = new BcryptService();
const errorService = new ErrorService();
const nodemailerService = new NodemailerService();

const nationService = new NationService();
const userService = new UserService();
const playerService = new PlayerService();
const authService = new AuthService();

export {
  BaseMongoService,
  BaseSequelizeService,
  ICrudExecOption,
  ICrudOptionMongo,
  ICrudOptionSequelize,
  scheduleService,
  errorService,
  utilService,
  tokenService,
  bcryptService,
  imageService,
  nodemailerService,
  fileService,
  loginService,
  //firebaseService,
  // CRUD
  nationService,
  userService,
  playerService,
  authService


};
