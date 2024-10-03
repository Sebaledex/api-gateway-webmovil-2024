export enum RabbitMQ {
  UserQueue = 'users',
  AreaQueue = 'area',

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

