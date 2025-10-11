import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Funcionario } from "../entities/funcionario.entity";

@Injectable()
export class FuncionarioService {
    constructor(
        @InjectRepository(Funcionario)
        private funcionarioRepository: Repository<Funcionario>
    ) { }

    async findAll(): Promise<Funcionario[]> {
        return await this.funcionarioRepository.find();
    }

    async findById(id_funcionario: number): Promise<Funcionario> {
        const funcionario = await this.funcionarioRepository.findOne({
            where: {
                id_funcionario
            }
        });

        if (!funcionario)
            throw new HttpException('Funcionário não encontrado!', HttpStatus.NOT_FOUND);

        return funcionario;
    }

    async findByNome(nome: string): Promise<Funcionario[]> {
        return await this.funcionarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async create(funcionario: Funcionario): Promise<Funcionario> {
        return await this.funcionarioRepository.save(funcionario);
    }

    async update(funcionario: Funcionario): Promise<Funcionario> {
        const buscaFuncionario = await this.findById(funcionario.id_funcionario);

        if (!buscaFuncionario || !funcionario.id_funcionario)
            throw new HttpException('Funcionário não encontrado!', HttpStatus.NOT_FOUND);

        return await this.funcionarioRepository.save(funcionario);
    }

    async delete(id_funcionario: number): Promise<void> {
        const buscaFuncionario = await this.findById(id_funcionario);

        if (!buscaFuncionario)
            throw new HttpException('Funcionário não encontrado!', HttpStatus.NOT_FOUND);

        await this.funcionarioRepository.delete(id_funcionario);
    }
}