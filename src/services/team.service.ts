import { Service } from 'ts-express-decorators';
import { Team } from '../entity/Team';

@Service()
export class TeamService {
    getAllTeams() {
        return Team.find();
    }

    createTeam(teamName: string) {
        return Team.save(new Team(teamName));
    }

    deleteTeam(teamId: number) {
        return Team.delete(teamId);
    }
}