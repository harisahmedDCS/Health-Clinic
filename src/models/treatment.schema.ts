import * as mongoose from 'mongoose';

export const TreatmentSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',
  },
  specialization: {
    type: String,
  },
  description: {
    type: String,
  },
});
