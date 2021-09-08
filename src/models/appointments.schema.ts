import * as mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  doctorname: {
    type: String,
  },
  address: {
    type: String,
  },
  availableDay: {
    type: String,
  },
  contactnumber: {
    type: String,
  },
});
