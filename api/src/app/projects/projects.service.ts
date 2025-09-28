import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Project, ProjectDocument} from "@arch-crm/data-access";
import {Model} from "mongoose";

import {ProjectStatusEnum} from "@arch-crm/general";

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {
  }

  create(createProjectDto: CreateProjectDto) {
    const createProject = new this.projectModel(createProjectDto);
    return createProject.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  findOne(id: string) {
    return this.projectModel.findById(id).exec();
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findByIdAndUpdate(id, { $set: { ...updateProjectDto }}, { new: true }).exec();
  }

  remove(id: string) {
    return this.projectModel.findByIdAndUpdate(id, { $set: { status: ProjectStatusEnum.ARCHIVED }}, { new: true }).exec();
  }
}
