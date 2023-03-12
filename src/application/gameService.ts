import express from "express";
import { TurnGateway } from "../dataaccess/turnGateway";
import { GameGateway } from "../dataaccess/gameGateway";
import { SquareGateway } from "../dataaccess/squareGateway";
import { connectMySQL } from "../dataaccess/connection";
import { TurnRepository } from "../domain/turn/turnRepository";

import { Turn, firstTurn } from "../domain/turn/turn";
import { GameRepository } from "../domain/game/gameRepository";
import { Game } from "../domain/game/game";

const gameRepository = new GameRepository();
const turnRepository = new TurnRepository();

export class GameService {
  async startNewGame() {
    const now = new Date();
    const conn = await connectMySQL();

    try {
      await conn.beginTransaction();

      const game = await gameRepository.save(conn, new Game(undefined, now));

      if (!game.id) {
        throw new Error("game.id not exist");
      }

      const turn = firstTurn(game.id, now);

      await turnRepository.save(conn, turn);

      await conn.commit();
    } finally {
      await conn.end();
    }
  }
}
