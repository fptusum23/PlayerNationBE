import { NationSchema } from "@/models/collections";
import { BaseMongoRepository } from "../base/baseMongo.repository";


export class NationRepository extends BaseMongoRepository<typeof NationSchema>{
    constructor() {
        super(NationSchema)
    }
}