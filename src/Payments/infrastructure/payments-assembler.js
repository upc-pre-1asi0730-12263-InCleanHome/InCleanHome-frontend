import { PaymentsResource } from './payments-resource';

export class PaymentsAssembler {
  static toEntityList(apiResponseData) {
    if (!Array.isArray(apiResponseData)) return [];
    return apiResponseData.map(item => PaymentsResource.toEntity(item));
  }
}