# IRCTC-Demo-
Project Setup and API Documentation
Project Setup
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install Dependencies

Ensure you have Node.js installed. Install the required npm packages:

bash
Copy code
npm install
Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

env
Copy code
API_KEY=your-secure-api-key-here
You may also need to configure database connection strings and other environment variables as required by your application.

Run Migrations

If your project uses Sequelize, run the migrations to set up the database schema:

bash
Copy code
npx sequelize-cli db:migrate
Start the Server

Start the application:

bash
Copy code
npm start
The server will be running at http://localhost:3000.

API Endpoints
1. User Authentication
Register User
URL: http://localhost:3000/auth/register

Method: POST

Request Body:

json
Copy code
{
  "username": "newuser",
  "password": "yourpassword"
}
Response:

json
Copy code
{
  "id": 1,
  "username": "newuser",
  "token": "your-auth-token"
}
Postman:

Set method to POST.
Enter URL: http://localhost:3000/auth/register.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.
cURL:

bash
Copy code
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "password": "yourpassword"}'
Login User
URL: http://localhost:3000/auth/login

Method: POST

Request Body:

json
Copy code
{
  "username": "existinguser",
  "password": "yourpassword"
}
Response:

json
Copy code
{
  "id": 1,
  "username": "existinguser",
  "token": "your-auth-token"
}
Postman:

Set method to POST.
Enter URL: http://localhost:3000/auth/login.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.
cURL:

bash
Copy code
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "existinguser", "password": "yourpassword"}'
2. Train Management
Add Train (Admin Only)
URL: http://localhost:3000/trains/add

Method: POST

Headers:

x-api-key: your-secure-api-key-here
Request Body:

json
Copy code
{
  "name": "Express Train",
  "source": "City A",
  "destination": "City B",
  "total_seats": 300,
  "available_seats": 300
}
Response:

json
Copy code
{
  "id": 1,
  "name": "Express Train",
  "source": "City A",
  "destination": "City B",
  "total_seats": 300,
  "available_seats": 300
}
Postman:

Set method to POST.
Enter URL: http://localhost:3000/trains/add.
Go to the Headers tab, and add x-api-key with your API key.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.
cURL:

bash
Copy code
curl -X POST http://localhost:3000/trains/add \
     -H "Content-Type: application/json" \
     -H "x-api-key: your-secure-api-key-here" \
     -d '{"name": "Express Train", "source": "City A", "destination": "City B", "total_seats": 300, "available_seats": 300}'
Get Train Availability
URL: http://localhost:3000/trains/availability

Method: GET

Query Parameters:

source: The starting location of the train.
destination: The destination location of the train.
Response:

json
Copy code
[
  {
    "id": 1,
    "name": "Express Train",
    "source": "City A",
    "destination": "City B",
    "total_seats": 300,
    "available_seats": 300
  }
]
Postman:

Set method to GET.
Enter URL: http://localhost:3000/trains/availability?source=CityA&destination=CityB.
Click Send.
cURL:

bash
Copy code
curl -X GET "http://localhost:3000/trains/availability?source=CityA&destination=CityB"
3. Booking Management
Book a Seat
URL: http://localhost:3000/bookings/book

Method: POST

Headers:

Authorization: Bearer <user-auth-token>
Request Body:

json
Copy code
{
  "trainId": 1,
  "numberOfSeats": 2
}
Response:

json
Copy code
{
  "id": 1,
  "train_id": 1,
  "user_id": 1,
  "seats_booked": 2,
  "booking_time": "2024-08-31T00:00:00.000Z"
}
Postman:

Set method to POST.
Enter URL: http://localhost:3000/bookings/book.
Go to the Headers tab, and add Authorization with the value Bearer <user-auth-token>.
Go to the Body tab, select raw, and choose JSON format.
Enter the request body as shown above.
Click Send.
cURL:

bash
Copy code
curl -X POST http://localhost:3000/bookings/book \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <user-auth-token>" \
     -d '{"trainId": 1, "numberOfSeats": 2}'
Get Booking Details
URL: http://localhost:3000/bookings/:id

Method: GET

Headers:

Authorization: Bearer <user-auth-token>
Response:

json
Copy code
{
  "id": 1,
  "train_id": 1,
  "user_id": 1,
  "seats_booked": 2,
  "booking_time": "2024-08-31T00:00:00.000Z"
}
Postman:

Set method to GET.
Enter URL: http://localhost:3000/bookings/1 (replace 1 with the actual booking ID).
Go to the Headers tab, and add Authorization with the value Bearer <user-auth-token>.
Click Send.
cURL:

bash
Copy code
curl -X GET http://localhost:3000/bookings/1 \
     -H "Authorization: Bearer <user-auth-token>"
Authorization
1. Admin API Key
For admin endpoints like /trains/add, include the x-api-key header with the value set to your secure API key.

2. User Authorization Token
For endpoints that require user authorization, include the Authorization header with the value set to Bearer <user-auth-token>. This token is received upon successful login.
