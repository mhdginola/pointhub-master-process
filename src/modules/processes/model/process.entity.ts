export enum ProcessStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export interface ProcessEntityInterface {
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  optionalUniqueColumn?: string;
  status?: ProcessStatusTypes;
  createdAt?: Date;
  updatedAt?: Date;
  isArchive?: boolean;
}

export class ProcessEntity implements ProcessEntityInterface {
  public _id?: string;
  public name?: string;
  public firstName?: string;
  public lastName?: string;
  public optionalUniqueColumn?: string;
  public status?: ProcessStatusTypes;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isArchive?: boolean;

  constructor(process: ProcessEntityInterface) {
    this._id = process._id;
    this.name = process.name;
    this.firstName = process.firstName;
    this.lastName = process.lastName;
    this.optionalUniqueColumn = process.optionalUniqueColumn;
    this.status = process.status;
    this.createdAt = process.createdAt;
    this.updatedAt = process.updatedAt;
    this.isArchive = process.isArchive;
  }
}
