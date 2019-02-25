import * as mongoose from 'mongoose';

export interface INewsCardsModel extends INewsCards, mongoose.Document { }
export interface INewsCardModel extends INewsCard, mongoose.Document { }

export interface INewsCard {
  response: string;
}

export interface INewsCards {
  time?: Date;
  sources: INewsCard[];
}

export const NewsCardSchema = new mongoose.Schema({
  response: String
});

export const NewsCardsSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  sources: [NewsCardSchema],
}, { _id: false  });

const NewsCards = mongoose.model<INewsCardsModel>('newscard', NewsCardsSchema, 'newsAIResponses');
export default NewsCards;
