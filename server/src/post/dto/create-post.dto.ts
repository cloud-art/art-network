import { Types } from "mongoose";

export class CreatePostDto {
    readonly tite: string;
    readonly text: string;
    readonly user: Types.ObjectId;
}