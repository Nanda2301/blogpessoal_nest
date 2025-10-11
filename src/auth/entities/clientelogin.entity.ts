import { ApiProperty } from "@nestjs/swagger/dist"



export class ClienteLogin {

    @ApiProperty() 
    public email: string

    @ApiProperty() 
    public senha: string

}