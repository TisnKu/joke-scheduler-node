import { BodyParams, Controller, Delete, Get, PathParams, Post, Status } from 'ts-express-decorators';
import { Team } from '../entity/Team';
import { TeamService } from '../services/team.service';
import { HTTPStatusCodes } from '../types/http';

@Controller('/team')
export class TeamController {

    constructor(private teamService: TeamService) {
    }

    @Get('')
    @Status(HTTPStatusCodes.OK)
    async getTeams(): Promise<Team[]> {
        return await this.teamService.getAllTeams();
    }

    @Post('/')
    @Status(HTTPStatusCodes.CREATED)
    async createTeam(@BodyParams('name') teamName: any): Promise<Team> {
        return await this.teamService.createTeam(teamName);
    }

    @Delete('/:id')
    @Status(HTTPStatusCodes.OK)
    async deleteTeam(@PathParams('id') teamId: number) {
        console.log(JSON.stringify(teamId));
        return await this.teamService.deleteTeam(teamId);
    }
}