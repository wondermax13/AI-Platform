import * as mongoose from 'mongoose';

export interface IArtificialIdModel extends IArtificialId, mongoose.Document { }

export interface IArtificialId {
  type: string;
  required: boolean;
  default: string; // TODO: remove once we have an AI schema
}

export const ArtificialIdSchema = new mongoose.Schema({
  name: String
});

const ArtificialId = mongoose.model<IArtificialIdModel>('AiId', ArtificialIdSchema);
export default ArtificialId;
