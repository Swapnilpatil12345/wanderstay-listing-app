# 🌍 Wanderstay

A full-stack property listing and booking web application inspired by Airbnb. Wanderstay allows users to browse, create, update, delete, and review property listings. It uses Express.js, MongoDB, and EJS templating to deliver a dynamic and responsive user experience.

---

## 🚀 Features

- 🔍 View all property listings
- ➕ Create new listings with title, price, image, and description
- 📝 Edit or delete existing listings
- 🌟 Add or remove reviews for listings
- ✅ Server-side data validation using Joi
- 🧠 Custom error handling with Express middleware
- 🧹 Database initialization with demo data support

---

## 🛠️ Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Backend     | Node.js, Express.js |
| Database    | MongoDB, Mongoose   |
| Frontend    | HTML, EJS, EJS-Mate |
| Styling     | CSS, Bootstrap      |
| Validation  | Joi                 |
| Utils       | Method-Override, Custom Middleware |

---

## 📁 Project Structure

wanderstay/
├── models/ # Mongoose models (Listing, Review)
├── public/ # Static assets (CSS, images)
├── utils/ # Error handler and async wrapper
├── views/ # EJS templates (index, show, edit, new)
├── init/ # Initial seed data
├── schema.js # Joi schemas for validation
├── app.js # Main application logic
├── package.json

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderstay.git
   cd wanderstay
   
Install dependencies:
npm install

Start MongoDB locally
Make sure MongoDB is running on your system (default: mongodb://127.0.0.1:27017)

Initialize the database (optional)
Visit:
http://localhost:8080/init
This will populate your database with initial listings.

Run the application using
node app.js

Visit the app in your browser

http://localhost:8080/

🔐 Validation Middleware
The app uses custom middleware functions to validate incoming listing and review data using Joi. Errors are handled using a custom ExpressError class and error-handling middleware.


📝 License
This project is open-source and available under the MIT License.

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change or improve.

👤 Author
Swapnil Patil
Computer Engineering Student | Full-Stack Developer
