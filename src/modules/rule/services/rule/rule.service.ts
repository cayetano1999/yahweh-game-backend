import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RuleConstants } from '../../constant';
import { Model } from 'mongoose';
import { Rule } from '../../interfaces/rule.interface';
import { Logger } from '../../../common/logger/services/logger/logger.service';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { RuleDto } from '../../dtos/rule.dto';

@Injectable()
export class RuleService {
  constructor(
    @Inject(RuleConstants.ProviderName)
    private ruleModel: Model<Rule>,
    private readonly logger: Logger,
  ) {}

  async getPaginated(paginationQuery: PaginationQueryDto): Promise<Rule[]> {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    return this.ruleModel.find().skip(skip).limit(paginationQuery.limit).exec();
  }

  async add(ruleDto: RuleDto): Promise<Rule> {
    const rule = {...ruleDto, creationDate: new Date()}; 
   
    return this.ruleModel.create(rule);
  }

  async update(id: string, rule: RuleDto): Promise<Rule> {
    
    const updatedRule = await this.ruleModel.findByIdAndUpdate(id, rule, {
      new: true,
    });

    if (!updatedRule)
      throw new NotFoundException('Regla a actualizar no encontrada.');

    return updatedRule;
  }

  async delete(id: string): Promise<Rule> {
    const deletedRule = await this.ruleModel.findByIdAndDelete(id);
    if (!deletedRule)
      throw new NotFoundException('Regla a eliminar no encontrada.');

    return deletedRule;
  }
}
