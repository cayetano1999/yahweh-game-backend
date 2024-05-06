import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/modules/common/dto/pagination-query.dto';
import { IconConstant } from '../../constant';
import { IconDto } from '../../dtos/icon.dto';
import { Icon } from '../../interfaces/actions.interface';

@Injectable()
export class IconService {
  constructor(
    @Inject(IconConstant.ProviderName)
    private actionsModel: Model<Icon>,
  ) {}

  async getPaginated(
    paginationQuery: PaginationQueryDto,
  ): Promise<Icon[]> {
    const skip = (paginationQuery.page - 1) * paginationQuery.limit;

    return this.actionsModel
      .find()
      .skip(skip)
      .limit(paginationQuery.limit)
      .exec();
  }

  async getMultiple(
    ids: string[],
  ): Promise<Icon[]> {
    return this.actionsModel.find({ _id: { $in: ids } }).exec();
  }

  async add(icon: IconDto): Promise<Icon> {
    console.log(icon)
    return this.actionsModel.create(icon);
  }

  async update(id: string, icon: IconDto): Promise<Icon> {
    const updatedIcon = await this.actionsModel.findByIdAndUpdate(
      id,
      icon,
      {
        new: true,
      },
    );

    if (!updatedIcon)
      throw new NotFoundException('Iconono a actualizar no encontrado.');

    return updatedIcon;
  }

  async delete(id: string): Promise<Icon> {
    const deletedIcon = await this.actionsModel.findByIdAndDelete(id);
    if (!deletedIcon)
      throw new NotFoundException('Icono a eliminar no encontrado.');

    return deletedIcon;
  }

}
