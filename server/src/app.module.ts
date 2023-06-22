import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { MongooseModule } from "@nestjs/mongoose";
import 'dotenv/config'

@Module({
    imports: [
        MongooseModule.forRoot(process.env.DB_URL || "mongodb://localhost:27017/art-network"),
        UserModule,
        PostModule,
    ]
}) 
export class AppModule {}