import * as mongoose from 'mongoose';

export const DoctorSchema = new mongoose.Schema({
  doctorId: {
    type: Number,
    required: true,
  },
  doctorname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  availableDay: {
    type: String,
    required: true,
  },

  contactnumber: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
});
