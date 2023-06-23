import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Types } from "mongoose";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateTokenDto } from "./dto/update-token.dto";

@Controller('/user')
export class UserController {
    constructor(
        private userService: UserService,
    ){}

    // User

    @Post('/login')
    login(@Body(ValidationPipe) dto: LoginUserDto){
        return this.userService.login(dto)
    }

    @Post('/registration')
    @UseInterceptors(FileInterceptor('avatar'))
    registration(@UploadedFile(ValidationPipe) avatar: Express.Multer.File, @Body(ValidationPipe) dto: CreateUserDto){
        return this.userService.registration(avatar, dto)
    }

    @Post('/updateToken')
    check(@Body(ValidationPipe) dto: UpdateTokenDto){
        return this.userService.updateToken(dto)
    }

    @Get('getAllUsers')
    getAll(){
        return this.userService.getAll()
    }

    @Get('/searchUser')
    searchUser(
        @Query('search') search: string,
        @Query('count') count: number,
        @Query('offset') offset: number
    ){
        return this.userService.searchUsers(search, count, offset)
    }

    @Get('/getOne/:id')
    getOne(@Param('id') id: Types.ObjectId){
        return this.userService.getOne(id)
    }

    @Put('/updateUser/:id')
    updateUser(@Param('id') id: Types.ObjectId, @Body(ValidationPipe) dto: UpdateUserDto){
        return this.userService.updateUser(id, dto)
    }

    @Delete('/deleteUser/:id')
    delete(@Param('id') id: Types.ObjectId){
        return this.userService.delete(id)
    }

    // Contacts
    @Post('/createContact')
    createContact(@Body(ValidationPipe) dto: CreateContactDto){
        return this.userService.createContact(dto)
    }

    @Get('/contact')
    getAllContacts(
        @Query('count') count: number,
        @Query('offset') offset: number
    ){
        return this.userService.getAllContacts(count, offset)
    }

    @Get('/searchContact')
    searchContact(
        @Query('id') id: Types.ObjectId,
        @Query('search') search: string,
        @Query('count') count: number,
        @Query('offset') offset: number
    ){
        return this.userService.searchContacts(id, search, count, offset)
    }

    @Delete('/deleteContact/:id')
    deleteContact(@Param('id') id: Types.ObjectId){
        return this.userService.deleteContact(id)
    }
} 