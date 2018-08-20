import { IArtificialModel } from '../models/Artificial';
import { IQuestionModel } from '../models/Question';
import { call } from './api';

// tslint:disable-next-line
export async function postQuestion(question: string, channels: string[] = ['#Main']): Promise<Response> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.
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

export async function getFeed(channel: string = '#main'): Promise<IQuestionModel[]> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    const ais = await getAis();

    const channelKey = channel.replace('#', '');
    const response = await call(`/api/v1/feed/channel/${channelKey}`);
    if (!response.ok) {
      const text = await response.text();
      console.error(response.status, text);
      throw new Error(`${response.statusText} (2)`);
    }
    const questions: IQuestionModel[] = await response.json();
    questions.forEach(q => {
      if (q.answers) {
        q.answers.forEach(a => {
          a.ai = ais.find(ai => ai.id === a.aiId);
        });
      }
    })
    return questions;
  } catch (ex) {
    console.error(ex.message || ex);
    return [];
  }
}

export default {
  getFeed,
  postQuestion,
};