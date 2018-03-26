export default class Question {
  public question: string;
  public from: { type: string, value: string };
  public to: Array<{ type: string, value: string }>;
}