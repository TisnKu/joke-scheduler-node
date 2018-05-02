import { Controller, Get } from 'ts-express-decorators';
import { MemberService } from '../services/member.service';
import { Member } from '../entity/Member';

@Controller('/members')
export class MemberController {

    constructor(private memberService: MemberService) {
    }

    @Get('')
    async getUser(): Promise<Member[]> {
        return await this.memberService.getAllMembers();
    }
}