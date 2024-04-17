import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll() {
        return this.todoService.findAllTasks();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOneTask(id);
    }

    @Post()
    createTask(@Body() task: Todo) {
        return this.todoService.createTask(task);
    }

    @Put(':id')
    updateTask(@Param('id') id: string, @Body() task: Todo) {
        return this.todoService.updateTask(id, task);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string){
        return this.todoService.deleteTask(id);
    }
}