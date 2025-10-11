import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./entities/cliente.entity";
import { AuthModule } from "../auth/auth.module";
import { ClienteService } from "./services/cliente.service";
import { ClienteController } from "./controllers/cliente.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cliente]),
        forwardRef(() => AuthModule),
    ],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [ClienteService],
})
export class ClienteModule {}