import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Types } from "mongoose";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('/user')
export class UserController {
    constructor(
        private userService: UserService,
    ){}

    // User

    login(){
        
    }

    @Post('/registration')
    registration(@Body() dto: CreateUserDto){
        return this.userService.registration(dto)
    }

    auth(){

    }

    @Get()
    getAll(){
        return this.userService.getAll()
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