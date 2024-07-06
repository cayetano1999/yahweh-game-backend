import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Shift } from "src/entities/shift.entity";
import { ShiftService } from "./shift.service";
import { ShiftController } from "./shift.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
  providers: [ShiftService],
  exports: [ShiftService],
  controllers: [ShiftController]
})
export class ShiftModule {}

