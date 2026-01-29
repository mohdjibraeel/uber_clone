# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the user's password, saves the user to the database, and returns a JSON Web Token (JWT) for authentication.

---

### HTTP Method
**POST**

---

### Request Body
- `fullname.firstname`  
  - Type: String  
  - Required: Yes  
  - Description: The first name of the user (minimum 3 characters)

- `fullname.lastname`  
  - Type: String  
  - Required: Yes  
  - Description: The last name of the user (minimum 3 characters)

- `email`  
  - Type: String  
  - Required: Yes  
  - Description: The user's email address (must be a valid email)

- `password`  
  - Type: String  
  - Required: Yes  
  - Description: The user's password (minimum 6 characters)

#### Example Request Body:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}


### Responses

#### Success (201 Created)
Returns the created user (without password) and a JWT for authentication.


```json
{
  "user": {
    "id": "60f7c2b2e1a4f7001a2b3c4d",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "createdAt": "2026-01-29T12:34:56.789Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

