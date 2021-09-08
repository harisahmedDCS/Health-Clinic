import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointments/appointment.module';
import { DoctorModule } from './Doctor/doctor.module';
import { authMiddleware } from './middleware/auth';
import { adminMiddleware } from './middleware/adminMiddleware';
import { UserModule } from './Users/user.module';

@Module({
  imports: [
    AppointmentModule,
    UserModule,

    DoctorModule,
    MongooseModule.forRoot(
      'mongodb+srv://haris:haris123@healthclinic.8mkup.mongodb.net/healthclinic?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .forRoutes('appointment/:id', 'auth')
      .apply(adminMiddleware)
      .forRoutes('addDoctors', 'doctor/:id', 'addDoctors');
  }
}
