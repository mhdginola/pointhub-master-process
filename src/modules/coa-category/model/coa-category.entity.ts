export enum CoaCategoryStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface CoaCategoryEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CoaCategoryEntity implements CoaCategoryEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(coaCategory: CoaCategoryEntityInterface) {
    this._id = coaCategory._id;
    this.name = coaCategory.name;
    this.createdAt = coaCategory.createdAt;
    this.updatedAt = coaCategory.updatedAt;
  }
}
