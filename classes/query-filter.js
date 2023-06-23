const { Op } = require("sequelize");

class QueryFilter {
  constructor({ acceptedParams = {} }) {
    this.acceptedParams = acceptedParams;
    this.operators = {
      eq: Op.eq,
      ne: Op.ne,
      gt: Op.gt,
      gte: Op.gte,
      lt: Op.lt,
      lte: Op.lte,
      like: Op.like,
      notLike: Op.notLike,
      in: Op.in,
      and: Op.and,
      or: Op.or,
      not: Op.not,
      any: Op.any,
      all: Op.all,
      notIn: Op.notIn,
      between: Op.between,
      notBetween: Op.notBetween,
      overlaps: Op.overlap,
      contains: Op.contains,
      contained: Op.contained,
      strictLeft: Op.strictLeft,
      noExtendRight: Op.noExtendRight,
      strictRight: Op.strictRight,
      noExtendLeft: Op.noExtendLeft,
    };
  }

  buildWhereClause(queryParams) {
    const whereClause = {};
    const unrecognizedParams = [];

    for (const param in queryParams) {
      if (!this.acceptedParams.hasOwnProperty(param)) {
        unrecognizedParams.push(param);
        continue;
      }

      const value = queryParams[param];
      if (value === null || value === undefined || value === "") continue;

      const operator = this.operators[this.acceptedParams[param]];
      if (!operator) {
        throw new Error(`Unrecognized operator: ${this.acceptedParams[param]}`);
      }

      let paramParts = param.split(".");
      let whereClauseRef = whereClause;
      for (let i = 0; i < paramParts.length - 1; i++) {
        const part = paramParts[i];
        if (!whereClauseRef.hasOwnProperty(part)) {
          whereClauseRef[part] = {};
        }
        whereClauseRef = whereClauseRef[part];
      }

      const lastPart = paramParts[paramParts.length - 1];
      if (whereClauseRef.hasOwnProperty(lastPart)) {
        if (!Array.isArray(whereClauseRef[lastPart])) {
          whereClauseRef[lastPart] = [whereClauseRef[lastPart]];
        }
        whereClauseRef[lastPart].push({ [operator]: value });
      } else {
        whereClauseRef[lastPart] = { [operator]: value };
      }
    }

    if (unrecognizedParams.length > 0) {
      console.warn(
        `Unrecognized query parameters: ${unrecognizedParams.join(", ")}`
      );
    }
    return whereClause;
  }
}

module.exports = QueryFilter;
