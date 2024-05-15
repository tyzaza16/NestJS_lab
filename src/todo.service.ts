import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTask } from './dtos/create-task.dto';
import { TodoTask } from './todo.entity';

@Injectable()
export class TodoService {
    private taskList: TodoTask[] = [];

    async createTodoTask(newTask: CreateTask) { // fix use dto not id
        this.taskList.push({ ...newTask, id: this.taskList.length+1, finished: false});
    }

    async findById(id: number): Promise<TodoTask | null> {
        return this.taskList.find( (task) => task.id === id);
    }

    async findAll(): Promise<TodoTask[]> {
        return this.taskList;
    }

    async update(id: number, task: Partial<TodoTask>): Promise<TodoTask>{
        const dbTask: TodoTask | null = await this.findById(id);
        const index: number = this.taskList.indexOf(dbTask)

        if(index === -1 || dbTask === null) {
            throw new NotFoundException('Not Found Task Id : ' + id);
        } 
        
        Object.assign(dbTask, task);

        this.taskList[index] = dbTask;
        return dbTask;
    }

    async delete(id: number) {
        const indexTask: number = this.taskList.map( (task) => task.id ).indexOf(id);

        if(indexTask === -1) {
            throw new NotFoundException('Not Found Task Id :' + id);
        } 
        
        this.taskList.splice(indexTask, 1);

        return this.taskList;
    }

    async finishedOrNot(statusFromReq: boolean) {
        return this.taskList.filter( (task) => task.finished === statusFromReq);
    }
}
