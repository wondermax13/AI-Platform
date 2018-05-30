import * as BodyParser from 'body-parser';
import { Router } from 'express';
import Answer from '../../app/models/Answer';
import Question from '../../app/models/Question';

const bodyParser = BodyParser.json();

export default async function routeAnswer(router: Router) {
  router.post('/answer/to/:questionId', bodyParser, async (request, response, next) => {
    try {
      const answer = new Answer(request.body);
      console.log(`POST /answer/to/${request.params.questionId}\n${answer}`)

      const question = await Question.findById(request.params.questionId);
      if (!question) {
        response.status(422).json({ error: 'Invalid question id' });
      } else {
        answer.question = question._id;
        answer.save();

        question.answers = question.answers || [];
        question.answers.push(answer.answer)
        question.save();

        response.sendStatus(201);
      }
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/answer/:answerId', async (request, response, next) => {
    try {
      console.log(`GET /answer/${request.params.answerId}`)
      const answer = await Answer.findById(request.params.answerId)
      if (!answer) {
        throw new Error(`Path Error: Answers not found: ${request.params.answerId}`);
      }
      response.status(200).json(answer);
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/answers/to/:questionId', async (request, response, next) => {
    try {
      console.log(`GET /answers/to/${request.params.questionId}`)
      const question = await Question.findById(request.params.questionId)
      if (!question) {
        throw new Error(`Path Error: Answers not found: Question not found: ${request.params.questionId}`);
      }
      response.status(200).json(question.answers);
    } catch (ex) {
      next(ex);
    }
  });
};
