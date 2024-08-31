# IRCTC-Demo-
Project Setup and API Documentation

# Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
# Install Dependencies

Ensure you have Node.js installed. Install the required npm packages:


```bash
npm install
```
# Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

.env
```bash
API_KEY=your-secure-api-key-here

```

# Run Migrations

If your project uses Sequelize, run the migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```
# Start the Server


```bash
npm app.js
```
The server will be running at http://localhost:3000.

### API Endpoints
#  User Authentication
# Register User
URL: http://localhost:3000/auth/register

Method: POST

Request Body:

json
```bash
{
  "username": "newuser",
  "password": "yourpassword",
  "role": "user/admin"
}
```

Set method to POST.
Enter URL: http://localhost:3000/auth/register.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.

Response:
json
```bash
{
  "id": 1,
  "username": "newuser",
  "password": "yourpassword",
  "role": "user/admin",
  "updatedAt": 2024-08-31T17:10:28.228Z",
  "createdAt": 2024-08-31T17:10:28.228Z
}
```
Postman:


cURL:

```bash
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "password": "yourpassword"}'
```
# Login User
URL: http://localhost:3000/auth/login

Method: POST

Request Body:

json
```bash
{
  "username": "existinguser",
  "password": "yourpassword"

}
```
Set method to POST.
Enter URL: http://localhost:3000/auth/login.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.

Response:

json
```bash
{
  "id": 1,
  "username": "existinguser",
  "password": "yourpassword",
  "role": "user/admin",
  "updatedAt": 2024-08-31T17:10:28.228Z",
  "createdAt": 2024-08-31T17:10:28.228Z,
  "token": "your-auth-token"
}
```

cURL:


```bash
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "existinguser", "password": "yourpassword"}'
```
# Train Management
# Add Train (Admin Only)
URL: http://localhost:3000/trains/add

Method: POST
Set method to POST.
Enter URL: http://localhost:3000/trains/add.
Go to the Headers tab, and add Authorization with the value Bearer <user-auth-token> you recieved while logging in your response body.
Go to the Headers tab, and add x-api-key with your Admin_API key.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.
Headers:
Authorization: Bearer <user-auth-token>
       &&
x-api-key: your-secure-api-key-here

Request Body:

json
```bash
{
  "name": "Express Train",
  "source": "City A",
  "destination": "City B",
  "total_seats": 300,
  "available_seats": 300
}
```
Response:

json
```bash
{
  "id": 1,
  "name": "Express Train",
  "source": "City A",
  "destination": "City B",
  "total_seats": 300,
  "available_seats": 30
}
```


cURL:

bash
```bash
curl -X POST http://localhost:3000/trains/add \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <user-auth-token>" \
     -H "x-api-key: your-secure-api-key-here" \
     -d '{"name": "Express Train", "source": "City A", "destination": "City B", "total_seats": 300, "available_seats": 300}'
```
# Get Train Availability
URL: http://localhost:3000/trains/availability

Method: GET

Query Parameters:

source: The starting location of the train.
destination: The destination location of the train.
Postman:

Set method to GET.
URL
```bash
http://localhost:3000/trains/availability?source=CityA&destination=CityB.
```
Click Send.

Response:

json
```bash
[
  {
    "id": 1,
    "name": "Express Train",
    "source": "City A",
    "destination": "City B",
    "total_seats": 300,
    "available_seats": 30
  }
]
```

cURL:

bash
```bash
curl -X GET "http://localhost:3000/trains/availability?source=CityA&destination=CityB"
```
# Booking Management
# Book a Seat
Postman:

Set method to POST.
Enter URL: http://localhost:3000/bookings/book.
Go to the Headers tab, and add Authorization with the value Bearer <user-auth-token>.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.


Method: POST

Headers:

Authorization: Bearer <user-auth-token>

URL
```bash
http://localhost:3000/bookings/book
```
Request Body :

json
```bash
{
  "trainId": 1,
  "numberOfSeats": 2
}
```
Response:

json
```bash
{
  "id": 1,
  "train_id": 1,
  "user_id": 1,
  "seats_booked": 2,
  "booking_time": "2024-08-31T00:00:00.000Z"
}
```

cURL:

bash
```bash
curl -X POST http://localhost:3000/bookings/book \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <user-auth-token>" \
     -d '{"trainId": 1, "numberOfSeats": 2}'
```
# Get Booking Details
Postman:

Set method to GET.
Enter URL: http://localhost:3000/bookings/1 (replace 1 with the actual booking ID).
Go to the Headers tab, and add Authorization with the value Bearer <user-auth-token>.
Click Send.
URL
```bash
http://localhost:3000/bookings/:id
```

Method: GET

Headers:

Authorization: Bearer <user-auth-token>
Response:

json
```bash
{
  "id": 1,
  "train_id": 1,
  "user_id": 1,
  "seats_booked": 2,
  "booking_time": "2024-08-31T00:00:00.000Z"
}
```
cURL:

bash
```bash
curl -X GET http://localhost:3000/bookings/1 \
     -H "Authorization: Bearer <user-auth-token>"
```
### Authorization
1. Admin API Key
For admin endpoints like /trains/add, include the x-api-key header with the value set to your secure API key.

2. User Authorization Token
For endpoints that require user authorization, include the Authorization header with the value set to Bearer <user-auth-token>. This token is received upon successful login.
