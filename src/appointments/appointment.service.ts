import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { Doctor } from 'src/types/doctor';
import { Appointment } from 'src/types/appointments';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel('Appointments') private AppointmentModel: Model<Appointment>,
    @InjectModel('Doctors') private DoctorModel: Model<Doctor>,
    @InjectModel('Users') private UserModel: Model<User>,
  ) {}
  getHello(): string {
    return 'Hello World doooo!';
  }
  async getAppointment(ids: string, res: any, req: any) {
    try {
      const ans = await this.UserModel.findOne({
        _id: req.user.id,
      });
      const ans2 = await this.DoctorModel.findById(ids);
      const key = new this.AppointmentModel({
        patientId: req.user.id,
        email: ans.email,
        name: ans.name,
        doctorId: ans2._id,
        doctorname: ans2.doctorname,
        address: ans2.address,
        availableDay: ans2.availableDay,
        contactnumber: ans2.contactnumber,
      });
      await key.save();
      return res.status(200).json({
        data: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Server error',
      });
    }
  }
  async getAppointments(res: any, req: any) {
    try {
      const ans5 = await this.AppointmentModel.find(req.user.doctorUser);
      return res.status(200).json({
        data: ans5,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Server error',
      });
    }
  }
}
