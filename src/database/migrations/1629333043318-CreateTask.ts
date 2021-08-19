import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTask1629333043318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "task",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "completed",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "datetime",
          },
          {
            name: "updated_at",
            type: "datetime",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("task");
  }
}
