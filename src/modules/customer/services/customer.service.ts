import { Injectable } from '@nestjs/common';
import { PromotionService } from 'src/modules/promotion/services/promotion/promotion.service';
import { Promotion } from '../../promotion/interfaces/promotion.interface';
import { EvaluationResultDto } from 'src/modules/promotion/dtos/evluation-result.dto';
import { ContactabilityService } from 'src/modules/contactability/services/contactability/contactability.service';
import { ActionsService } from 'src/modules/actions/services/actions/actions.service';
import { LandingDto } from '../dtos/landing.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly _promotionService: PromotionService,
    private readonly _contactabilityService: ContactabilityService,
    private readonly _actionsService: ActionsService,
  ) { }

  async GetValidPromotionsLandings(id: string, parameters: any): Promise<LandingDto[]> {
    try {
      /// Busca todas las prociones activas
      const validPromotions = await this._promotionService.getActivePromotions();
      const evaluations: Promise<EvaluationResultDto>[] = [];

      ///Ejecuta las evaluaciones a cada promocion sin esperar el resultado
      for (const promotion of validPromotions) {
        evaluations.push(this._promotionService.evaluate(promotion.id, parameters));
      }

      ///Espera a que todas las evaluaciones terminen
      const results = await Promise.all(evaluations);
      const ids = results.filter((result) => result.success).map((result) => result.promotionId);

      ///Filtra las promociones que tienen landing
      const landings = validPromotions
        .filter((promotion) => ids.includes(promotion.id))
        .flatMap((promotion) => promotion.promotionDetails.filter(x => x.type === 'LANDING'));
      
      const landingIds = [];
      const actionsIds = [];

      for (const item of landings) {
        landingIds.push(item.value);
        actionsIds.push(item.actionValue);
      }

      
      ///Busca los actions
      const actions = await this._actionsService.getMultiple(actionsIds);

      ///Obtiene los templates llenos
      if (landingIds == null || landingIds.length <= 0) {
        return [];
      }

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
    } catch (error) {
      throw error;
    }

  }
}
