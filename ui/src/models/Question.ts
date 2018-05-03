import Answer from './Answer';

export default class Question {
  public _id?: string;
  public question: string;
  public channels: string[];
  public askTime?: Date;
  public answers?: Answer[];
  // public from: { type: string, value: string };
  // public to: Array<{ type: string, value: string }>;
}