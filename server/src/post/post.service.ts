import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./schemas/post.schema";
import { Model, Types } from "mongoose";
import { CreatePostDto } from "../post/dto/create-post.dto";
import { User } from "src/user/schemas/user.schema";
import { UpdatePostDto } from "./dto/update-post.dto";


@Injectable()
export class PostService {

    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
    async createPost(dto: CreatePostDto): Promise<Post>{
        const user = await this.userModel.findById(dto.user)
        const post = await this.postModel.create(dto)
        user?.posts.push(post._id)
        await user?.save()
        return post
    }

    async getAllPosts(count: number = 10, offset: number = 0): Promise<Array<Post>>{
        const posts = this.postModel.find().skip(offset).limit(count)
        return posts
    }

    async getOnePost(id: Types.ObjectId): Promise<Post | null>{
        const post = this.postModel.findById(id)
        return post
    }

    async searchByTitle(search: string, count: number = 10, offset: number = 0): Promise<Array<Post>>{
        const posts = await this.postModel.find({
            title: {$regex: new RegExp(search, 'i')}
        }).skip(offset).limit(count)
        return posts
    } 

    async updatePost(id: Types.ObjectId, dto: UpdatePostDto): Promise<Types.ObjectId | null>{
        const post = await this.postModel.findByIdAndUpdate(id, dto)
        return post?.id
    }

    async deletePost(id: Types.ObjectId): Promise<Types.ObjectId | null>{
        const post = await this.postModel.findById(id)
        if (post){
            const user = await this.userModel.findById(post.user)
            if (user){
                await this.userModel.updateOne({_id: post.user}, {posts: user.posts.filter(userPost => userPost != post.id)})
                post.deleteOne()
                return post.id
            }
        }
        
        return null
    }
}