import { Injectable, UploadedFile } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateContactDto } from "./dto/create-contact.dto";
import { Contact } from "./schemas/contact.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FileService, FileType } from "src/file/file.service";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Contact.name) private contactModel: Model<Contact>,
        private fileService: FileService
    ) {}

    // Users

    async login(){

    }

    async registration(@UploadedFile() avatar: Express.Multer.File, dto: CreateUserDto): Promise<User>{
        const avatarPath = this.fileService.createFile(FileType.IMAGE, avatar)
        const user = await this.userModel.create({...dto, avatar: avatarPath})
        return user
    }

    async auth(){

    }

    async getAll(): Promise<Array<User>>{
        const users = await this.userModel.find()
        return users
    }

    async getOne(id: Types.ObjectId): Promise<User | null>{
        const user = await this.userModel.findById(id).populate('posts contacts')
        return user
    } 

    async search(search: string, count: number = 10, offset: number = 0): Promise<Array<User>>{
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