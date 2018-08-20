import * as mongoose from 'mongoose';
import { IArtificialModel } from './Artificial';
// import { AnswerSchema, IAnswer } from './Answer';


export interface IAnswerModel extends IAnswer, mongoose.Document { }
export interface IQuestionModel extends IQuestion, mongoose.Document { }

export interface IAnswer {
  answer: string;
  aiId: string;
  ai?: IArtificialModel
}

export interface IQuestion {
  answered: string;
  answers?: IAnswer[];
  askTime?: Date;
  channels: string[];
  question: string;
  // public from: { type: string, value: string };
  // public to: Array<{ type: string, value: string }>;
}

export const AnswerSchema = new mongoose.Schema({
  aiId: String,
  answer: String,
}, { _id: false  });

export const QuestionSchema = new mongoose.Schema({
  answered: String,
  answers: [AnswerSchema],
  askTime: { type: Date, default: Date.now },
  channels: [String],
  question: String,
});

const Question = mongoose.model<IQuestionModel>('Question', QuestionSchema);
export default Question;
