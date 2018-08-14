import { IQuestionModel } from './Question';

export interface ICommon {
  channels: Array<{ name: string, default?: boolean }>;
  recentlyAddedQuestion?: IQuestionModel;
  humans: Array<{ name: string, default?: boolean }>;
  userId: string;
  ai: Array<{ name: string, default?: boolean }>;
  questions: IQuestionModel[];
}
