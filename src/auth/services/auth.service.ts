import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { ClienteService } from 'src/cliente/services/cliente.service';
import { ClienteLogin } from '../entities/clientelogin.entity';

@Injectable()
export class AuthService {
    constructor(
        private clienteService: ClienteService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ) { }

    async validateUser(email: string, senha: string): Promise<any> {
        const buscaCliente = await this.clienteService.findByEmail(email);

        if (!buscaCliente)
            throw new HttpException('E-mail não encontrado!', HttpStatus.NOT_FOUND);

        const matchPassword = await this.bcrypt.compararSenhas(senha, buscaCliente.senha);

        if (buscaCliente && matchPassword) {
            const { senha, ...resposta } = buscaCliente;
            return resposta;
        }

        return null;
    }

    async login(clienteLogin: ClienteLogin) {
        const cliente = await this.validateUser(clienteLogin.email, clienteLogin.senha);

        if (!cliente) {
            throw new HttpException('E-mail ou senha inválidos!', HttpStatus.UNAUTHORIZED);
        }

        const payload = { sub: cliente.email };

        return {
            id_cliente: cliente.id_cliente,
            nome: cliente.nome,
            email: cliente.email,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}