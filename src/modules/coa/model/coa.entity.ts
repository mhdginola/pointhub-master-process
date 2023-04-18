export enum SubledgerTypes {
  Item = "item",
  Suspended = "suspended",
}

export enum PositionTypes {
  Debit = "debit",
  Suspended = "suspended",
}

export enum CoaStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface CoaEntityInterface {
  _id?: string;
  number?: number;
  name?: string;
  category_id?: string;
  group_id?: string;
  type_id?: string;
  subledger?: SubledgerTypes;
  position?: PositionTypes;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CoaEntity implements CoaEntityInterface {
  public _id?: string;
  public number?: number;
  public name?: string;
  public category_id?: string;
  public group_id?: string;
  public type_id?: string;
  public subledger?: SubledgerTypes;
  public position?: PositionTypes;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(coa: CoaEntityInterface) {
    this._id = coa._id;
    this.number = coa.number;
    this.name = coa.name;
    this.category_id = coa.category_id;
    this.group_id = coa.group_id;
    this.type_id = coa.type_id;
    this.subledger = coa.subledger;
    this.position = coa.position;
    this.createdAt = coa.createdAt;
    this.updatedAt = coa.updatedAt;
  }
}
