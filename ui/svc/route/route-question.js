'use strict';

const Question = require('../model/question');
const Answer = require('../model/answer');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = router => {
  router.post('/question/ask', bodyParser, (request, response) => {
    let question = new Question(request.body);
    console.log(`POST /ask\n${question}`)
    return question.save()
      .then(() => response.sendStatus(201))
      .catch(err => errorHandler(err, response));
  });

  router.get('/questions/:questionId?', (request, response) => {
    console.log(`GET /questions/${request.params.questionId || ''}`)
    if(request.params.questionId) {
      return Question.findById(request.params.questionId)
        .then(question => {
          if (!question) {
            throw new Error(`Path Error: Question not found: ${request.params.questionId}`);
          }
          return question;
        })
        .then(question => response.status(200).json(question))
        .catch(err => errorHandler(err, response));
    }
    return Question.find()
      .then(questions => {
        const questionIds = questions.map(question => question.id);
        response.status(200).json(questionIds);
      })
      .catch(err => errorHandler(err, response));
  });

  router.delete('/questions/:questionId', (request, response) => {
    console.log(`DELETE /questions/${request.params.questionId}`)
    return Question.findById(request.params.questionId)
      .then(question => {
        if (!question) {
          throw new Error(`Path Error: Question not found: ${request.params.questionId}`);
        }
        return question;
      })
      .then(question => {
        question.answers.forEach(answer => {
          Answer.findById(answer._id)
            .then(data => data.remove());
        });
        return question;
      })
      .then(question => question.remove())
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));
  });

}
