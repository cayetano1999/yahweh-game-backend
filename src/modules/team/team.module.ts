import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "src/entities/team.entity";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";
import { Module } from "@nestjs/common";


@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService],
  exports: [TeamService],
  controllers: [TeamController]
})
export class TeamModule {}

