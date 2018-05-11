import { Service } from 'ts-express-decorators';
import { Member } from '../entity/Member';

@Service()
export class MemberService {
    getAllMembersByTeamId(teamId: number) {
        return Member.find({ where: { team: { id: teamId } } });
    }

    createMembers(members: Member[]) {
        return Member.save(members);
    }

    deleteMember(memberId: number) {
        return Member.delete(memberId);
    }
}