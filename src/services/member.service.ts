import { Service } from 'ts-express-decorators';
import { Member } from '../entity/Member';

@Service()
export class MemberService {
    getAllMembersByTeamId(teamId: string) {
        return Member.find({ where: { team: { id: teamId } } });
    }
}