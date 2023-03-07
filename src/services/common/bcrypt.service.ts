import * as bcrypt from 'bcrypt';

export class BcryptService {
    constructor() { }

    async hashData(data: string, saltRounds: number = 10): Promise<string> {
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data, salt);
    }

    async compareDataWithHash(data: string, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash)
    }
}