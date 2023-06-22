import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schemas/post.schema";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { User, UserSchema } from "src/user/schemas/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Post.name, schema: PostSchema},
            {name: User.name, schema: UserSchema}
        ]),
        // MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {}