import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Rule } from '../interfaces/rule.interface';
import { RuleService } from '../services/rule/rule.service';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { RuleDto } from '../dtos/rule.dto';

@Controller('rule')
@ApiTags('rule')
export class RuleController {
  constructor(private readonly _service: RuleService) {}

  @Get()
  @ApiOperation({ summary: 'Get All rules paginated documents' })
  @ApiResponse({
    status: 200,
    description: 'Returned all existing rules paginated',
  })
  getAllRules(@Query() paginationQuery: PaginationQueryDto): Promise<Rule[]> {
    return this._service.getPaginated(paginationQuery);
  }

  @Post()
  @ApiOperation({ summary: 'Add rule to the database' })
  @ApiBody({ type: RuleDto })
  @ApiResponse({
    status: 200,
    description: 'Rule created',
  })
  addRule(@Body() rule: RuleDto): Promise<Rule> {
    return this._service.add(rule);
  }

  @Put(':id')
  @ApiBody({ type: RuleDto })
  @ApiOperation({ summary: 'Update existing rule' })
  @ApiResponse({
    status: 200,
    description: 'Rule created',
  })
  @ApiResponse({
    status: 404,
    description: 'Rule not found',
  })
  update(@Param('id') id: string, @Body() rule: RuleDto): Promise<Rule> {
    return this._service.update(id, rule);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete existing rule' })
  @ApiResponse({
    status: 200,
    description: 'Rule created',
  })
  @ApiResponse({
    status: 404,
    description: 'Rule not found',
  })
  delete(@Param('id') id: string): Promise<Rule> {
    return this._service.delete(id);
  }
}
