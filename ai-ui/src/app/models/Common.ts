import { IQuestionModel } from './Question';
import { IArtificialModel } from './Artificial';

export interface ICommon {
  channels: Array<{ name: string, default?: boolean }>;
  recentlyAddedQuestion?: IQuestionModel;
  humans: Array<{ name: string, default?: boolean }>;
  userId: string;
  ai: Array<{ name: string, default?: boolean }>;
  ais: IArtificialModel[];
  questions: IQuestionModel[];
}
