import { Controller, Get, QueryParams, Required } from 'ts-express-decorators';
import { MemberService } from '../services/member.service';
import { Member } from '../entity/Member';

@Controller('/members')
export class MemberController {

    constructor(private memberService: MemberService) {
    }

    @Get('')
    async getUser(@Required() @QueryParams('team_id') teamId: string): Promise<Member[]> {
        return await this.memberService.getAllMembersByTeamId(teamId);
    }
}