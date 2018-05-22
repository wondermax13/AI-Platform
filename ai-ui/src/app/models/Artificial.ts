import * as mongoose from 'mongoose';

export interface IArtificialModel extends IArtificial, mongoose.Document { }

export interface IArtificial {
  name: string;
}

export const ArtificialSchema = new mongoose.Schema({
  name: String
});

const Artificial = mongoose.model<IArtificialModel>('AiId', ArtificialSchema);
export default Artificial;
