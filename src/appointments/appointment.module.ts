import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema } from 'src/models/appointments.schema';
import { DoctorSchema } from 'src/models/doctor.schema';
import { UserSchema } from 'src/models/user.schema';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Doctors',
        schema: DoctorSchema,
      },
      {
        name: 'Appointments',
        schema: AppointmentSchema,
      },
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
