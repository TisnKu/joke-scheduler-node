import { Team } from './Team';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity()
export class Member extends BaseEntity {
    @PrimaryGeneratedColumn()
    @IsOptional()
    id?: number;

    @Column()
    name: string;

    @ManyToOne(() => Team, { eager: true })
    @JoinColumn({ name: 'team_id' })
    team: Team;
}