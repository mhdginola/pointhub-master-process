export interface ExampleEntityInterface {
  _id?: string;
  name?: string;
  status?: "active" | "suspended";
  createdAt?: Date;
}

export class ExampleEntity implements ExampleEntityInterface {
  public _id?: string;
  public name?: string;
  public status?: "active" | "suspended";
  public createdAt?: Date;

  constructor(example: ExampleEntityInterface) {
    this._id = example._id;
    this.name = example.name;
    this.status = example.status;
    this.createdAt = example.createdAt;
  }
}
