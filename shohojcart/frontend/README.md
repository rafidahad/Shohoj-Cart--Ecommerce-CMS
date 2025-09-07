# Hey Buddy

Hey Buddy is a dynamic platform designed to connect developers and designers, fostering collaboration and growth within a vibrant community. Whether you're looking to find a coding buddy, showcase your projects, or participate in micro-projects, Hey Buddy has got you covered!

## Video Demo

https://www.youtube.com/watch?v=Ji_CKBTT7Tg

## Features

- **Find Your Buddy**: Connect with like-minded individuals based on skills and interests.
- **Showcase Projects**: Share your work and get feedback from the community.
- **Micro Projects**: Engage in quick tasks to enhance your skills and collaborate with others.
- **Real-time Chat**: Communicate seamlessly with your connections.
- **Profile Management**: Customize your profile with skills, interests, and a profile picture.
- **Activity Heatmap**: Visualize your login activity over time.
- **AI Chatbot**: Get assistance from an AI-powered chatbot.

## Tech Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing in the application.
- **Axios**: For making HTTP requests.
- **React Icons**: For using icons in the application.
- **React Calendar Heatmap**: For visualizing login dates as a heatmap.
- **Lucide React**: For additional icons.
- **Tailwind CSS**: For styling the application.

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express**: A web application framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: A NoSQL database.
- **JWT (jsonwebtoken)**: For handling authentication tokens.
- **Bcrypt**: For hashing passwords.
- **Cloudinary**: For handling image uploads and storage.
- **Socket.io**: For real-time communication (used in the chat feature).
- **Dotenv**: For loading environment variables from a `.env` file.
- **Cors**: For enabling Cross-Origin Resource Sharing.

## Project Structure

### Frontend
```
src/
├── assets/
│   └── react.svg
├── components/
│   ├── Button.jsx
│   ├── CTA.jsx
│   ├── Features.jsx
│   ├── Footer.jsx
│   ├── FriendListModal.jsx
│   ├── Header.jsx
│   ├── Heatmap.jsx
│   ├── Hero.jsx
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
│   └── Stats.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/
│   ├── Chat.jsx
│   ├── Dashboard.jsx
│   ├── EditProfile.jsx
│   ├── FindBuddy.jsx
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── MicroProjectsPage.jsx
│   ├── ShowcaseProjectsPage.jsx
│   └── SignUp.jsx
├── utils/
│   └── cn.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

### Backend
```
Backend/
├── .env
├── app.js
├── server.js
├── models/
│   ├── Message.js
│   └── User.js
├── routes/
│   ├── microprojectsRoutes.js
│   ├── projectRoutes.js
│   └── userRoutes.js
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sakibul-shovon/hey-buddy.git
   cd hey-buddy
   ```

2. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```sh
   cd ../Backend
   npm install
   ```

4. Create a `.env` file in the Backend directory and add the following environment variables:
   ```sh
   PORT=8000
   MONGO_URI=your_mongo_uri
   REACT_APP_API_URL=http://localhost:8000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the backend server:
   ```sh
   cd Backend
   npm start
   ```

2. Start the frontend development server:
   ```sh
   cd ../frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact `shovon.cse50@gmail.com`. 
