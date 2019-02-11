import { IArtificialModel } from '../models/Artificial';
import { IQuestionModel } from '../models/Question';
import { IScoreCards } from '../models/ScoreCards';
import { ISingleNewsCardScore } from '../models/NewsCards';
import { call } from './api';

export async function getScoreCards(): Promise<IScoreCards> {
  const response = await call('/api/v1/scorecards');
  const scorecards: IScoreCards = await response.json();
  return scorecards;
}

export async function getNewsCards(): Promise<ISingleNewsCardScore> {
  const response = await call('/api/v1/newscards');
  const newscards: ISingleNewsCardScore = await response.json();
  return newscards;
}


export async function postQuestion(question: string, channels: string[] = ['#Main']): Promise<Response> {
  return call('/api/v1/question/ask', {
    channels,
    question,
  }, 'POST');
}

export async function getAis(): Promise<IArtificialModel[]> {
  try {
    const response = await call('/api/v1/ai');
    const ai: IArtificialModel[] = await response.json();
    return ai;
  } catch (ex) {
    console.log(ex);
    return [];
  }
}

export async function getFeed(channel: string = '#main', knownAis: IArtificialModel[]): Promise<IQuestionModel[]> {
  try {
    const channelKey = channel.replace('#', '');
    const response = await call(`/api/v1/feed/channel/${channelKey}`);
    if (!response.ok) {
      const text = await response.text();
      console.error(response.status, text);
      throw new Error(`${response.statusText} (2)`);
    }
    const questions: IQuestionModel[] = await response.json();
    return questions;
  } catch (ex) {
    console.error(ex.message || ex);
    return [];
  }
}

export default {
  getAis,
  getFeed,
  postQuestion,
  getScoreCards,
  getNewsCards
};
