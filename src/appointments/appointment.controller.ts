import { Controller, Get, Post, Param, Res, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @Get('do')
  getHello(): string {
    return this.appointmentService.getHello();
  }
  @Post('appointment/:id')
  async appoint(@Param('id') ids: string, @Res() res: any, @Req() req: any) {
    await this.appointmentService.getAppointment(ids, res, req);
  }
  @Get('appointment')
  async appoints(@Res() res: any, @Req() req: any) {
    await this.appointmentService.getAppointments(res, req);
  }
}
