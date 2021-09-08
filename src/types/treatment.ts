import { Document } from 'mongoose';
export interface Treatment extends Document {
  doctor_id: string;
  date: string;
  status: string;
  specialization: string;
  description: string;
}
