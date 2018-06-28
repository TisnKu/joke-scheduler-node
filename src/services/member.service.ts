import { Service } from '@tsed/common';
import { Member } from '../entity/Member';

@Service()
export class MemberService {
    getAllMembersByTeamId(teamId: number) {
        return Member.find({ where: { team: { id: teamId } }, order: { id: 'ASC'} });
    }

    createMembers(members: Member[]) {
        return Member.save(members);
    }

    deleteMember(memberId: number) {
        return Member.delete(memberId);
    }
}