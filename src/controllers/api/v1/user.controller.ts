import { BaseMongoController } from "@/controllers/base/baseMongo.controller";
import { userService } from "@/services";



export class UserController extends BaseMongoController<typeof userService> {
    constructor() {
        super(userService);
        this.path = 'user'
    }
}
