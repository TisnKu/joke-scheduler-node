import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './Member';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @ManyToOne(() => Member)
    @JoinColumn({ name: 'member_id' })
    member: Member;

    @Column()
    updated_at: number;

    @Column()
    created_at: number;
}