import { BaseMongoController } from "@/controllers/base/baseMongo.controller";
import { playerService } from "@/services";





export class playerController extends BaseMongoController<typeof playerService> {
    constructor() {
        super(playerService);
        this.path = 'player'
    }
}
