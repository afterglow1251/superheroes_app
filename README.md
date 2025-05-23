# Superheroes App 🦸‍♂️🦸‍♀️

Full-stack application for working with a database of superheroes.

**Backend**: NestJS  
**Frontend**: React

## Installation and launch ⚙️

### Backend

1. Go to the backend directory and install the dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a .env file in the backend root and fill it in (example):
   ```env
   PORT          = 
   
   DB_HOST       = 
   DB_PORT       = 
   DB_USERNAME   = 
   DB_PASSWORD   = 
   DB_NAME       = 

   FRONTEND_URL  = 
   ```
   ⚠️ Fill in the values according to your environment setup.
   
3. Run the backend:
   ```bash
   npm run start:dev
   ```
4. (Optional) Populate the database with test data:
   ```bash
   npm run seed
   ```

### Frontend

1. Go to the frontend directory and install the dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Create a.env file in the frontend root and fill it in (example):
   ```env
   FRONTEND_URL  = 
   ```
   ⚠️ Fill in the values according to your environment setup.

3. Run the frontend:
   ```bash
   npm run dev
   ```

### Testing

**Backend:**

Go to the backend directory and run the tests:
   ```bash
   cd backend
   npm run test
   ```

**Frontend**

Go to the frontend directory and run the tests:
   ```bash
   cd frontend
   npm run test
   ```
