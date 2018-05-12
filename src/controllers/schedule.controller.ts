import { Controller, Get, Patch, QueryParams, Required, Status } from 'ts-express-decorators';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../entity/Schedule';
import { TodayScheduleDTO } from '../dto/TodayScheduleDTO';
import { HTTPStatusCodes } from '../types/http';

@Controller('/schedule')
export class ScheduleController {

    constructor(private scheduleService: ScheduleService) {
    }

    @Get('/today')
    @Status(HTTPStatusCodes.OK)
    async getUser(@Required() @QueryParams('team_id') teamId: number): Promise<TodayScheduleDTO> {
        return this.scheduleService.getTodayScheduleResponse(teamId);
    }

    @Patch('/move')
    @Status(HTTPStatusCodes.OK)
    async moveTodaySchedule(@QueryParams('team_id') teamId: number, @QueryParams('is_forward') isForward: boolean): Promise<Schedule> {
        return this.scheduleService.moveTodaySchedule(teamId, isForward);
    }
}