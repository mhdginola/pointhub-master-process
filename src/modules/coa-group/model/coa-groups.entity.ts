export enum CoaGroupsStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface CoaGroupsEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CoaGroupsEntity implements CoaGroupsEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(coaGroups: CoaGroupsEntityInterface) {
    this._id = coaGroups._id;
    this.name = coaGroups.name;
    this.createdAt = coaGroups.createdAt;
    this.updatedAt = coaGroups.updatedAt;
  }
}
