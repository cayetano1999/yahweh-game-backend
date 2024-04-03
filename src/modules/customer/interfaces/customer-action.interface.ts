import { CustomerActionEnum } from "../enums/action.enum";

export interface CustomerAction {
  action: CustomerActionEnum;
  date: Date;
}
