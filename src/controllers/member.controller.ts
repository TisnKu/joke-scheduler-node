import { BodyParams, Controller, Delete, Get, PathParams, Post, QueryParams, Required } from 'ts-express-decorators';
import { MemberService } from '../services/member.service';
import { Member } from '../entity/Member';
import { DeleteResult } from 'typeorm';

@Controller('/member')
export class MemberController {

    constructor(private memberService: MemberService) {
    }

    @Get('')
    async getTeamMembers(@Required() @QueryParams('team_id') teamId: number): Promise<Member[]> {
        return await this.memberService.getAllMembersByTeamId(teamId);
    }

    @Post('')
    async createMembers(@BodyParams() body: Member[]) {
        return await this.memberService.createMembers(body);
    }

    @Delete('/:id')
    async deleteMember(@PathParams('id') memberId: number): Promise<DeleteResult> {
        return await this.memberService.deleteMember(memberId);
    }
}