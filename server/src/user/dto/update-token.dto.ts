import { Types } from "mongoose";

export class UpdateTokenDto {
    readonly id: Types.ObjectId;
    readonly username: string;
    readonly name: string;
    readonly surname: string;
    readonly avatar: string;
}