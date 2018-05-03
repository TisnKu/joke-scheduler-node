import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableUnique } from 'typeorm/schema-builder/table/TableUnique';

export class CreateScheduleTable1525328320290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'schedule',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'member_id',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'team_id',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'date',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'bigint',
                    isNullable: false,
                    default: '(EXTRACT(EPOCH FROM NOW()) * 1000)',
                },
                {
                    name: 'created_at',
                    type: 'bigint',
                    isNullable: false,
                    default: '(EXTRACT(EPOCH FROM NOW()) * 1000)',
                },
            ],
        }));
        await queryRunner.createUniqueConstraint('schedule', new TableUnique({
            columnNames: ['team_id', 'date'],
        }));
        await queryRunner.createForeignKey('schedule', new TableForeignKey({
            columnNames: ['team_id'],
            referencedTableName: 'team',
            referencedColumnNames: ['id'],
        }));
        await queryRunner.createForeignKey('schedule', new TableForeignKey({
            columnNames: ['member_id'],
            referencedTableName: 'member',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('schedule');
    }

}
