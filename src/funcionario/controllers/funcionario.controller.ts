import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Funcionario } from "../entities/funcionario.entity";
import { FuncionarioService } from "../services/funcionario.services";

@ApiTags('Funcionario')
@Controller("/funcionarios")
export class FuncionarioController {
    constructor(private readonly funcionarioService: FuncionarioService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Funcionario[]> {
        return this.funcionarioService.findAll();
    }

    @Get('/:id_funcionario')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_funcionario', ParseIntPipe) id_funcionario: number): Promise<Funcionario> {
        return this.funcionarioService.findById(id_funcionario);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Funcionario[]> {
        return this.funcionarioService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() funcionario: Funcionario): Promise<Funcionario> {
        return this.funcionarioService.create(funcionario);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() funcionario: Funcionario): Promise<Funcionario> {
        return this.funcionarioService.update(funcionario);
    }

    @Delete('/:id_funcionario')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_funcionario', ParseIntPipe) id_funcionario: number) {
        return this.funcionarioService.delete(id_funcionario);
    }
}