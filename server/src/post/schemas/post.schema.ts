import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop()
    title: string;

    @Prop()
    text: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    user: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
