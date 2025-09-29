import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Projects') // 👈 группа в Swagger
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать проект' })
  @ApiResponse({ status: 201, description: 'Проект успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiBody({ type: CreateProjectDto })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список проектов' })
  @ApiResponse({ status: 200, description: 'Список проектов' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить проект по ID' })
  @ApiResponse({ status: 200, description: 'Информация о проекте' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить проект по ID' })
  @ApiResponse({ status: 200, description: 'Проект обновлён' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  @ApiBody({ type: UpdateProjectDto })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить проект по ID' })
  @ApiResponse({ status: 200, description: 'Проект удалён' })
  @ApiResponse({ status: 404, description: 'Проект не найден' })
  @ApiParam({ name: 'id', description: 'ID проекта' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
