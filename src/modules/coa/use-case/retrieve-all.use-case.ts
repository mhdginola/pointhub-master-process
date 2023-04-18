import { AggregateCoaRepository } from "../model/repository/aggregate.repository.js";
import DatabaseConnection, { AggregateOptionsInterface, AggregateQueryInterface } from "@src/database/connection.js";

export class RetrieveAllCoaUseCase {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  public async handle(query: AggregateQueryInterface, options?: AggregateOptionsInterface) {
    try {
      // dynamic sorting logic
      const sort: { [key: string]: unknown } = {};
      let sorter: { [key: string]: unknown } = { $sort: { createdAt: 1 } };
      if (query.sort) {
        const split = query.sort.split("-");
        const vari = split[1] || split[0];
        const order = split[0] === "" ? -1 : 1;
        sort[vari] = order;
        sorter = { $sort: sort };
      }

      // aggregation
      const response = await new AggregateCoaRepository(this.db).aggregate(
        [
          { $lookup: { from: "coaGroups", localField: "group_id", foreignField: "_id", as: "group" } },
          { $lookup: { from: "coaTypes", localField: "type_id", foreignField: "_id", as: "type" } },
          { $lookup: { from: "coaCategories", localField: "category_id", foreignField: "_id", as: "category" } },
          sorter,
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
      // console.log(response.data);

      return {
        coas: response.data,
        pagination: response.pagination,
      };
    } catch (error) {
      throw error;
    }
  }
}
