# Gateway Service: API gateway that verifies JWT tokens and forwards requests

## API Routes

### 1. Register User

**POST** `/users`  
**Header** 'Authorization' : 'Bearer {token}'
**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 2. Get User by Id

**GET** `/users/:id`
**Header** 'Authorization' : 'Bearer {token}'

### 3. Create order

**POST** `/orders`  
**Header** 'Authorization' : 'Bearer {token}'
**Request Body:**

```json
{
  "user_id": 1,
  "product": "Mouse",
  "amount": 25
}
```

### 4. Get order by user id

**GET** `/orders/user/:user_id`
**Header** 'Authorization' : 'Bearer {token}'
