import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Client, ClientDocument} from "@arch-crm/data-access";
import {Model} from "mongoose";
import {ClientStatusEnum} from "@arch-crm/general";

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {
  }

  create(createClientDto: CreateClientDto) {
    const createClient = new this.clientModel(createClientDto);
    return createClient.save();
  }

  findAll() {
    return this.clientModel.find().exec();
  }

  findOne(id: string) {
    return this.clientModel.findById(id).exec();
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.findByIdAndUpdate(id, { $set: { ...updateClientDto }}, { new: true }).exec();
  }

  remove(id: string) {
    return this.clientModel.findByIdAndUpdate(id, { $set: { status: ClientStatusEnum.DELETED }}, { new: true }).exec();
  }
}
