import { Document } from 'mongoose';
export interface Appointment extends Document {
  email: string;
  password: string;
  name: string;
  patientId: string;
  doctorname: string;
  address: string;
  availableDay: string;
  contactnumber: string;
  doctorId: string;
}
