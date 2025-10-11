import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Medicamento } from "../entities/medicamento.entity";

@Injectable()
export class MedicamentoService {
    constructor(
        @InjectRepository(Medicamento)
        private medicamentoRepository: Repository<Medicamento>
    ) { }

    async findAll(): Promise<Medicamento[]> {
        return await this.medicamentoRepository.find();
    }

    async findById(id_medicamento: number): Promise<Medicamento> {
        const medicamento = await this.medicamentoRepository.findOne({
            where: {
                id_medicamento
            }
        });

        if (!medicamento)
            throw new HttpException('Medicamento não encontrado!', HttpStatus.NOT_FOUND);

        return medicamento;
    }

    async findByNome(nome: string): Promise<Medicamento[]> {
        return await this.medicamentoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async create(medicamento: Medicamento): Promise<Medicamento> {
        return await this.medicamentoRepository.save(medicamento);
    }

    async update(medicamento: Medicamento): Promise<Medicamento> {
        const buscaMedicamento = await this.findById(medicamento.id_medicamento);

        if (!buscaMedicamento || !medicamento.id_medicamento)
            throw new HttpException('Medicamento não encontrado!', HttpStatus.NOT_FOUND);

        return await this.medicamentoRepository.save(medicamento);
    }

    async delete(id_medicamento: number): Promise<void> {
        const buscaMedicamento = await this.findById(id_medicamento);

        if (!buscaMedicamento)
            throw new HttpException('Medicamento não encontrado!', HttpStatus.NOT_FOUND);

        await this.medicamentoRepository.delete(id_medicamento);
    }
}