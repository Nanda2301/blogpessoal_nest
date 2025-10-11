import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Medicamento } from "../../medicamento/entities/medicamento.entity";
import { Funcionario } from "../../funcionario/entities/funcionario.entity";
import { Cliente } from "../../cliente/entities/cliente.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'db_farmacia',
            entities: [Medicamento, Funcionario, Cliente],
            synchronize: true,
        };
    }
}