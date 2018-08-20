import * as mongoose from 'mongoose';

export interface IArtificialModel extends IArtificial, mongoose.Document { }

export interface IArtificial {
  avatar: string;
  name: string;
  version: string;
}

export const ArtificialSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  version: String,
});

const Artificial = mongoose.model<IArtificialModel>('ai', ArtificialSchema, 'ai');
export default Artificial;
