import { Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Deal, DealDocument} from "@arch-crm/data-access";
import {Model} from "mongoose";
import {DealStatusEnum} from "@arch-crm/general";

@Injectable()
export class DealsService {
  constructor(@InjectModel(Deal.name) private dealModel: Model<DealDocument>) {
  }

  create(createDealDto: CreateDealDto) {
    const createDeal = new this.dealModel(createDealDto);
    return createDeal.save();
  }

  findAll() {
    return this.dealModel.find().exec();
  }

  findOne(id: string) {
    return this.dealModel.findById(id).exec();
  }

  update(id: string, updateDealDto: UpdateDealDto) {
    return this.dealModel.findByIdAndUpdate(id, { $set: { ...updateDealDto }}, { new: true }).exec();
  }

  remove(id: string) {
    return this.dealModel.findByIdAndUpdate(id, { $set: { status: DealStatusEnum.DELETED }}, { new: true }).exec();
  }
}
