# Cache Control Task

This project demonstrates a simple cache control implementation using a React frontend and a NestJS backend. The application fetches and displays a list of names, implementing basic caching mechanisms.

## Project Structure

The project consists of two main parts:

1. React Frontend (`react-app`)
2. NestJS Backend (`nest-app`)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd cache-control-task
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd react-app
   npm install
   cd ../nest-app
   npm install
   ```

### Running the Application

1. Start the NestJS backend:

   ```
   cd nest-app
   npm run start:dev
   ```

   The backend will run on `http://localhost:3000`.

2. In a new terminal, start the React frontend:

   ```
   cd react-app
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Features

- Fetches a list of names from the backend API
- Implements cache control headers in the backend
- Displays the list of names in the frontend
- Provides a button to manually refresh the list

## API Documentation

The NestJS backend includes Swagger documentation. To view the API docs:

1. Start the backend server
2. Navigate to `http://localhost:3000/api` in your browser

## License

This project is licensed under the MIT License [LICENSE](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
