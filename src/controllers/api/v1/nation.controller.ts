import { BaseMongoController } from "@/controllers/base/baseMongo.controller";
import { nationService } from "@/services";





export class NationController extends BaseMongoController<typeof nationService> {
    constructor() {
        super(nationService);
        this.path = 'nation'
    }
}
