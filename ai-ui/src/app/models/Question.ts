import * as mongoose from 'mongoose';
import { AnswerSchema, IAnswer } from './Answer';

export interface IQuestionModel extends IQuestion, mongoose.Document { }

export interface IQuestion {
  answers?: IAnswer[];
  askTime?: Date;
  channels: string[];
  question: string;
  // public from: { type: string, value: string };
  // public to: Array<{ type: string, value: string }>;
}

export const QuestionSchema = new mongoose.Schema({
  answers: [AnswerSchema],
  askTime: { type: Date, default: Date.now },
  channels: [String],
  question: String,
});

const Question = mongoose.model<IQuestionModel>('Question', QuestionSchema);
export default Question;
