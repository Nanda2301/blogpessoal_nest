import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_clientes" })
export class Cliente {

    @PrimaryGeneratedColumn()
    id_cliente: number;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 100, nullable: false })
    nome: string;

    @IsNotEmpty()
    @IsString()
    @Column({ length: 14, nullable: false, unique: true })
    cpf: string;

    @IsString()
    @Column({ length: 20, nullable: true })
    telefone: string;

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 100, nullable: false, unique: true })
    email: string;

    @IsString()
    @Column({ length: 255, nullable: true })
    endereco: string;

    @Column({ type: "date", nullable: false })
    data_cadastro: Date;

    @MinLength(8) 
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string;
}