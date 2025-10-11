import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Bcrypt } from 'src/auth/bcrypt/bcrypt'; 

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>,
        private bcrypt: Bcrypt 
    ) { }

    async findByEmail(email: string): Promise<Cliente | null> {
        return await this.clienteRepository.findOne({
            where: {
                email: email
            }
        });
    }

    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }

    async findById(id_cliente: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({
            where: {
                id_cliente
            }
        });

        if (!cliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        return cliente;
    }

    async create(cliente: Cliente): Promise<Cliente> {
        const buscaCliente = await this.findByEmail(cliente.email);

        if (buscaCliente)
            throw new HttpException("O e-mail já existe!", HttpStatus.BAD_REQUEST);

        cliente.senha = await this.bcrypt.criptografarSenha(cliente.senha) 
        return await this.clienteRepository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        const buscaCliente = await this.findById(cliente.id_cliente);

        if (!buscaCliente || !cliente.id_cliente)
            throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

        const buscaEmail = await this.findByEmail(cliente.email);

        if (buscaEmail && buscaEmail.id_cliente !== cliente.id_cliente)
            throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);

        cliente.senha = await this.bcrypt.criptografarSenha(cliente.senha) // Criptografa a senha antes de atualizar
        return await this.clienteRepository.save(cliente);
    }
}