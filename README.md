# AI Model Database

A simple full-stack Node.js lab project that stores and retrieves AI model information.

## Project Structure

```
ai-model-database/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── index.js
│
├── backend/
    ├── data/
│   ├── app.js
│   └── helper.js
│
├── node_modules/
│   └── diu-jsonstore/
│
├── package.json
├── package-lock.json
└── README.md
```

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- HTTP Module
- Fetch API
- diu-jsonstore

## How to Run

### Frontend

```bash
cd frontend
python -m http.server
```

Open:

```
http://localhost:8000
```

### Backend

```bash
cd backend
npm install
node app.js
```

Open:

```
http://localhost:3000
```

## Features

- Save AI model information
- Read AI model information by ID
- HTTP GET and POST requests
- JSON-based database
- Fetch API integration
