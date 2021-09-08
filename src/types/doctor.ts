import { Document } from 'mongoose';
export interface Doctor extends Document {
  doctorId: number;
  doctorname: string;
  address: string;
  contactnumber: string;
  education: string;
  speciality: string;
  availableDay: string;
}
