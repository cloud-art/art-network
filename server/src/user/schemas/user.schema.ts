import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  password: string;

  @Prop({type: [{type: Types.ObjectId, ref: 'Post'}]})
  posts: Array<Types.ObjectId>;

  @Prop({type: [{type: Types.ObjectId, ref: 'Contact'}]})
  contacts: Array<Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);
