import express from "express";
import { TurnGateway } from "../dataaccess/turnGateway";
import { GameGateway } from "../dataaccess/gameGateway";
import { SquareGateway } from "../dataaccess/squareGateway";
import { connectMySQL } from "../dataaccess/connection";
import { TurnRepository } from "../domain/turn/turnRepository";

import { Turn, firstTurn } from "../domain/turn/turn";

const gameGateway = new GameGateway();
const turnGateway = new TurnGateway();
const squareGateway = new SquareGateway();

const turnRepository = new TurnRepository();

export class GameService {
  async startNewGame() {
    const now = new Date();
    const conn = await connectMySQL();

    try {
      await conn.beginTransaction();

      const gameRecord = await gameGateway.insert(conn, now);

      const turn = firstTurn(gameRecord.id, now);

      await turnRepository.save(conn, turn);

      await conn.commit();
    } finally {
      await conn.end();
    }
  }
}
