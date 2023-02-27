import { userRepository } from "@/repositories";
import { BaseMongoService } from "@/services/base/baseMongo.service";


export class UserService extends BaseMongoService<typeof userRepository> {
    constructor() {
        super(userRepository);
    }
}
