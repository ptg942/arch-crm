import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Clients') // 👈 Группа в Swagger
@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать клиента' })
  @ApiResponse({ status: 201, description: 'Клиент успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  @ApiBody({ type: CreateClientDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список клиентов' })
  @ApiResponse({ status: 200, description: 'Список клиентов' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить клиента по ID' })
  @ApiResponse({ status: 200, description: 'Информация о клиенте' })
  @ApiResponse({ status: 404, description: 'Клиент не найден' })
  @ApiParam({ name: 'id', description: 'ID клиента' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить клиента по ID' })
  @ApiResponse({ status: 200, description: 'Клиент обновлен' })
  @ApiResponse({ status: 404, description: 'Клиент не найден' })
  @ApiParam({ name: 'id', description: 'ID клиента' })
  @ApiBody({ type: UpdateClientDto })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить клиента по ID' })
  @ApiResponse({ status: 200, description: 'Клиент удален' })
  @ApiResponse({ status: 404, description: 'Клиент не найден' })
  @ApiParam({ name: 'id', description: 'ID клиента' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
