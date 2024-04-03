import { CustomerActionEnum } from "../enums/action.enum";
import { IsByteLength, IsEnum, IsNotEmpty, IsUUID, Length, MIN_LENGTH, MaxLength, MinLength, isNotEmpty } from "class-validator";
export class CustomerPromotionDto {
    @IsNotEmpty()
    @Length(24,24)
    promotionId: string;
    @IsNotEmpty()
    customerId: string;
    @IsEnum(CustomerActionEnum)
    action: CustomerActionEnum;
}