import { forwardRef, Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ClienteModule } from "../cliente/cliente.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        forwardRef(() => ClienteModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "1h" },
        })
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule {}