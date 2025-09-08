ClassBook -  Class Booking System
📖 Overview
ClassBook is a full-stack web application that allows users to book classes and administrators to manage classes, sessions, and view audit logs. The application features role-based authentication, real-time booking capabilities, and an admin dashboard.

🏗️ Architecture
System Diagram
text
Frontend (React + TypeScript) 
        ↓
    API Requests
        ↓
Backend (Node.js + Express) 
        ↓
   Prisma ORM Layer
        ↓
   SQLite Database
Request Flow
User interacts with React frontend

Frontend makes API calls to Express backend

Express routes request to appropriate controller

Controller uses Prisma client to interact with database

Response flows back through the same path

🚀 Local Development
Prerequisites
Node.js (v16 or higher)

npm or yarn

Backend Setup
Navigate to the backend directory:

bash
cd backend
Install dependencies:

bash
npm install
Set up environment variables:

bash
cp .env.example .env
Edit .env and add:

text
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
PORT=3001
Set up the database:

bash
npx prisma generate
npx prisma db push
Seed the database with sample data:

bash
npm run seed
Start the development server:

bash
npm run dev
The backend will be running on http://localhost:3001

Frontend Setup
Navigate to the frontend directory:

bash
cd frontend
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
The frontend will be running on http://localhost:3000

Default Accounts
After seeding, the following accounts are available:

Admin Account:

Email: admin@example.com

Password: admin123

User Account:

Email: user@example.com

Password: user123



JWT_SECRET

JWT_REFRESH_SECRET

DATABASE_URL (Railway will provide this automatically)

Railway will automatically deploy your application

Frontend Deployment:
Use Vercel or Netlify for frontend deployment

Connect your GitHub repository

Set build command: npm run build

Set output directory: dist

Add environment variable:

VITE_API_URL: Your deployed backend URL

Option 2: Traditional VPS Deployment
Backend Setup:
Set up a Linux server (Ubuntu 20.04+)

Install Node.js, npm, and SQLite

Clone your repository

Install dependencies: npm install

Set up environment variables

Build the application: npm run build

Use PM2 to run the application: pm2 start dist/index.js --name classbook-backend

Set up Nginx reverse proxy

Frontend Setup:
Build the frontend: npm run build

Serve the dist folder with a web server like Nginx

Environment Variables
Backend (.env):

text
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=3001
DATABASE_URL="file:./dev.db" # For SQLite, or use PostgreSQL connection string for production
Frontend (.env):

text
VITE_API_URL=http://localhost:3001/api # For development
# For production, set to your deployed backend URL
📁 Project Structure
text
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth and validation
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utilities
│   │   └── index.ts          # App entry point
│   ├── .env                  # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── types/            # TypeScript definitions
│   │   └── utils/            # Utilities
│   ├── index.html            # HTML template
│   └── package.json
│
└── README.md
🗄️ Database Schema
The application uses the following main models:

Users (with ADMIN/USER roles)

Classes (fitness class types)

Sessions (specific class instances)

Bookings (user-session relationships)

AuditLogs (tracking user actions)

🔐 Authentication
The app uses JWT-based authentication with access and refresh tokens. Admin routes are protected and require the ADMIN role.

🧪 Testing
Run the backend tests:

bash
cd backend
npm test
📝 API Documentation
The main API endpoints include:

POST /api/auth/login - User login

POST /api/auth/register - User registration

GET /api/sessions - Get available sessions

POST /api/bookings - Book a session

GET /api/admin/audit-logs - Get audit logs (admin only)

🐛 Troubleshooting
Database issues: Run npx prisma generate and npx prisma db push

Authentication errors: Check your JWT secret environment variables

CORS errors: Ensure frontend URL is correctly configured in backend CORS settings

📄 License
This project is for educational purposes.

README.md (how to run locally + how to deploy).
ARCHITECTURE.md with a simple diagram + request flow. give this
