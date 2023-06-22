import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
    @Prop({type: Types.ObjectId, ref: 'Contact'})
    userParent: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'Contact'})
    userChildren: Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
