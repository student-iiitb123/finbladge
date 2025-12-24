import mongoose from "mongoose"
import { type } from "os"

const fieldSchema = new mongoose.Schema({
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  },
    name:String,
    type:String

})

export const Fields = mongoose.models.fields || mongoose.model("fields", fieldSchema);