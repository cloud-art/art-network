import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { Contact, ContactSchema } from "./schemas/contact.schema";
import { Post, PostSchema } from "src/post/schemas/post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
            {name: Contact.name, schema: ContactSchema},
            {name: Post.name, schema: PostSchema}
        ]),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}