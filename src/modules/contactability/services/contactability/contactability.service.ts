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
import { PromotionDto } from '../../dtos/promotion.dto';
import { Rule } from 'src/modules/rule/interfaces/rule.interface';
import { EvaluationResultDto } from '../../dtos/evluation-result.dto';
import { Engine } from 'json-rules-engine';
import { RuleService } from 'src/modules/rule/services/rule/rule.service';
import { RabbitService } from 'src/modules/common/rabbit/services/rabbit/rabbit.service';
import { RabbitListenerService } from '../../../common/rabbit/services/rabbit/rabbitListenService.service';
import { CONTACTABILITY_EVENTS } from 'src/modules/common/events/contactability-events';
import { resolve } from 'path';

@Injectable()
export class ContactabilityService {
  constructor(
    private readonly logger: Logger,
    private readonly rabbitService: RabbitService,
    // private readonly rListen: RabbitListenerService
  ) {
    // this.rabbitService.listenToEvents(CONTACTABILITY_EVENTS.templateList.on);

  }

  async getPaginated(
  ): Promise<any> {

    const evntPayload = {
      data: {
        data: {}
      }
    }
 
    console.log('emitido')
    const response = await new Promise((resolve, reject) => {
      this.rabbitService.emit(evntPayload, CONTACTABILITY_EVENTS.templateList.emit);
      this.rabbitService.listenToEvents(CONTACTABILITY_EVENTS.templateList.on)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
    // console.log('Evento emitido y respuesta recibida:', response);
  
    return response;
  }
  catch(error) {
    console.error('Error al obtener paginado:', error);
    throw error;
  }




}



