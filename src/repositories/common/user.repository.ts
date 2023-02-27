import { UserSchema } from "@/models/collections";
import { BaseMongoRepository } from "../base/baseMongo.repository";


export class UserRepository extends BaseMongoRepository<typeof UserSchema>{
    constructor() {
        super(UserSchema)
    }

    async findByEmail(email: string): Promise<any | null> {
        let query = this.model.findOne()
        query = this.applyQueryOptions(query, { filter: { email } })
        return await this.exec(query, { allowNull: true })

    }
}