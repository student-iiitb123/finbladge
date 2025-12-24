import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  },
  data: Object
});

export const Entry =
  mongoose.models.entry ||
  mongoose.model('entry', entrySchema);
