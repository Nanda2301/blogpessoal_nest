import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { MedicamentoModule } from "./medicamento/medicamento.module";
import { FuncionarioModule } from "./funcionario/funcionario.module";
import { ClienteModule } from "./cliente/cliente.module";
import { AuthModule } from "./auth/auth.module";
import { DevService } from "./data/services/dev.service"; // Importando o DevService

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DevService, // Usando o DevService para a configuração do banco de dados
        }),
        MedicamentoModule,
        FuncionarioModule,
        ClienteModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}