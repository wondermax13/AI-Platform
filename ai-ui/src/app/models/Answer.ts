import * as mongoose from 'mongoose';

export interface IAnswerModel extends IAnswer, mongoose.Document { }

export interface IAnswer {
  question: string;
  answer: string;
  responseTime: Date;
  score: number;
}

export const AnswerSchema = new mongoose.Schema({
  answer: String,
  question: {type: mongoose.Schema.Types.ObjectId,  ref: 'Question'},
  responseTime: Date,
  score: Number,
});

const Answer = mongoose.model<IAnswerModel>('AiId', AnswerSchema);
export default Answer;
