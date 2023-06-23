import { HttpException, HttpStatus, Injectable, UploadedFile } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateContactDto } from "./dto/create-contact.dto";
import { Contact } from "./schemas/contact.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileService, FileType } from "src/file/file.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateTokenDto } from "./dto/update-token.dto";
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';

const generateAccessToken = (
    id: Types.ObjectId,
    username: string, 
    name: string, 
    surname: string, 
    avatar: string
) => {
    const payload = {
        id: id,
        username: username,
        name: name,
        surname: surname,
        avatar: avatar
    }
    const secretKey = 'secretKey'
    return jwt.sign(payload, process.env.SECRET_JWT_KEY || secretKey, {expiresIn: "24h"} )
}

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Contact.name) private contactModel: Model<Contact>,
        private fileService: FileService
    ) {}

    // Users

    async registration(@UploadedFile() avatar: Express.Multer.File, dto: CreateUserDto): Promise<User>{
        const avatarPath = this.fileService.createFile(FileType.IMAGE, avatar) 
        const hashPassword = bcrypt.hashSync(dto.password, 7)
        const user = await this.userModel.create({...dto, password: hashPassword, avatar: avatarPath})
        return user
    }

    async login(dto: LoginUserDto){
        const user = await this.userModel.findOne({username: dto.username})

        if (!user) throw new HttpException({
            "statusCode": HttpStatus.NOT_FOUND,
            "message": "Пользователь не найден"
        }, HttpStatus.NOT_FOUND)

        const validPassword = bcrypt.compareSync(dto.password, user.password)

        if (!validPassword) throw new HttpException({
            "statusCode": HttpStatus.BAD_REQUEST,
            "message": "Неверный пароль"
        }, HttpStatus.BAD_REQUEST)

        const token = generateAccessToken(user.id, user.username, user.name, user.surname, user.avatar)
        // Поменять на нормальный возврат json
        return JSON.parse(`{"token": "${token}"}`)
    }

    async updateToken(dto: UpdateTokenDto){
        const token = generateAccessToken(
            dto.id, 
            dto.username, 
            dto.name, 
            dto.surname,
            dto.avatar
        )
        return JSON.parse(`{"token": "${token}"}`)
    }

    async getAll(): Promise<Array<User>>{
        const users = await this.userModel.find()
        return users
    }

    async getOne(id: Types.ObjectId): Promise<User | null>{
        const user = await this.userModel.findById(id).populate('posts contacts')
        return user
    } 

    async searchUsers(search: string, count: number = 10, offset: number = 0): Promise<Array<User>>{
        const users = await this.userModel.find({
            username: {$regex: new RegExp(search, 'i')}
        }).skip(offset).limit(count)
        return users
    } 

    async updateUser(id: Types.ObjectId, dto: UpdateUserDto): Promise<Types.ObjectId | null>{
        const user = await this.userModel.findByIdAndUpdate(id, dto)
        return user?.id
    }

    async delete(id: Types.ObjectId): Promise<Types.ObjectId | null>{
        const user = await this.userModel.findByIdAndDelete(id)
        user && this.fileService.removeFile(user.avatar) 
        return user?.id
    }

    // Contacts

    // async createContact(dto: CreateContactDto): Promise<Contact>{
    async createContact(dto: CreateContactDto): Promise<Contact>{
        const user = await this.userModel.findById(dto.userParent)
        const contact = await this.contactModel.create(dto)
        user?.contacts.push(contact._id)
        user?.save()
        return contact
    }

    async getOneContact(id: Types.ObjectId): Promise<Contact | null>{
        const contact = await this.contactModel.findById(id)
        return contact
    }

    async getAllContacts(count: number = 10, offset: number = 0): Promise<Array<any>>{
        const contacts = await this.contactModel.find().skip(offset).limit(count)
        return contacts
    }

        async searchContacts(id: Types.ObjectId, search: string, count: number = 10, offset: number = 0): Promise<Array<User>>{
        const user = await this.userModel.findById(id)
        const userContacts = await this.contactModel.find({_id: {$in: user?.contacts}})

        if (user){
            const users = await this.userModel.find({
                _id: {$in: userContacts.map(contact => contact.userChildren)},
                username: {$regex: new RegExp(search, 'i')}
            }).skip(offset).limit(count)
            return users
        }
        return []
    } 

    async deleteContact(id: Types.ObjectId): Promise<Types.ObjectId | null>{
        const contact = await this.contactModel.findById(id)
        if (contact){
            const user = await this.userModel.findById(contact.userParent)
            if (user){
                await this.userModel.updateOne({_id: contact.userParent}, {contacts: user.contacts.filter(userContact => userContact != contact.id)})
                contact.deleteOne()
                return contact.id
            }
        }
        return null
    }
}