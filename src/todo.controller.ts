import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTask } from './dtos/create-task.dto';
import { TodoTask } from './todo.entity';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  @ApiResponse({ status: 200, description: 'The all task has been return'})
  async findAllTask(): Promise<TodoTask[]> {
    return this.todoService.findAll();
  }

  @Post('')
  @ApiResponse({ status: 201, description: 'The task has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Something went wrong.'})
  async createTodoTask(@Body() newTask: CreateTask) {

    try {
        await this.todoService.createTodoTask(newTask);
    } catch (error) {
        throw new BadRequestException(`Can't create task : ${error}`);
    }

    return this.todoService.findAll();
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.'})
  @ApiResponse({ status: 400, description: 'Something went wrong.'})
  @ApiResponse({ status: 404, description: 'Not found exception'})
  async updateTask(
    @Param('id') id: string, 
    @Body() task: CreateTask) {

    console.log(task);

    try {
        await this.todoService.update(Number(id), task);
    } catch (error) {
        throw new BadRequestException(`Can't update task : ${error}`);
    }

    return this.todoService.findAll();
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.'})
  @ApiResponse({ status: 400, description: 'Something went wrong.'})
  @ApiResponse({ status: 404, description: 'Not found exception'})
  async deleteTask(@Param('id') id: string) {

    try {
        await this.todoService.delete(Number(id));
    } catch (error) {
        throw new BadRequestException(`Can't update task : ${error}`);
    }

    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get task by specific id'})
  @ApiResponse({ status: 404, description: 'Not found task'})
  async getTaskById(
    @Param('id') id: string
  ): Promise<TodoTask> {
    
    const task: TodoTask | null = await this.todoService.findById(Number(id));
    
    if(!task) {
        throw new NotFoundException('Not found task id : ' + id);
    }

    return task;
  }

  @ApiResponse({ status: 200, description: 'The task by status has been return'})
  @Get('')
  async getByFinishedTask(
    @Query('finished') status: string
  ): Promise<TodoTask[]> {
    return this.todoService.finishedOrNot(status === 'true' ? true : false);
  }
}
