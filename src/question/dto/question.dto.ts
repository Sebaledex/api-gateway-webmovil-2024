import { ApiProperty } from "@nestjs/swagger";
export class QuestionDTO {
    @ApiProperty()
    readonly nombre: string;
    @ApiProperty()
    readonly descripcion: string;
    @ApiProperty()
    readonly fotos: string[];
    @ApiProperty()
    readonly user_id: string;

    // Cuestionario
    readonly cuestionario: PreguntaDTO[];
}

export class PreguntaDTO {
    readonly numero: number; // Número de la pregunta
    readonly pregunta: string; // El texto de la pregunta
    readonly tipo: 'multiple'; // Solo permite preguntas de tipo 'multiple'
    readonly opciones: string[]; // Contiene las opciones de respuesta
    readonly respuestaSeleccionada?: string; // La respuesta seleccionada por el usuario
}
