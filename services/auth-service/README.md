# Auth Service- issues and validates JWT tokens

## API Routes

### 1. Create order

**POST** `/login`  
**Request Body:**

```json
{
  "username": "admin",
  "password": "password"
}
```

### 2. Get order by user id

**GET** `/auth/verify`
**Header** 'Authorization' : 'Bearer {token}'
