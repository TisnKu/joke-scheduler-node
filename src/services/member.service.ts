import { Service } from 'ts-express-decorators';
import { Member } from '../entity/Member';

@Service()
export class MemberService {
    constructor() {
    }


    async getAllMembers() {
        return Member.find();
    }
}