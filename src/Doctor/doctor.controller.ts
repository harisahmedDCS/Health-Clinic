import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller()
export class DoctorController {
  constructor(private readonly DoctorService: DoctorService) {}
  @Post('addDoctors')
  async addDoctor(
    @Body('doctor_id') doctorId: number,
    @Body('doctorname') doctorname: string,
    @Body('address') address: string,
    @Body('contactnumber') contactnumber: string,
    @Body('speciality') speciality: string,
    @Body('availableDay') availableDay: string,
    @Body('education') education: string,
    @Res() res: any,
    @Req() req: any,
  ) {
    return await this.DoctorService.AddDoctor(
      doctorId,
      doctorname,
      address,
      contactnumber,
      education,
      speciality,
      availableDay,
      res,
      req,
    );
  }
  @Get('alldoctors')
  async getDoctor(@Res() res) {
    return await this.DoctorService.getallDoctor(res);
  }
  @Delete('doctor/:id')
  async delDoctor(
    @Param('id') deletedoc: string,
    @Res() res: any,
    @Req() req: any,
  ) {
    await this.DoctorService.deleteDoctor(res, deletedoc, req);
  }
}
