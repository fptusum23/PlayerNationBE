import { BaseSequelizeController } from "@/controllers/base/baseSequelize.controller";
import { userService } from "@/services";



export class UserController extends BaseSequelizeController<typeof userService> {
    constructor() {
        super(userService);
        this.path = 'user'
    }
}
