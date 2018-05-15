import {
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    QueryParams,
    Required,
    Status
} from '@tsed/common';
import { MemberService } from '../services/member.service';
import { Member } from '../entity/Member';
import { DeleteResult } from 'typeorm';
import { HTTPStatusCodes } from '../types/http';

@Controller('/member')
export class MemberController {

    constructor(private memberService: MemberService) {
    }

    @Get('')
    @Status(HTTPStatusCodes.OK)
    async getTeamMembers(@Required() @QueryParams('team_id') teamId: number): Promise<Member[]> {
        return await this.memberService.getAllMembersByTeamId(teamId);
    }

    @Post('')
    @Status(HTTPStatusCodes.CREATED)
    async createMembers(@BodyParams() body: Member[]) {
        return await this.memberService.createMembers(body);
    }

    @Delete('/:id')
    @Status(HTTPStatusCodes.OK)
    async deleteMember(@PathParams('id') memberId: number): Promise<DeleteResult> {
        return await this.memberService.deleteMember(memberId);
    }
}