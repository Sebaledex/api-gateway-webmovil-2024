export enum RabbitMQ {
  UserQueue = 'users',
  QuestionnairesQueue = 'questionnaires',
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
}

export enum QuestionnaireMsg {
  CREATE = 'CREATE_QUESTIONNAIRE',
  FIND_ALL = 'FIND_QUESTIONNAIRES',
  FIND_ONE = 'FIND_QUESTIONNAIRE',
  UPDATE = 'UPDATE_QUESTIONNAIRE',
  DELETE = 'DELETE_QUESTIONNAIRE',
}

export enum tokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
