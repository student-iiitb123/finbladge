import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: String
});

export const Collection =
  mongoose.models.collections ||
  mongoose.model('collections', collectionSchema);
