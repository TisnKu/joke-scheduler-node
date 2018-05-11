import { Member } from '../entity/Member';
import { Schedule } from '../entity/Schedule';

export class TodayScheduleDTO {
    members: Member[];
    schedule: Schedule;

    constructor(schedule: Schedule, members: Member[]) {
        this.schedule = schedule;
        this.members = members;
    }
}