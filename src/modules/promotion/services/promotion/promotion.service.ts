import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Logger } from '../../../common/logger/services/logger/logger.service';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { PromotionConstant } from '../../constant';
import { Promotion } from '../../interfaces/promotion.interface';
import { PromotionDto } from '../../dtos/promotion.dto';
import { Rule } from 'src/modules/rule/interfaces/rule.interface';
import { EvaluationResultDto } from '../../dtos/evluation-result.dto';
import { Engine } from 'json-rules-engine';
import { RuleService } from 'src/modules/rule/services/rule/rule.service';
import { RabbitService } from 'src/modules/common/rabbit/services/rabbit/rabbit.service';
import { RabbitListenerService } from '../../../common/rabbit/services/rabbit/rabbitListenService.service';
import { CONTACTABILITY_EVENTS } from 'src/modules/common/events/contactability-events';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(PromotionConstant.ProviderName)
    private promotionModel: Model<Promotion>,
    private ruleService: RuleService,
    private readonly logger: Logger,
    private readonly rabbitService: RabbitService,
  ) { }

  async getPaginated(
    paginationQuery: PaginationQueryDto,
  ): Promise<Promotion[]> {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    return this.promotionModel
      .find()
      .skip(skip)
      .limit(paginationQuery.limit)
      .exec();
  }

  async add(promotion: PromotionDto): Promise<Promotion> {
    const rule = { ...promotion, creationDate: new Date() };

    return this.promotionModel.create(rule);
  }

  async update(id: string, promotion: PromotionDto): Promise<Promotion> {
    const updatedRule = await this.promotionModel.findByIdAndUpdate(
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

  async delete(id: string): Promise<Promotion> {
    const deletedRule = await this.promotionModel.findByIdAndDelete(id);
    if (!deletedRule)
      throw new NotFoundException('Promocion a eliminar no encontrada.');

    return deletedRule;
  }

  async evaluate(id: string, parameters: any): Promise<EvaluationResultDto> {
    const evaluationResult = new EvaluationResultDto();
    evaluationResult.promotionId = id;

    const promotion: Promotion = await this.promotionModel.findById(id);
    if (!promotion) throw new NotFoundException('Promocion no encontrada.');

    const ruleIds = promotion.promotionRules as unknown as string[];
    const rules: Rule[] = await this.ruleService.getByIds(ruleIds);

    if (!rules)
      throw new NotFoundException(
        'Reglas asignadas a la promocion no encontradas.',
      );

    const facts = rules.flatMap((x) => x.ruleFacts.map((x) => x.variable));

    const missingProperties = this.getMissingProperties(facts, parameters);

    if (missingProperties.length > 0) {
      throw new BadRequestException(
        `Faltan propiedades en los parametros. Propiedades faltantes: ${missingProperties.join(', ')}`,
      );
    }
    const engine = new Engine();
    const event = {
      type: 'my-event',
      params: {
        customProperty: 'customValue',
      },
    };

    for (const rule of rules) {
      engine.addRule({
        conditions: rule.conditions,
        name: rule.name,
        event: event,
      });
    }

    const result = await engine.run(parameters);
    if (result.results.length <= 0) {
      evaluationResult.success = false;
      evaluationResult.message = 'No cumple con las reglas.';
      return evaluationResult;
    }

    return evaluationResult;
  }

  async exists(id: string): Promise<boolean> {
    const exists = await this.promotionModel.countDocuments({_id: id});
    return exists > 0;
  }

  async getActivePromotions(): Promise<Promotion[]> {
    const promotions = this.promotionModel
      .find({
        active: true,
        $or: [{ finishDate: { $gte: new Date() } }, { finishDate: null }],
      })
      .exec();
    return promotions;
  }

  getMissingProperties(facts: string[], parameters): string[] {
    return facts.filter((fact) => !(fact in parameters));
  }

  getFactsFromParameters(obj: object): string[] {
    return Object.entries(obj).map(([key, value]) => `${key}: ${value}`);
  }
}
