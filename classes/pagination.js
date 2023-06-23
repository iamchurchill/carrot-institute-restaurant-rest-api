const { PER_PAGE } = process.env;

class Pagination {
  constructor(
    model,
    options = {
      include: [],
      attributes: {},
      where: {},
      page: 1,
      perPage: PER_PAGE || 100,
      baseUrl: "",
    }
  ) {
    this.model = model;
    this.include = options.include;
    this.attributes = options.attributes;
    this.where = options.where;
    this.page = options.page;
    this.perPage = options.perPage;
    this.baseUrl = options.baseUrl;
  }

  paginate() {
    return new Promise((resolve, reject) => {
      const offset = (this.page - 1) * this.perPage;

      this.model
        .findAndCountAll({
          attributes: this.attributes,
          limit: this.perPage,
          offset: offset,
          where: this.where,
          include: this.include,
          distinct: true,
          order: [["id", "ASC"]],
        })
        .then((data) => {
          const { count, rows: results } = data;

          const total = count;
          const current_page = Number(this.page);
          const per_page = parseInt(this.perPage, 10);
          const pages = Math.ceil(count / parseInt(this.perPage, 10));
          const next_page_url =
            this.page < pages
              ? `${this.baseUrl}?page=${(
                  Number(this.page) + 1
                ).toString()}&per_page=${this.perPage}`
              : null;
          const prev_page_url =
            this.page > 1
              ? `${this.baseUrl}?page=${(
                  Number(this.page) - 1
                ).toString()}&per_page=${this.perPage}`
              : null;

          resolve({
            total,
            current_page,
            per_page,
            pages,
            next_page_url,
            prev_page_url,
            results,
          });
        })
        .catch((error) => {
          reject(new Error(`Error: ${error}`));
        });
    });
  }
}

module.exports = Pagination;
