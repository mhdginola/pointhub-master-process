export enum CoaTypesStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface CoaTypesEntityInterface {
  idCustom?: string;
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CoaTypesEntity implements CoaTypesEntityInterface {
  public idCustom?: string;
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(coaTypes: CoaTypesEntityInterface) {
    this.idCustom = coaTypes.idCustom;
    this._id = coaTypes._id;
    this.name = coaTypes.name;
    this.createdAt = coaTypes.createdAt;
    this.updatedAt = coaTypes.updatedAt;
  }
}
