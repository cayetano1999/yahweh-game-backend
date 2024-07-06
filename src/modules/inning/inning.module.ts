import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Game } from "src/entities/game.entity";
import { InningService } from "./inning.service";
import { InningController } from "./inning.controller";
import { Inning } from "src/entities/inning.entity";




@Module({
  imports: [TypeOrmModule.forFeature([Inning])],
  providers: [InningService],
  exports: [  InningService],
  controllers: [InningController]
})
export class InningModule {}

