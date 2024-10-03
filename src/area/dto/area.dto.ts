
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


  
export class AreaDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly nombreArea: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly contacto: string;
    @ApiProperty()
    readonly fotos: string[];
    
  
    
}

