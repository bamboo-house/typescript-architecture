import mysql from "mysql2/promise";
import { MoveRecord } from "./moveRecord";

export class MoveGateway {
  async findForTurnId(
    conn: mysql.Connection,
    turnId: number
  ): Promise<MoveRecord | undefined> {
    const moveSelectResult = await conn.execute<mysql.RowDataPacket[]>();
  }
  async insert(
    conn: mysql.Connection,
    turnId: number,
    disc: number,
    x: number,
    y: number
  ) {
    await conn.execute(
      "insert into moves (turn_id, disc, x, y) values(?, ?, ?, ?)",
      [turnId, disc, x, y]
    );
  }
}
