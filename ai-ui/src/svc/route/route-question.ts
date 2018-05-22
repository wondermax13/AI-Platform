import * as BodyParser from 'body-parser';
import { Router } from 'express';
import Answer, { IAnswerModel } from '../../app/models/Answer';
import Question from '../../app/models/Question';

const bodyParser = BodyParser.json();

export default async function routeQuestion(router: Router) {
  router.post('/question/ask', bodyParser, async (request, response, next) => {
    try {
      const question = new Question(request.body);
      console.log(`POST /ask\n${question}`)
      if (question.errors) {
        response.status(422).send(question.errors);
      } else {
        console.log(`POST /ask\n${question}`)
        const saved = await question.save();
        response.status(201).send(saved);
      }
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/questions', async (request, response, next) => {
    try {
      console.log(`GET /questions`);
      const questions = await Question.find();
      const questionIds = questions.map(question => question.id);
      response.status(200).json(questionIds);
    } catch (ex) {
      next(ex);
    }
  });

  router.get('/question/:questionId', async (request, response, next) => {
    try {
      console.log(`GET /question/${request.params.questionId}`);
      const question = await Question.findById(request.params.questionId)
      if (!question) {
        throw new Error(`Path Error: Question not found: ${request.params.questionId}`);
      }
      response.status(200).json(question);
    } catch (ex) {
      next(ex);
    }
  });

  router.delete('/question/:questionId', async (request, response, next) => {
    try {
      console.log(`DELETE /questions/${request.params.questionId}`);

      const question = await Question.findById(request.params.questionId)
      if (!question) {
        response.status(422).json({ error: `Invalid question id: ${request.params.questionId}` });
      } else {
        const answers = question.answers;
        if (answers) {
          answers.forEach(async (child: IAnswerModel) => {
            const answer = await Answer.findById(child._id)
            if (answer) {
              answer.remove();
            }
          });
        }
        question.remove();
        response.sendStatus(204);
      }
    } catch (ex) {
      next(ex);
    }
  });
}
