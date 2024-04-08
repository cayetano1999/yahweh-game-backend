import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PromotionService } from 'src/modules/promotion/services/promotion/promotion.service';
import { EvaluationResultDto } from 'src/modules/promotion/dtos/evluation-result.dto';
import { ContactabilityService } from 'src/modules/contactability/services/contactability/contactability.service';
import { ActionsService } from 'src/modules/actions/services/actions/actions.service';
import { LandingDto } from '../dtos/landing.dto';
import { CustomerActionEnum } from '../enums/action.enum';
import { CustomerPromotionConstant } from '../constants';
import { CustomerPromotion } from '../interfaces/customer-promotion.interface';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CustomerPromotionConstant.ProviderName)
    private customerPromotion: Model<CustomerPromotion>,
    private readonly _promotionService: PromotionService,
    private readonly _contactabilityService: ContactabilityService,
    private readonly _actionsService: ActionsService,
  ) { }

  async GetValidPromotionsLandings(id: string, parameters: any): Promise<LandingDto[]> {
    /// Busca todas las promociones activas
    const validPromotions = await this._promotionService.getActivePromotions();
    const evaluations: Promise<EvaluationResultDto>[] = [];

    const customerPromotions = await this.customerPromotion.find({ customerId: id, promotionId: { $in: validPromotions.map(x => x.id) } }).exec();

    ///Ejecuta las evaluaciones a cada promocion sin esperar el resultado
    for (const promotion of validPromotions) {
      //Busca los parametros de accion realizadas por el cliente con la promocion
      const customerPromo = customerPromotions.find(x => x.promotionId == promotion.id);
      const displayedCount = customerPromo ? customerPromo.displayedCount : 0;
      let sortedActions = customerPromo?.customerActions;

      if(customerPromo){
        sortedActions.sort((a, b) => a.date.getTime() - b.date.getTime());
      }

      const dismissed = customerPromo ? sortedActions.find(x => x.action == CustomerActionEnum.Dismissed) : null;
      const viewLater = customerPromo ? sortedActions.find(x => x.action == CustomerActionEnum.ViewLater) : null;
      const completed = customerPromo ? sortedActions.find(x => x.action == CustomerActionEnum.Completed) : null;

      const params = {
        ...parameters,
        visualizaciones: displayedCount,
        descartada: !!dismissed,
        fechaDescarte: dismissed ? dismissed.date : null,
        verDespues: !!viewLater,
        fechaVerDespues: viewLater ? viewLater.date : null,
        completada: !!completed,
        fechaCompletada: completed ? completed.date : null,
      }
      evaluations.push(this._promotionService.evaluate(promotion.id, params));
    }

    ///Espera a que todas las evaluaciones terminen
    const results = await Promise.all(evaluations);
    const customerValidpromotionIds = results.filter((result) => result.success).map((result) => result.promotionId);

    ///Filtra las promociones que tienen landing
    const landings = validPromotions
      .filter((promotion) => customerValidpromotionIds.includes(promotion.id))
      .flatMap((promotion) => promotion.promotionDetails
        .filter(x => x.type === 'LANDING')
        .map(item => {
          return {
            ...item,
            promotionName: promotion.name,
            promotionId: promotion.id,
          }
        })
      );
    const landingIds = [];
    const actionsIds = [];

    for (const item of landings) {
      landingIds.push(item.value);
      actionsIds.push(item.actionValue);
    }

    ///registra/actualiza CustomerPromotion para llevar el conteo de visualiaciones y las acciones realizadas
    const customerPromoPromises = [];

    for (const promo of customerValidpromotionIds) {
      const customerPromotion = customerPromotions.find(x => x.promotionId == promo);
      if (customerPromotion) {
        customerPromotion.displayedCount++;
        customerPromoPromises.push(this.customerPromotion.findByIdAndUpdate(customerPromotion._id, customerPromotion));
        continue;
      }
      customerPromoPromises.push(this.customerPromotion.create({
        customerId: id,
        promotionId: promo,
        displayedCount: 1,
        customerActions: [],
      }));
    }
    await Promise.all(customerPromoPromises);

    ///Busca los actions redirect
    const actions = await this._actionsService.getMultiple(actionsIds);

    if (landingIds == null || landingIds.length <= 0) {
      return [];
    }

    ///Obtiene los templates llenos
    const templateResult = await this._contactabilityService.getFilledTemplates(landingIds, parameters);
    const data = templateResult.data.content.map((item: any) => {
      const landing = landings.find((landing) => landing.value == item._id);
      const specificAction = actions.find((action) => action._id == landing.actionValue);
      return {
        ...landing,
        action: specificAction,
        templateName: item.name,
        title: item.title,
        subject: item.subject,
        body: item.body,
      };
    });

    return data;
  }

  async RegisterAction(customerId: string, promotionId: string, action: CustomerActionEnum): Promise<void> {
    try {
      const promotionExists = await this._promotionService.exists(promotionId);
      if (!promotionExists)
        throw new NotFoundException('Promotion no encontrada');

      let customerPromotion = await this.customerPromotion.findOne({ promotionId: promotionId, customerId: customerId }).exec();
      if (customerPromotion == null) {
        await this.customerPromotion.create({
          customerId: customerId,
          promotionId: promotionId,
          displayedCount: 1,
          customerActions: [{ action: action, date: new Date() }],
        });
        return;
      }

      customerPromotion.customerActions.push({ action: action, date: new Date() });
      await this.customerPromotion.findByIdAndUpdate(customerPromotion._id, customerPromotion);
    } catch (error) {
      if (error.kind === 'ObjectId')
        throw new BadRequestException('Id de promocion inválido');
      else
        throw error;
    }
  }
}
