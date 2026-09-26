# SmartCart — AI Product Recommendation Engine

> A full-stack e-commerce recommendation system that uses machine learning to discover products similar to a user's selection.

**Live Demo:** https://smartcart-ai-recommendation-engine.vercel.app/

**Backend API:** https://smartcart-ai-recommendation-engine.onrender.com/

---

## Overview

SmartCart is a full-stack AI-powered product recommendation application built to demonstrate how a machine learning recommendation system can be integrated into a modern web application.

Users can browse products, select a product, and receive personalized product recommendations generated using **TF-IDF vectorization and cosine similarity**.

The project combines a React frontend, Node.js backend, MongoDB database, and a Python-based machine learning service.

---

## Features

* Product catalog with responsive UI
* Product details and pricing
* AI-powered product recommendations
* Content-based recommendation system
* TF-IDF text vectorization
* Cosine similarity scoring
* AI similarity percentage for recommended products
* Recommendation explanations
* Real product images
* Smooth navigation to recommendation results
* REST APIs
* MongoDB-based product storage
* Separate Python ML service
* Production deployment

---

## How It Works

SmartCart follows a service-based architecture:

```text
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │      Vercel          │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │  Node.js / Express   │
                         │       Render         │
                         └───────┬───────┬──────┘
                                 │       │
                    Product Data │       │ Recommendations
                                 │       │
                                 ▼       ▼
                       ┌────────────┐  ┌─────────────────┐
                       │ MongoDB    │  │ Python FastAPI  │
                       │   Atlas    │  │   ML Service    │
                       └────────────┘  └────────┬────────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │ TF-IDF + Cosine  │
                                      │    Similarity    │
                                      └──────────────────┘
```

---

## Recommendation Pipeline

The recommendation engine uses a **content-based filtering** approach.

### 1. Product Data

Each product contains information such as:

* Name
* Category
* Price
* Description

Example:

```text
Gaming Laptop
gaming laptop 16GB RAM NVIDIA graphics powerful processor
```

### 2. Text Vectorization

Product descriptions are converted into numerical vectors using **TF-IDF (Term Frequency–Inverse Document Frequency)**.

This allows the machine learning system to represent product descriptions mathematically.

### 3. Similarity Calculation

The system calculates **cosine similarity** between product vectors.

Conceptually:

```text
Product A
     │
     ▼
 TF-IDF Vector
     │
     ▼
Cosine Similarity
     │
     ▼
Rank Similar Products
```

### 4. Recommendation

The highest-scoring products are returned to the Node.js backend and displayed by the React frontend.

---

## Example

If a user selects:

```text
Mechanical Keyboard
```

the recommendation engine may return:

```text
Gaming Headphones     20%
Gaming Mouse          18%
Gaming Chair           8%
Gaming Laptop          7%
```

The percentage represents the similarity score calculated by the recommendation model.

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* Axios
* REST APIs

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Machine Learning

* Python
* FastAPI
* Pandas
* Scikit-learn
* TF-IDF Vectorizer
* Cosine Similarity

### Deployment

* Vercel — Frontend
* Render — Backend
* Render — ML Service
* MongoDB Atlas — Database

---

## Project Structure

```text
smartcart/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── ml-service/
│   ├── app.py
│   ├── model.py
│   ├── products.csv
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

---

## API Endpoints

### Get Products

```http
GET /api/products
```

Returns all products stored in MongoDB.

### Get Recommendations

```http
GET /api/products/:id/recommendations
```

Returns machine-learning-based recommendations for the selected product.

Example:

```http
GET /api/products/2/recommendations
```

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smartcart-ai-recommendation-engine.git

cd smartcart-ai-recommendation-engine
```

### 2. Start the ML service

```bash
cd ml-service

python -m venv venv
```

Activate the environment.

macOS/Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn app:app --reload --port 8000
```

---

### 3. Start the backend

Open another terminal:

```bash
cd server

npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
ML_SERVICE_URL=http://127.0.0.1:8000
PORT=5001
```

Start the server:

```bash
npm start
```

---

### 4. Start the frontend

Open another terminal:

```bash
cd client

npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

```env
MONGO_URI=your_mongodb_connection_string
ML_SERVICE_URL=your_ml_service_url
PORT=5001
```

### Frontend

```env
VITE_API_URL=your_backend_url
```

Never commit `.env` files or credentials to GitHub.

---

## Engineering Highlights

This project demonstrates:

* Full-stack application development
* REST API design
* Frontend-backend integration
* Microservice-style ML integration
* Machine learning model integration with a web application
* MongoDB data management
* Content-based recommendation systems
* TF-IDF feature engineering
* Cosine similarity
* Environment-based configuration
* Cloud deployment

---

## Future Improvements

The current system uses content-based recommendations. Potential improvements include:

* User-based collaborative filtering
* Hybrid recommendation system
* User accounts and recommendation history
* Search and filtering
* Shopping cart and checkout flow
* Product reviews and ratings
* Recommendation feedback
* More advanced ranking models
* Recommendation analytics
* A/B testing different recommendation strategies

---

## Deployment

The application is deployed as separate services:

| Component         | Platform      |
| ----------------- | ------------- |
| React Frontend    | Vercel        |
| Node.js API       | Render        |
| Python ML Service | Render        |
| Database          | MongoDB Atlas |

### Live Application

**https://smartcart-ai-recommendation-engine.vercel.app/**

---

## Author

**Gaurav Verma**

B.Tech — Computer Science Engineering

GitHub: https://github.com/GauravVerma789

Portfolio: https://portfolio-ochre-three-pjdg89m6dz.vercel.app/

---

## License

This project is available for educational and portfolio purposes.
