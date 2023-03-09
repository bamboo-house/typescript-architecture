import { MoveGateway } from "../dataaccess/moveGateway";
import { SquareGateway } from "../dataaccess/squareGateway";
import { TurnGateway } from "../dataaccess/turnGateway";
import { Turn } from "./turn";
import mysql from "mysql2/promise";

const turnGateway = new TurnGateway();
const squareGateway = new SquareGateway();
const moveGateway = new MoveGateway();


export class TurnRepository {
  async findForGameIdAndTurnCount(
    conn: mysql.Connection
    gameId: number,
    turnCount: number
  ): Promise<Turn>{
    const turnRecord = await turnGateway.findForGameIdAndTurnCount(
      conn,
      gameId,
      turnCount
    );
    if (!turnRecord) {
      throw new Error("Specified turn not found");
    }

    const squareRecords = await squareGateway.findForTurnId(
      conn,
      turnRecord.id
    );
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)));
    squareRecords.forEach((s) => {
      board[s.y][s.x] = s.disc;
    });

    const moveRecord = await moveGateway.findForTurnId(conn, turnRecord.id);
  }
}