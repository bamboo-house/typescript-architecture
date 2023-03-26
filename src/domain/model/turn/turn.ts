import { DomainError } from "../../error/domainError";
import { WinnerDisc } from "../gameResult/winnerDisc";
import { Board, initialBoard } from "./board";
import { Disc } from "./disc";
import { Move } from "./move";
import { Point } from "./point";

export class Turn {
  constructor(
    private _gameId: number,
    private _turnCount: number,
    private _nextDisc: Disc | undefined,
    private _move: Move | undefined,
    private _board: Board,
    private _endAt: Date
  ) {}

  placeNext(disc: Disc, point: Point): Turn {
    // 打とうとした石が、次の石ではない場合、置くことはできない
    if (disc !== this._nextDisc) {
      throw new DomainError("SelectedDiscIsNotNextDisc", "Invalid disc");
    }

    const move = new Move(disc, point);

    const nextBoard = this._board.place(move);

    // TODO 次の石が置けない場合はスキップする処理
    const nextDisc = this.decideNextDisc(nextBoard, disc);

    return new Turn(
      this._gameId,
      this._turnCount + 1,
      nextDisc,
      move,
      nextBoard,
      new Date()
    );
  }

  gameEnded(): boolean {
    return this.nextDisc === undefined;
  }

  winnerDisc(): Disc | undefined {
    const darkCount = this._board.count(Disc.Dark);
    const lightCount = this._board.count(Disc.Light);

    if (darkCount === lightCount) {
      return WinnerDisc.Draw;
    } else if (darkCount > lightCount) {
      return WinnerDisc.Dark;
    } else {
      return WinnerDisc.Light;
    }
  }

  private decideNextDisc(board: Board, previouseDisc: Disc): Disc | undefined {
    const existDarkValidMove = board.existValidMove(Disc.Dark);
    const existLightValidMove = board.existValidMove(Disc.Light);

    if (existDarkValidMove && existLightValidMove) {
      // 両方おける場合は、前の石と反対の石の番
      return previouseDisc === Disc.Dark ? Disc.Light : Disc.Dark;
    } else if (!existDarkValidMove && !existLightValidMove) {
      // 両方おけない場合は、ゲーム終了
      return undefined;
    } else if (existDarkValidMove) {
      // 黒だけおける場合は、黒の番
      return Disc.Dark;
    } else {
      // 白だけおける場合は、白の番
      return Disc.Light;
    }
  }

  get gameId() {
    return this._gameId;
  }

  get turnCount() {
    return this._turnCount;
  }

  get nextDisc() {
    return this._nextDisc;
  }

  get move() {
    return this._move;
  }

  get board() {
    return this._board;
  }

  get endAt() {
    return this._endAt;
  }
}

export function firstTurn(gameId: number, endAt: Date): Turn {
  return new Turn(gameId, 0, Disc.Dark, undefined, initialBoard, endAt);
}
