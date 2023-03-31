import DatabaseConnection, {
  DocumentInterface,
  QueryInterface,
  CreateResultInterface,
  ReadResultInterface,
  ReadManyResultInterface,
  UpdateResultInterface,
  DeleteResultInterface,
  CreateOptionsInterface,
  ReadOptionsInterface,
  ReadManyOptionsInterface,
  UpdateOptionsInterface,
  DeleteOptionsInterface,
  AggregateOptionsInterface,
  AggregateQueryInterface,
  AggregateResultInterface,
  CreateManyResultInterface,
  CreateManyOptionsInterface,
} from "./connection.js";

export abstract class BaseRepository {
  public db: DatabaseConnection;
  public name: string;

  constructor(db: DatabaseConnection, name: string) {
    this.db = db;
    this.name = name;
  }

  collection() {
    return this.db.collection(this.name);
  }

  abstract create(document: DocumentInterface, options?: CreateOptionsInterface): Promise<CreateResultInterface>;
  abstract createMany(
    documents: Array<DocumentInterface>,
    options?: CreateManyOptionsInterface
  ): Promise<CreateManyResultInterface>;
  abstract retrieve(id: string, options?: ReadOptionsInterface): Promise<ReadResultInterface>;
  abstract retrieveAll(query: QueryInterface, options?: ReadManyOptionsInterface): Promise<ReadManyResultInterface>;
  abstract update(
    id: string,
    document: DocumentInterface,
    options?: UpdateOptionsInterface
  ): Promise<UpdateResultInterface>;
  abstract delete(id: string, options?: DeleteOptionsInterface): Promise<DeleteResultInterface>;
  abstract aggregate(
    pipeline: never,
    query: AggregateQueryInterface,
    options?: AggregateOptionsInterface
  ): Promise<AggregateResultInterface>;
}
