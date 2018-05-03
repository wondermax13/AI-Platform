
export class AiId {
  public type: string;
  public required: boolean;
  public default: string; // TODO: remove once we have an AI schema
}

export default class Answer {
  public question: string;
  public answer: string;
  public responseTime: Date;
  public score: number;
}