import { Team } from './Team';
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team_id' })
    team: Team;
}