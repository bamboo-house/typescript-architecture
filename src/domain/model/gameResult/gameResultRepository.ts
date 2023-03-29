import mysql from "mysql2/promise";
import { GameResult } from "./gameResult";
import { GameResultGateway } from "../../../infrastructure/repository/gameResult/gameResultGateway";

const gameResultGateway = new GameResultGateway();

export interface GameResultRepository {
  findForGameId(
    conn: mysql.Connection,
    gameId: number
  ): Promise<GameResult | undefined>;

  save(conn: mysql.Connection, gameResult: GameResult): Promise<void>;
}
