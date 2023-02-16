import { PlayerSchema } from "@/models/collections";
import { BaseMongoRepository } from "../base/baseMongo.repository";


export class PlayerRepository extends BaseMongoRepository<typeof PlayerSchema>{
    constructor() {
        super(PlayerSchema)
    }
}