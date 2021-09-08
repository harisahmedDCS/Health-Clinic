import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/models/admin.schema';
import { DoctorSchema } from 'src/models/doctor.schema';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Doctors',
        schema: DoctorSchema,
      },
      {
        name: 'admin',
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
