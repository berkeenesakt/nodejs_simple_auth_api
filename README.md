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

Add your own database credentials URI and a secret key for JSON Web Tokens. You can generate a secret key using the following command:

```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

Also you can get a Database URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Configuration

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

## Contributing

Contributions are welcome! Please submit a pull request with any changes you would like to make.
