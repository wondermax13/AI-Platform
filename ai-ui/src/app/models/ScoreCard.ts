
export interface IScoreCardScore {
  stock: string;
  score: number;
  history?: number[];
}

export interface IScoreCard {
  name: string;
  top: IScoreCardScore;
  bottom: IScoreCardScore;
  scores: IScoreCardScore[];
}

export interface IScoreCards {
  time: Date;
  sources: IScoreCard[];
}
