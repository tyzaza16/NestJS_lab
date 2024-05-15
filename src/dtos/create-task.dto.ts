import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTask {

    @ApiProperty({
        description: 'Title of Tasks',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty({
        description: 'unix time in milliseconds',
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    dueDate: number; // unix

    @ApiProperty({
        description: 'responsibility of the task',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    taskResponsibility: string;

    @ApiProperty({
        description: 'status of task',
        default: false,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    finished?: boolean;
}