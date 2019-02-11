import * as mongoose from 'mongoose';

export interface ISingleNewsCardScoreModel extends ISingleNewsCardScore, mongoose.Document { }
export interface INewsCardModel extends INewsCard, mongoose.Document { }
export interface INewsCardsModel extends INewsCards, mongoose.Document { }

/* Single news response */
export interface ISingleNewsCardScore {
  response: string;
}

/* List of records for news responses */
export interface INewsCard {
  news: ISingleNewsCardScore[];
}


/* Schema for MLAB single news */
export const SingleNewsCardScoreSchema = new mongoose.Schema({
  response: String
}, { _id: false  });

const MongooseSingleNewsCard = mongoose.model<ISingleNewsCardScoreModel>('newscard', SingleNewsCardScoreSchema, 'newsAIResponses');

export default MongooseSingleNewsCard;



/* List of list of news responses */
export interface INewsCards {
  sources: INewsCard[];
}



/* Not used currently */
export const NewsCardSchema = new mongoose.Schema({
  news: [SingleNewsCardScoreSchema]
}, { _id: false  });

export const NewsCardsSchema = new mongoose.Schema({
  sources: [NewsCardSchema],
}, { _id: false  });



