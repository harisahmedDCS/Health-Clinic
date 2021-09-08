import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from '../types/doctor';

@Injectable()
export class DoctorService {
  constructor(@InjectModel('Doctors') private DoctorModel: Model<Doctor>) {}
  getHello(): string {
    return 'Hello World ddd!';
  }
  async AddDoctor(
    doctorId: number,
    doctorname: string,
    address: string,
    contactnumber: string,
    education: string,
    speciality: string,
    availableDay: string,
    res: any,
    req: any,
  ) {
    try {
      const result = new this.DoctorModel({
        doctorId,
        doctorname,
        address,
        contactnumber,
        education,
        speciality,
        availableDay,
      });
      if (req.user.status === 'admin') {
        await result.save();
      } else {
        return res.status(400).json({
          error: 'not admin',
        });
      }
      return res.status(400).json({
        error: 'success',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Server Error',
      });
    }
  }
  async getallDoctor(res: any) {
    try {
      const data = await this.DoctorModel.find();
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'Server Error',
      });
    }
  }
  async deleteDoctor(res: any, deletedoc: string, req) {
    try {
      if (req.user.status === 'admin') {
        await this.DoctorModel.findByIdAndRemove(deletedoc);
      } else {
        return res.status(400).json({
          error: 'not admin',
        });
      }

      res.status(200).json({
        data: 'remove successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: 'not removed',
      });
    }
  }
}
