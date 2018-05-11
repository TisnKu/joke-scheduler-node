import {
    BaseEntity, BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Member } from './Member';
import { Team } from './Team';

@Entity()
export class Schedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @ManyToOne(() => Member, { eager: true })
    @JoinColumn({ name: 'member_id' })
    member: Member;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Column()
    updated_at: number;

    @Column()
    created_at: number;

    static of(date: string, member: Member): Schedule {
        const schedule = new Schedule();
        schedule.date = date;
        schedule.member = member;
        schedule.team = member.team;
        return schedule;
    }

    @BeforeUpdate()
    updateDates() {
        this.updated_at = new Date().getTime();
    }
}