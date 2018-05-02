import { Service } from 'ts-express-decorators';
import { getManager } from 'typeorm';
import { Member } from '../entity/Member';

@Service()
export class MemberService {
    constructor() {
    }


    async getAllMembers() {
        return getManager().getRepository(Member).find();
    }
}