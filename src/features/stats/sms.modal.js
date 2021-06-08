import mongoose, {Schema} from 'mongoose'

const statSchema = new Schema({
  userId: String,
  ge: {
    type: Number,
    default: 0
  }
})

const stats = mongoose.model("stat", statSchema)

export default stats