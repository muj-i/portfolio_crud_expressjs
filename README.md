

# portfolio_crud_expressjs

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/muj-i/portfolio_crud_expressjs.git
    ```
2. Navigate to the project directory:
    ```sh
    cd portfolio_crud_expressjs
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To run the application with `nodemon`, use the following command:
```sh
npx nodemon app.js
```

The server will start on port `5600`.

### API Endpoints

#### User Authentication

- **Register**: `POST /api/register`
  - Request Body:
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "mobile": "1234567890",
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response: User registration details and token.

- **Login**: `POST /api/login`
  - Request Body:
    ```json
    {
      "email": "john.doe@example.com",
      "password": "password123"
    }
    ```
  - Response: User login details and token.

#### User Profile

- **Get Profile**: `GET /api/profile`
  - Headers: Authorization`: Bearer <token>`
  - Response: User profile details.

- **Update Profile**: `PUT /api/update-profile`
  - Headers: `Authorization: Bearer <token>`
  - Request Body (any of the fields can be updated):
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "mobile": "1234567890",
      "password": "newpassword123"
    }
    ```
  - Response: Updated user profile details.

#### Portfolio Management

- **Get All Portfolios**: `GET /api/get-all-portfolio`
  - Headers: `Authorization: Bearer <token>`
  - Response: List of all portfolios for the authenticated user.

- **Create Portfolio**: `POST /api/create-portfolio`
  - Headers: `Authorization: Bearer <token>`
  - Request Body:
    ```json
    {
      "title": "My Portfolio",
      "description": "Description of my portfolio",
      "img": "image_url",
      "codelink": "code_url",
      "livelink": "live_url"
    }
    ```
  - Response: Created portfolio details.

- **Update Portfolio**: `PUT /api/update-portfolio/:id`
  - Headers: `Authorization: Bearer <token>`
  - Request Body (any of the fields can be updated):
    ```json
    {
      "title": "Updated Title",
      "description": "Updated Description"
    }
    ```
  - Response: Updated portfolio details.

- **Delete Portfolio**: `DELETE /api/delete-portfolio/:id`
  - Headers: `Authorization: Bearer <token>`
  - Response: Success message for portfolio deletion.

### Server Port

The server runs on port `5600`. You can change the port by modifying the `PORT` variable in the config.js file.
```js
export const PORT = 5600;
```

### Postman Collection
A Postman collection `portfolio-crud-expressjs.postman_collection.json` is provided in the `postman` directory. You can import this collection in Postman to test the API endpoints.

