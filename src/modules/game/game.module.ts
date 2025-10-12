import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Game } from "src/entities/game.entity";
import { GameService } from "./game.service";
import { GameController } from './game.controller';



@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  providers: [GameService],
  exports: [  GameService],
  controllers: [GameController]
})
export class GameModule {}

