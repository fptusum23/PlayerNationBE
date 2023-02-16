
import { nationRepository } from "@/repositories";
import { BaseMongoService } from "@/services/base/baseMongo.service";


export class NationService extends BaseMongoService<typeof nationRepository> {
    constructor() {
        super(nationRepository);
    }
}
