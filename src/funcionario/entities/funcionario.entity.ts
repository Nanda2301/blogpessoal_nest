import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_funcionarios" })
export class Funcionario {

    @PrimaryGeneratedColumn()
    id_funcionario: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 50, nullable: false })
    cargo: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 14, nullable: false, unique: true })
    cpf: string;

    @IsNotEmpty()
    @IsEmail()
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    senha: string;

    @Column({ type: "date", nullable: false })
    data_admissao: Date;
}