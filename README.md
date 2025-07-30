# Jumpify QR Generator

This is a QR code generator application that allows you to create custom QR codes with different styles, colors, and an embedded image.

## Credits

This project is brought to you by [Jumpify.dev](https://jumpify.dev) and [Jumpify.link](https://jumpify.link).

## How it works

The application consists of a Node.js backend and a React frontend.

### Backend

The backend is built with Express.js and uses the `qr-code-styling-node` library to generate the QR codes. It exposes a single API endpoint `/generate-qr` that accepts a JSON payload with the QR code options.

### Frontend

The frontend is a React application that provides a user interface to customize and generate the QR codes. It sends a request to the backend and displays the generated QR code.

## How to run

### Locally

1.  **Run the backend:**
    - Open a terminal.
    - Navigate to the `backend` directory: `cd backend`
    - Install dependencies: `npm install`
    - Start the server: `npm start`
    - The backend will be running at `http://localhost:3001`.

2.  **Run the frontend:**
    - Open another terminal.
    - Navigate to the `frontend` directory: `cd frontend`
    - Install dependencies: `npm install`
    - Start the React app: `npm start`
    - The frontend will open in your browser at `http://localhost:3000`.
    - **Note:** If you change the `.env` file, you will need to restart the frontend development server for the changes to take effect.

### With Docker (Production)

1.  Make sure you have Docker and Docker Compose installed.
2.  Run `docker-compose up --build` in the root directory of the project.
3.  The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

This will build the frontend for production and serve it with Nginx.

## QR Code Styles

### Patterns

| Style | Preview |
|---|---|
| square | <img src="svgs/patterns/square.svg" width="100"> |
| dots | <img src="svgs/patterns/dots.svg" width="100"> |
| rounded | <img src="svgs/patterns/rounded.svg" width="100"> |
| classy | <img src="svgs/patterns/classy.svg" width="100"> |
| classy-rounded | <img src="svgs/patterns/classy-rounded.svg" width="100"> |
| extra-rounded | <img src="svgs/patterns/extra-rounded.svg" width="100"> |

### Corners

| Style | Preview |
|---|---|
| square | <img src="svgs/corners/square.svg" width="100"> |
| dot | <img src="svgs/corners/dot.svg" width="100"> |
| extra-rounded | <img src="svgs/corners/extra-rounded.svg" width="100"> |
