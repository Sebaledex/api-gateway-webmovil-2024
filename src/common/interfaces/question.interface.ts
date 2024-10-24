

export interface IPregunta {
    pregunta: string; // El texto de la pregunta
    tipo: 'abierta' | 'multiple' | 'escala'; // Tipo de la pregunta
    opciones?: string[]; // Solo para preguntas de tipo 'multiple', contiene las opciones de respuesta
    respuestaEscala?: number; // Solo para preguntas de tipo 'escala', valor entre 1 y 5
    respuestaAbierta?: string; // Solo para preguntas de tipo 'abierta', una respuesta de texto
}

export interface IQuestion extends Document {
    nombre: string; // Nombre del cuestionario
    descripcion: string; // Descripción del cuestionario
    precio: number; // Precio asociado al cuestionario
    contacto: string; // Información de contacto
    fotos: string[]; // Array de URLs de las fotos
    user_id: string; // ID del usuario que creó el cuestionario
    rating: number; // Rating del cuestionario
    contadorSolicitudes: number; // Contador de solicitudes
    cuestionario: IPregunta[]; // Array de preguntas del cuestionario
}
