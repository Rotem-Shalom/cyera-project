# Order Service: manages orders

## API Routes

### 1. Create order

**POST** `/orders`  
**Request Body:**

```json
{
  "user_id": 1,
  "product": "Mouse",
  "amount": 25
}
```

### 2. Get order by user id

**GET** `/orders/user/:user_id`
