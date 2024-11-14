export enum RabbitMQ {
  UserQueue = 'users',
  AreaQueue = 'area',
  QuestionsQueue = 'question',
  RespuestaQueue = 'respuestas',

}
  
  export enum AreaMSG {
    CREATE = 'CREATE_AREA',
    FIND_ALL =  'FIND_AREA',
    FIND_ONE = 'FIND_AREA',
    UPDATE = 'UPDATE_AREA',
    DELETE = 'DELETE_AREA',
    FIND_TOP_REQUESTED = 'FIND_TOP_REQUESTED',
   
  }


export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}

export enum QuestionsMSG {
  CREATE = 'CREATE_SERVICES',
  FIND_ALL =  'FIND_SERVICES',
  FIND_ONE = 'FIND_SERVICE',
  UPDATE = 'UPDATE_SERVICE',
  DELETE = 'DELETE_SERVICE',
  FIND_BY_USER = "FIND_SERVICES_USER",
   SAVE_ANSWER ="SAVE_ANSWERS",
}


export enum RespuestaMsg {
  CREATE = 'CREATE_RESPUESTA',
  FIND_ALL = 'FIND_RESPUESTAS',
  FIND_ONE = 'FIND_RESPUESTA',
  UPDATE = 'UPDATE_RESPUESTA',
  DELETE = 'DELETE_RESPUESTA',
  FIND_BY_USER = 'FIND_RESPUESTA_USER',
}
