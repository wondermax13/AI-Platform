import * as mongoose from 'mongoose';

export interface IHumanModel extends IHuman, mongoose.Document { }

export interface IHuman {
  name: string;
}

export const HumanSchema = new mongoose.Schema({
  name: String
});

const Human = mongoose.model<IHumanModel>('Human', HumanSchema);
export default Human;
