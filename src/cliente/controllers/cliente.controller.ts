import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Cliente } from "../entities/cliente.entity";
import { ClienteService } from "../services/cliente.service";

@ApiTags('Cliente')
@Controller("/clientes")
@ApiBearerAuth()
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cliente[]> {
        return this.clienteService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:id_cliente')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id_cliente', ParseIntPipe) id_cliente: number): Promise<Cliente> {
        return this.clienteService.findById(id_cliente);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() cliente: Cliente): Promise<Cliente> {
        return await this.clienteService.create(cliente);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() cliente: Cliente): Promise<Cliente> {
        return this.clienteService.update(cliente);
    }

}