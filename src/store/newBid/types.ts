export class Bid {
  phone = ""; // номер телефона
  firstName = ""; // имя
  lastName = ""; // фамилия
  secondName = ""; // отчество
  status = ""; // статус лица
  dateOfBirth = ""; // дата рождения
  region = ""; // регион
  city = ""; // город
  dateOfVisit = ""; // дата посещения банка
  insuranse = ""; // снилс
  creditTime = ""; // срок кредита
  creditAmount = ""; // сумма кредита
}

export const enum types {
  NEW_BID_PARAMETERS_SET = "NEW_BID_PARAMETERS_SET",
}

interface setNewBidParameters {
  type: types.NEW_BID_PARAMETERS_SET;
  payload: Partial<Bid>;
}

export type NewBidActions = setNewBidParameters;
