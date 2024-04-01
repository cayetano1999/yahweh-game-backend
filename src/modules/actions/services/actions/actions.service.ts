import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { ActionsConstant } from '../../constant';
import { RuleService } from 'src/modules/rule/services/rule/rule.service';
import { ActionsDto } from '../../dtos/actions.dto';
import { Actions } from '../../interfaces/actions.interface';

@Injectable()
export class ActionsService {
  constructor(
    @Inject(ActionsConstant.ProviderName)
    private actionsModel: Model<Actions>,
    private ruleService: RuleService,
  ) {}

  async getPaginated(
    paginationQuery: PaginationQueryDto,
  ): Promise<Actions[]> {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    return this.actionsModel
      .find()
      .skip(skip)
      .limit(paginationQuery.limit)
      .exec();
  }

  async add(promotion: ActionsDto): Promise<Actions> {
    const rule = { ...promotion, creationDate: new Date() };

    return this.actionsModel.create(rule);
  }

  async update(id: string, promotion: ActionsDto): Promise<Actions> {
    const updatedRule = await this.actionsModel.findByIdAndUpdate(
      id,
      promotion,
      {
        new: true,
      },
    );

    if (!updatedRule)
      throw new NotFoundException('Promocion a actualizar no encontrada.');

    return updatedRule;
  }

  async delete(id: string): Promise<Actions> {
    const deletedRule = await this.actionsModel.findByIdAndDelete(id);
    if (!deletedRule)
      throw new NotFoundException('Promocion a eliminar no encontrada.');

    return deletedRule;
  }

}
