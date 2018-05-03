import { call } from './api';
import Question from '../models/Question';

// tslint:disable-next-line
export async function postQuestion(question: string, channels: string[] = ['#Main']): Promise<Response> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return call('http://localhost:3000/api/v1/question/ask', {
    question,
    channels
  }, 'POST');
}

export async function getFeed(channel: string = '#main'): Promise<Question[]> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  const channelKey = channel.replace('#', '');
  const response = await call(`http://localhost:3000/api/v1/feed/channel/${channelKey}`);

  const questions: Question[] = await response.json();
  return questions;
}

export default {
  postQuestion,
  getFeed
};