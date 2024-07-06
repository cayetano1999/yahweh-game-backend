import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Church } from "src/entities/chursh.entity";
import { ChurchService } from "./church.service";
import { ChurchController } from "./church.controller";


@Module({
  imports: [TypeOrmModule.forFeature([Church])],
  providers: [ChurchService],
  exports: [ChurchService],
  controllers: [ChurchController]
})
export class ChurchModule {}

