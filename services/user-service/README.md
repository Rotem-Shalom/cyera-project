# User Service: manages users

## API Routes

### 1. Register User

**POST** `/users`  
**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 2. Get User by Id

**GET** `/users/:id`
