import { Service } from 'ts-express-decorators';
import { Schedule } from '../entity/Schedule';
import DateUtils from '../utils/dateUtils';
import * as _ from 'lodash';
import { Member } from '../entity/Member';
import { LessThan, MoreThan } from 'typeorm';
import { TodayScheduleDTO } from '../dto/TodayScheduleDTO';
import { MemberService } from './member.service';

@Service()
export class ScheduleService {
    constructor(private memberService: MemberService) {
    }

    async getTodaySchedule(teamId: number) {
        const todayDate = DateUtils.getTodayDateStringOfChina();
        const schedule = await this.findLatestSchedule(teamId);
        if (_.isEmpty(schedule)) {
            const onDutyMember = await this.findFirstMember(teamId);
            return Schedule.save(Schedule.of(todayDate, onDutyMember));
        }
        if (schedule.date !== todayDate) {
            return Schedule.save(Schedule.of(todayDate, await this.getNextMember(teamId, schedule.member.id)));
        }
        return schedule;
    }

    async moveTodaySchedule(teamId: number, isForward: boolean) {
        const todaySchedule = await this.getTodaySchedule(teamId);
        if (isForward) {
            todaySchedule.member = await this.getNextMember(teamId, todaySchedule.member.id);
        } else {
            todaySchedule.member = await this.getPreviousMember(teamId, todaySchedule);
        }
        return Schedule.save(todaySchedule);
    }

    private async getPreviousMember(teamId: number, todaySchedule) {
        return await this.findPreviousMember(teamId, todaySchedule.member.id) || await this.findLastMember(teamId);
    }

    private async getNextMember(teamId: number, memberId: number) {
        return await this.findFollowingMember(teamId, memberId) || await this.findFirstMember(teamId);
    }

    private findFollowingMember(teamId: number, memberId: number) {
        return Member.findOne({
            where: { team: { id: teamId }, id: MoreThan(memberId) },
            order: { id: 'ASC' }
        });
    }

    private findFirstMember(teamId: number) {
        return Member.findOne({ where: { team: { id: teamId } }, order: { id: 'ASC' } });
    }

    private findLatestSchedule(teamId: number) {
        return Schedule.findOne({ where: { team: { id: teamId } }, order: { date: 'DESC' } });
    }

    private findPreviousMember(teamId: number, memberId: number) {
        return Member.findOne({
            where: { team: { id: teamId }, id: LessThan(memberId) },
            order: { id: 'DESC' }
        });
    }

    private findLastMember(teamId: number) {
        return Member.findOne({ where: { team: { id: teamId } }, order: { id: 'DESC' } });
    }

    async getTodayScheduleResponse(teamId: number) {
        return new TodayScheduleDTO(await this.getTodaySchedule(teamId), await this.memberService.getAllMembersByTeamId(teamId));
    }
}