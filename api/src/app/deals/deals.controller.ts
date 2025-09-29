import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Deals') // 👈 Группа в Swagger
@Controller('deals')
@UseGuards(AuthGuard('jwt'))
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать сделку' })
  @ApiResponse({ status: 201, description: 'Сделка успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateDealDto })
  create(@Body() createDealDto: CreateDealDto) {
    return this.dealsService.create(createDealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список сделок' })
  @ApiResponse({ status: 200, description: 'Список сделок' })
  findAll() {
    return this.dealsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить сделку по ID' })
  @ApiResponse({ status: 200, description: 'Информация о сделке' })
  @ApiResponse({ status: 404, description: 'Сделка не найдена' })
  @ApiParam({ name: 'id', description: 'ID сделки' })
  findOne(@Param('id') id: string) {
    return this.dealsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить сделку по ID' })
  @ApiResponse({ status: 200, description: 'Сделка обновлена' })
  @ApiResponse({ status: 404, description: 'Сделка не найдена' })
  @ApiParam({ name: 'id', description: 'ID сделки' })
  @ApiBody({ type: UpdateDealDto })
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDto) {
    return this.dealsService.update(id, updateDealDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить сделку по ID' })
  @ApiResponse({ status: 200, description: 'Сделка удалена' })
  @ApiResponse({ status: 404, description: 'Сделка не найдена' })
  @ApiParam({ name: 'id', description: 'ID сделки' })
  remove(@Param('id') id: string) {
    return this.dealsService.remove(id);
  }
}
