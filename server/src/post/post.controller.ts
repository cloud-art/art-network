import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { Types } from "mongoose";
import { CreatePostDto } from "../post/dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller('/post')
export class PostController {
    constructor(
        private postService: PostService,
    ){}
    @Post('/create')
    
    createPost(@Body() dto: CreatePostDto){
        return this.postService.createPost(dto)
    }

    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number
    ){
        const post = this.postService.getAllPosts(count, offset)
        return post
    }

    @Get(':id')
    getOne(@Param('id') id: Types.ObjectId){
        const post = this.postService.getOnePost(id)
        return post
    }

    @Put(':id')
    update(@Param('id') id: Types.ObjectId, @Body() dto: UpdatePostDto){
        const post = this.postService.updatePost(id, dto)
        return post
    }

    @Delete(':id')
    deletePost(@Param('id') id: Types.ObjectId){
        const post = this.postService.deletePost(id)
        return post
    }
} 