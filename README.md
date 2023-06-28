# Authentication API

This is a simple user authentication API built with Node.js and Express. It provides endpoints for user registration, login, and retrieving user details.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Create a `.env` file in the root directory of the project.
5. Add the following environment variables to the `.env` file:

```env
MONGODB_URI=
JWT_SECRET=
```

Add your own database URI and a secret key for JSON Web Tokens. You can generate a secret key using the following command:

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Also you can get a Database URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Usage

### Register a new user

Send a POST request to `/register` with the following JSON payload:

```json
{
  "name": "test",
  "email": "test@test.com",
  "password": "password123"
}
```

### Login

Send a POST request to `/login` with the following JSON payload:

```json
{
  "email": "test@test.com",
  "password": "password123"
}
```

The API will respond with a JSON Web Token (JWT) that can be used to authenticate future requests.

Example response:

```json
{
  "SCC": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTdmMjk2YTI3OGI5NDQyNmIzZjJlNiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY4NzY3OTczNX0.EpZph1bLaDHcBYMvIHld8RwPTA8IRTM9eALXRsadXDg"
}
```

### Get user details

Send a GET request to `/get-user-details` with an `Authorization` header containing the JWT obtained from the login endpoint.

The API will respond with the user details in JSON format.

Example response:

```json
{
  "SCC": true,
  "user": {
    "_id": "6497f296a278b94426b3f2e6",
    "name": "Test",
    "email": "test@test.com",
    "created_at": "2023-06-25T07:53:55.906Z"
  }
}
```

## Tests

To run the tests for this project, you can use the following command:

```bash
npm test
```

This will run the test suite using the `jest` testing framework and output the results to the console.

The tests are located in the `test` directory.

## GitHub Actions

This project includes a GitHub Actions workflow that runs the tests whenever changes are pushed to the `main` branch.

To use the GitHub Actions workflow, you will need to set up a MongoDB Atlas cluster and create a `.env` file with the connection string for the cluster. You can follow the instructions in the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/getting-started/) to create a new cluster and obtain the connection string.

Once you have the connection string, you can create a new `.env` file in the root of the project with the following contents:

```
MONGODB_URI=<your-connection-string>
```

Replace `<your-connection-string>` with the connection string for your MongoDB Atlas cluster.

Also, you have to add the `JWT_SECRET` environment variable to the `.env` file. You can generate a secret key using the following command:

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Next, you will need to create a new secret in your GitHub repository with the name `MONGODB_URI` and the value set to the connection string for your MongoDB Atlas cluster.

And, you will need to create a new secret in your GitHub repository with the name `JWT_SECRET` and the value set to the secret key for JSON Web Tokens.

Finally, you can enable the GitHub Actions workflow by creating a new file in the `.github/workflows` directory with the following contents:

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
env:
  MONGODB_URI: ${{ secrets.MONGODB_URI }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"
      - run: npm install
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
```

This workflow will run the tests whenever changes are pushed to the `main` branch and will use the `MONGODB_URI` secret to connect to the MongoDB Atlas cluster.

With these steps completed, you should be able to run the tests locally and use the GitHub Actions workflow to automatically run the tests whenever changes are pushed to the `main` branch.

## Contributing

Contributions are welcome! Please submit a pull request with any changes you would like to make.
