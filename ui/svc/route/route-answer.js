'use strict';

const Question = require('../model/question');
const Answer = require('../model/answer');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = router => {
  router.route('/answer/:questionId')
    .post(bodyParser, (request, response) => {
      let answer = new Answer(request.body);
      console.log(`POST /answer/${request.params.questionId}\n${answer}`)
      Question.findById(request.params.questionId)
        .then(question => {
          answer.question = question._id;
          answer.save();
          return question;
        })
        .then(question => {
          question.answers.push(answer)
          question.save();
        })
        .then(() => response.sendStatus(201))
        .catch(err => errorHandler(err, response));
    });
};
