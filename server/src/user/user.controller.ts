import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Types } from "mongoose";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('/user')
export class UserController {
    constructor(
        private userService: UserService,
    ){}

    // User

    login(){
        
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@UploadedFile() avatar: Express.Multer.File, @Body() dto: CreateUserDto){
        return this.userService.registration(avatar, dto)
    }

    auth(){

    }

    @Get()
    getAll(){
        return this.userService.getAll()
    }

    @Get('/searchUser')
    searchUser(
        @Query('search') search: string,
        @Query('count') count: number,
        @Query('offset') offset: number
    ){
        return this.userService.search(search, count, offset)
    }

    @Get('/getOne/:id')
    getOne(@Param('id') id: Types.ObjectId){
        return this.userService.getOne(id)
    }

    @Put('/updateUser/:id')
    updateUser(@Param('id') id: Types.ObjectId, @Body() dto: UpdateUserDto){
        return this.userService.updateUser(id, dto)
    }

    @Delete('/deleteUser/:id')
    delete(@Param('id') id: Types.ObjectId){
        return this.userService.delete(id)
    }

    // Contacts
    @Post('/createContact')
    createContact(@Body() dto: CreateContactDto){
        return this.userService.createContact(dto)
    }

    @Get('/contact')
    getAllContacts(){
        return this.userService.getAllContacts()
    }

    @Delete('/deleteContact/:id')
    deleteContact(@Param('id') id: Types.ObjectId){
        return this.userService.deleteContact(id)
    }
} 