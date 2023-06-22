import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { PostModule } from "./post/post.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import 'dotenv/config'

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot(process.env.DB_URL || "mongodb://localhost:27017/art-network"),
        UserModule,
        PostModule,
        FileModule
    ]
}) 
export class AppModule {}