import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMemberTable1525326619668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'member',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'team_id',
                    type: 'bigint',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createForeignKey('member', new TableForeignKey({
            columnNames: ['team_id'],
            referencedTableName: 'team',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('member', 'team_id');
        await queryRunner.dropTable('member');
    }

}
