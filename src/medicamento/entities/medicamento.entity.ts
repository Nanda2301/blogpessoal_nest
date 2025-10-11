import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_medicamentos"})
export class Medicamento {

    @PrimaryGeneratedColumn()
    id_medicamento: number;

    @IsNotEmpty()
    @IsString()
    @Column({length: 100, nullable: false})
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({length: 100, nullable: false})
    fabricante: string;

    @IsNotEmpty()
    @IsNumber()
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    preco: number;

    @IsNotEmpty()
    @IsNumber()
    @Column({nullable: false})
    quantidade_estoque: number;

    @Column({type: "date", nullable: false})
    data_validade: Date;

    @IsNotEmpty()
    @IsString()
    @Column({length: 50, nullable: false})
    codigo_barras: string;

    @IsNotEmpty()
    @IsString()
    @Column({length: 50, nullable: false})
    tipo: string;

    @IsNotEmpty()
    @IsString()
    @Column({length: 500, nullable: false})
    descricao: string;
}