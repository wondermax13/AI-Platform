import * as mongoose from 'mongoose';

export interface IScoreCardsModel extends IScoreCards, mongoose.Document { }
export interface IScoreCardModel extends IScoreCard, mongoose.Document { }
export interface IScoreCardScoreModel extends IScoreCardScore, mongoose.Document { }

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
  time?: Date;
  sources: IScoreCard[];
}

export const ScoreCardScoreSchema = new mongoose.Schema({
  history: [Number],
  score: Number,
  stock: String,
});

export const ScoreCardSchema = new mongoose.Schema({
  bottom: ScoreCardScoreSchema,
  name: String,
  scores: [ScoreCardScoreSchema],
  top: ScoreCardScoreSchema,
});

export const ScoreCardsSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  sources: [ScoreCardSchema],
}, { _id: false  });

const ScoreCards = mongoose.model<IScoreCardsModel>('scorecard', ScoreCardsSchema, 'newsSource');
export default ScoreCards;
