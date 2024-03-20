import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Logger } from '../../../common/logger/services/logger/logger.service';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { PromotionConstant } from '../../constant';
import { Promotion } from '../../interfaces/promotion.interface';
import { PromotionDto } from '../../dtos/promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(PromotionConstant.ProviderName)
    private promotionModel: Model<Promotion>,
    private readonly logger: Logger,
  ) {}

  async getPaginated(paginationQuery: PaginationQueryDto): Promise<Promotion[]> {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    return this.promotionModel.find().skip(skip).limit(paginationQuery.limit).exec();
  }

  async add(promotion: PromotionDto): Promise<Promotion> {
    const rule = {...promotion, creationDate: new Date()}; 
   
    return this.promotionModel.create(rule);
  }

  async update(id: string, promotion: PromotionDto): Promise<Promotion> {
    
    const updatedRule = await this.promotionModel.findByIdAndUpdate(id, promotion, {
      new: true,
    });

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
}
