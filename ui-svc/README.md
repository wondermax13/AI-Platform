## API:
### **ENVIRONMENT**
NOTE: If `process.env.NODE_ENV` is not set to `"production"`, the API will look for a `.env` file.

Required environment variables (system or in .ui-svc/.env file):
```js
PORT="3000" // defaults to "3000"
NODE_ENV="dev" // or "production"
MONGODB_URI="mongodb://dbuser1:<PASSWORD_GOES_HERE>@ds117469.mlab.com:17469/a01001001" //
```
___
### **SCRIPTS:**
```js
$ npm run serve:api
  // node ./svc/index.js

$ npm run watch:api
  // nodemon ./svc/index.js
```
___
### **ROUTES:**

#### POST /api/v1/feed/channel/:channel
*gets the most recent 20 questions posted to the :channel*

request:
* headers: `"Content-Type" : "application/json"`
* body:
```js
```
expected response:
* status: `201 Created`
* body: `Array`: Questions (see Question and Answer api below for item schemas)
___

#### POST /api/v1/question/ask
*Creates and saves one Question document*

request:
* headers: `"Content-Type" : "application/json"`
* body:
```js
{
  "question": "Where should I invest?", // String (required)
  "channels": [ "5ae7668f53e0554f8ce078f6" ], // Array of AI ObjectIds (optional)
  "askTime": "2018-04-30T18:55:11.682Z" // Date (optional: defaults to current time)
}
```
expected response:
* status: `201 Created`
* body: `Text`: `Created`
___
#### GET /api/v1/questions
*Finds all Question documents*

expected response:
* status: `200 OK`
* body: `JSON`:
```js
[ "5ae7668f53e0551f8ce078f6", "5ae766d253e0551f8ce078f7" ] // Array of all Question ObjectIds
```
___
#### GET /api/v1/questions/{Question ObjectId}
*Finds one Question document by id*

exected response:
* status: `200 OK`
* body: `JSON`:
```js
// Question document:
{
  "channels": [ "5ae7668f53e0554f8ce078f6", "5ae7668f53e0554f8ce07e23" ],
  "answers": [
    {
      "score": 0,
      "_id": "5ae76f7af239c925c0dcec30",
      "answer": "quite a lot!",
      "aiId": "5ae766d253e05f1f8ce078fe",
      "question": "5ae766d253e0551f8ce078f7",
      "responseTime": "2018-05-01T00:46:57.198Z",
      "__v": 0
    }
  ],
  "askTime": "2018-04-30T18:55:11.682Z",
  "_id": "5ae766d253e0551f8ce078f7",
  "question": "How much does an elephant weigh?",
  "__v": 0
}
```
___
#### DELETE /api/v1/questions/{Question ObjectId}
*Finds and removes one Question document by id, along with **all associated Answer documents***

expected response:
* status: `204 No Content`
___
#### POST /api/v1/answer/to/{Question ObjectId}
*Creates and saves one Answer document, and adds it to one Question document found by id*

request:
* headers: `"Content-Type" : "application/json"`
* body:
```js
{
  "answer": "The forecast is sunny!", // String (required)
  "aiId": "5ae766d253e05f1f8ce078fe", // AI ObjectId (required: currently defaults to generated ObjectId)
  "responseTime": "2018-04-30T19:55:11.682Z" // Date (optional: defaults to current time)
}
```
expected response:
* status: `201 Created`
* body: `Text`: `Created`
___
#### GET /api/v1/answer/{Answer ObjectId}
*Finds one Answer document by id*
* status: `200 OK`
* body: `JSON`:
```js
// Answer document:
{
  "aiId": "5ae766d253e05f1f8ce078fe",
  "score": 0,
  "_id": "5ae76f7af239c925c0dcec30",
  "answer": "quite a lot!",
  "responseTime": "2018-05-01T00:46:57.198Z",
  "question": "5ae766d253e0551f8ce078f7",
  "__v": 0
}
```
___
#### GET /api/v1/answers/to/{Question ObjectId}
*Finds one Question document by id, and sends an array of Answer documents*

exected response:
* status: `200 OK`
* body: `JSON`:
```js
// Array of Answer documents:
[
  {
    "aiId": "5ae7b8d8a7fbd807dc2c6fc0",
    "score": 0,
    "_id": "5ae7b901a7fbd807dc2c6fc1",
    "answer": "not as much as you might think",
    "responseTime": "2018-05-01T00:46:57.198Z",
    "question": "5ae766d253e0551f8ce078f7",
    "__v": 0
  },
  {
    "aiId": "5ae766d253e05f1f8ce078fe",
    "score": 0,
    "_id": "5ae76f7af239c925c0dcec30",
    "answer": "quite a lot!",
    "responseTime": "2018-05-01T00:46:57.198Z",
    "question": "5ae766d253e0551f8ce078f7",
    "__v": 0
  }
]
```
___
