import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Medicamento } from "../entities/medicamento.entity";
import { MedicamentoService } from "../services/medicamento.service";



@ApiTags('Medicamento')
@Controller("/medicamento")
export class MedicamentoController {
    constructor(private readonly medicamentoService: MedicamentoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Medicamento[]> {
        return this.medicamentoService.findAll();
    }

    @Get('/:id_medicamento')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_medicamento', ParseIntPipe) id_medicamento: number): Promise<Medicamento> {
        return this.medicamentoService.findById(id_medicamento);
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Medicamento[]> {
        return this.medicamentoService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() medicamento: Medicamento): Promise<Medicamento> {
        return this.medicamentoService.create(medicamento);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() medicamento: Medicamento): Promise<Medicamento> {
        return this.medicamentoService.update(medicamento);
    }

    @Delete('/:id_medicamento')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id_medicamento', ParseIntPipe) id_medicamento: number) {
        return this.medicamentoService.delete(id_medicamento);
    }
}