# Restaurant RESTful API

## Overview

A Restaurant RESTFul API for Carrot Institute

## Pre-Installation Requirements

Before installing and running this application, ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) v20.0.0 and above: To check your version, run `node -v` in your terminal.
- [npm](https://www.npmjs.com/get-npm) v9.6.4 and above: npm is included in the Node.js installation. Verify your version by running `npm -v` in your terminal.
- [PostgreSQL](https://www.postgresql.org/download/) v14 and above with `postgis` extension installed.

## Installation & Local Setup

Follow these steps to get this project running on your local machine:

1. **Clone the Repository:** Clone the project repository by running:

   ```bash
   git clone {{repo url}}
   ```

2. **Navigate into the Project Directory:** Switch into the newly created project directory:

   ```bash
   cd {{directory name}}
   ```

3. Create a .env file by copying and renaming .env.example. Fill in the required fields:

   ```bash
   cp .env.example .env

   ```

4. **Generate:** `JWT_ACCESS_TOKEN_SECRET_KEY` and `JWT_REFRESH_TOKEN_SECRET_KEY` secret keys:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

   Copy and paste the output into your .env file.

5. **Install Dependencies:** Install all necessary npm packages:

   ```bash
   npm install
   ```

6. **Initialize the Database:** Set up your local database and populate it with some initial data:

   ```bash
   npm run db:up
   ```

7. You can reset your database at any time using:

   ```bash
   npm run db:reset
   ```

8. **Launch the Application:** Start the application:

   ```bash
   npm run start
   ```

   The app should now be up and running at `http://localhost:8888`.

9. **API Documentation:** For more details about the available API endpoints, visit [http://localhost:8888/docs](http://localhost:8888/docs) in your web browser.

## Contributing

To contribute to the Restaurant API, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License

This project is licensed under the Apache License 2.0. For more information, see the [LICENSE](LICENSE) file in the root directory of this project.

## Questions or Comments?

If you have any questions, or if you encounter any issues while setting up this project locally, please contact FRIEDRICH at [churchillmerediths@gmail.com](mailto:churchillmerediths@gmail.com). I would be happy to assist you!
