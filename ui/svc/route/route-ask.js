'use strict';

const Question = require('../model/question');
const Answer = require('../model/answer');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = router => {
  router.route('/ask')
    .post(bodyParser, (request, response) => {
      let question = new Question(request.body);
      question.save()
        .then(() => response.sendStatus(201))
        .catch(err => errorHandler(err, response));
      console.log(`POST /ask\n${question}\n`);
    });
}
