
import { playerRepository } from "@/repositories";
import { BaseMongoService } from "@/services/base/baseMongo.service";


export class PlayerService extends BaseMongoService<typeof playerRepository> {
    constructor() {
        super(playerRepository);
    }
}
