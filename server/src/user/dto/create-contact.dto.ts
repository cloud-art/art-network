import { Types } from "mongoose";

export class CreateContactDto {
    readonly userParent: Types.ObjectId;
    readonly userChildren: Types.ObjectId;
}