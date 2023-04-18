import { ObjectId } from "mongodb";
import { CoaStatusTypes } from "../model/coa.entity.js";
import { AggregateCoaRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { AggregateOptionsInterface, AggregateQueryInterface } from "@src/database/connection.js";

interface ResponseInterface {
  _id: string;
  name?: unknown;
  number?: unknown;
  status?: CoaStatusTypes;
  type?: unknown;
  group?: unknown;
  category?: unknown;
  subledger?: unknown;
  position?: unknown;
  createdAt?: unknown;
  isArchive?: boolean;
}

export class RetrieveCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(
    id: string,
    query: AggregateQueryInterface,
    options?: AggregateOptionsInterface
  ): Promise<ResponseInterface> {
    try {
      const response = await new AggregateCoaRepository(this.db).aggregate(
        [
          { $match: { _id: new ObjectId(id) } },
          { $lookup: { from: "coaGroups", localField: "group_id", foreignField: "_id", as: "group" } },
          { $lookup: { from: "coaTypes", localField: "type_id", foreignField: "_id", as: "type" } },
          { $lookup: { from: "coaCategories", localField: "category_id", foreignField: "_id", as: "category" } },
          {
            $project: {
              name: "$name",
              number: "$number",
              type: { $arrayElemAt: ["$type", 0] },
              category: { $arrayElemAt: ["$category", 0] },
              group: { $arrayElemAt: ["$group", 0] },
              subledger: "$subledger",
              position: "$position",
              createdAt: "$createdAt",
            },
          },
        ],
        query,
        options
      );

      return {
        _id: response.data[0]._id,
        name: response.data[0].name,
        number: response.data[0].number,
        type: response.data[0].type,
        group: response.data[0].group,
        category: response.data[0].category,
        subledger: response.data[0].subledger,
        position: response.data[0].position,
        createdAt: response.data[0].createdAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
