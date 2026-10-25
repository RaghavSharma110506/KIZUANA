# 🎌 Kizuna Insight
### Turning Japanese Pop-Culture Fandom into Business Intelligence

Kizuna Insight is an AI/ML-powered demand intelligence platform designed to help businesses understand the demand for Japanese pop-culture products in India. It helps merchandise sellers and brands make more informed decisions about product selection, inventory planning, and potential sales opportunities.

Our goal is to bridge the gap between fan interests and business decisions using data-driven insights.

---

## 🚩 Problem Statement

Japanese pop culture, including anime, manga, gaming, and collectibles, has attracted a growing audience in India. However, businesses often face challenges such as:

- Understanding which products customers may be interested in.
- Identifying potential demand across different cities.
- Deciding how much inventory to maintain.
- Estimating potential orders and gross sales before launching a product.
- Reducing the risk of overstocking or missing sales opportunities.

Many sellers rely on guesswork rather than structured demand insights.

## 💡 Our Solution

Kizuna Insight provides a demand prediction dashboard that uses a machine-learning model to estimate potential product demand based on business inputs and interest signals.

Users can enter product details and receive estimated demand, a potential order range, a suggested initial stock quantity, and a gross sales estimate.

The platform is designed to help sellers make smarter decisions before investing in inventory.

---

## ✨ Key Features

### 📊 1. ML-Powered Demand Prediction
- Estimates potential product orders using a trained machine-learning model.
- Accepts inputs such as city, product category, price, product views, interest registrations, and planned stock.
- Provides an estimated demand value to support product-launch planning.

### 🏙️ 2. City-Based Demand Planning
- Allows users to select a target city.
- Supports exploring demand scenarios for different locations.
- Helps businesses consider where to focus their product launches.

### 📦 3. Inventory Planning
- Displays a suggested initial stock quantity based on the demand estimate and available inputs.
- Helps sellers explore inventory-planning scenarios.

### 💰 4. Gross Sales Estimation
- Calculates a potential gross sales range using estimated orders and product price.
- Helps businesses understand possible sales opportunities before launching a product.

### 🖥️ 5. Interactive Dashboard
- Provides an interface for entering product and market details.
- Displays demand estimates and related business metrics in one place.
- Connects the frontend to a Python-based prediction API.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | CSS |
| Icons and Charts | Lucide React, Recharts |
| Backend API | Python, FastAPI |
| Machine Learning | Scikit-learn |
| Model Serialization | Joblib |
| Data Processing | Pandas |
| Model | Random Forest Regressor |
| API Server | Uvicorn |

---

## 🤖 Machine Learning Model

Kizuna Insight uses a Random Forest Regression model to estimate potential demand.

### Model Workflow

1. Product and market inputs are collected from the dashboard.
2. The frontend sends the inputs to the backend API.
3. The backend prepares the inputs for the trained model.
4. The model generates an estimated demand value.
5. The API returns the prediction to the frontend.
6. The dashboard displays the result and related business estimates.

### Model Details

- **Algorithm:** Random Forest Regressor
- **Training dataset:** Synthetic demonstration dataset containing 2,000 records
- **Categorical features:** City, product category, and fandom
- **Target variable:** Potential demand over 30 days
- **Model format:** Joblib

### Important Model Disclaimer

The current model is trained on synthetic demonstration data. Its predictions demonstrate the end-to-end ML workflow and should not be treated as validated real-world demand forecasts.

Real-market sales data and further evaluation are needed before using the model for actual inventory or investment decisions.

---

## 🏗️ Project Architecture

```text
                 ┌─────────────────────────┐
                 │      User / Seller      │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │   React + Vite Frontend  │
                 │   Demand Predictor UI    │
                 └────────────┬────────────┘
                              │
                       HTTP POST /predict
                              │
                              ▼
                 ┌─────────────────────────┐
                 │      FastAPI Backend    │
                 │       api.py            │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │  Trained ML Model       │
                 │  Random Forest Regressor│
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │  Demand Prediction      │
                 │  + Business Estimates    │
                 └─────────────────────────┘
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- Python 3.10 or a compatible version supported by the project dependencies
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Replace the placeholders with your actual GitHub repository URL and project directory.

### 2. Run the Backend

Navigate to the directory containing `api.py`, `requirements.txt`, and the trained model file.

Create and activate a virtual environment if needed.

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
python -m pip install -r requirements.txt
```

Start the API:

```powershell
python -m uvicorn api:app --reload
```

The backend should run at:

`http://127.0.0.1:8000`

Open the interactive API documentation:

`http://127.0.0.1:8000/docs`

Check the health endpoint:

`http://127.0.0.1:8000/health`

Keep the backend terminal running while using the frontend.

### 3. Run the Frontend

Open a separate terminal and navigate to the directory containing the frontend's `package.json`.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, typically:

`http://localhost:5173`

The exact URL may vary depending on your Vite configuration.

---

## 🔌 API Overview

The backend exposes a prediction endpoint:

**Endpoint:** `POST /predict`

**Local URL:** `http://127.0.0.1:8000/predict`

### Example Request

```json
{
  "city": "Delhi",
  "category": "Collectibles",
  "fandom": "One Piece",
  "price_inr": 1499,
  "product_views": 900,
  "interest_registrations": 180,
  "planned_stock": 100,
  "discount_pct": 10
}
```

### Example Response

```json
{
  "estimated_demand_orders": 411
}
```

The numerical response above is illustrative. Actual predictions depend on the model, the inputs, and the API response schema.

---

## 💼 Business Model

Kizuna Insight is designed around a **Business-to-Business Software-as-a-Service (B2B SaaS)** model.

### Target Customers
- Anime and manga merchandise sellers
- Online collectibles stores
- Japanese pop-culture brands and distributors
- Event organizers and pop-up merchandise retailers

### Potential Revenue Streams

**1. Subscription Plans**

Businesses can pay monthly or annually for access to demand analytics and advanced planning features.

**2. Brand Campaigns and Market Reports**

Brands can pay for campaign analysis and demand insights to support product-launch decisions.

**3. Marketplace Commission — Future Opportunity**

A future marketplace could connect fans with merchandise sellers, allowing the platform to earn a commission on completed sales.

These are proposed revenue streams; commercial traction and pricing still need validation.

---

## 🔮 Future Scope

### 1. AI-Powered Pre-Order and Demand Validation
Allow fans to register interest or pre-order upcoming products. Combine these signals with demand estimates to help sellers make better inventory decisions.

### 2. Real-Market Data Integration
Improve model performance by training and evaluating against actual sales and customer-interest data collected with appropriate permission.

### 3. Advanced City and Trend Analytics
Introduce richer city comparisons, category trends, and historical demand analysis.

### 4. Improved Inventory Recommendations
Develop more advanced stock-planning recommendations using demand uncertainty, supplier lead times, and inventory constraints.

### 5. Fandom Merchandise Marketplace
Explore a marketplace that connects fans with sellers of Japanese pop-culture products, subject to appropriate licensing and operational requirements.

---

## 🌱 Expected Impact

Kizuna Insight aims to help businesses:

- Make more informed product-launch decisions.
- Explore potential demand before committing to inventory.
- Plan stock using data-driven insights.
- Identify promising product and city combinations.
- Build a stronger connection between fan interest and business opportunities.

These benefits are goals to validate through real-world pilots, not yet proven commercial outcomes.

---

## ⚠️ Limitations

- The current model uses synthetic demonstration data.
- Predictions are estimates, not guarantees of actual orders or revenue.
- City and category coverage depends on the model's training data.
- Gross sales estimates do not account for costs, cancellations, taxes, shipping, or profit margins.
- Commercial use requires further model validation and appropriate data and product-licensing practices.

---

## 👥 Target Audience

Kizuna Insight is built for businesses interested in understanding and serving India's Japanese pop-culture market more effectively.

---

## 🎯 Our Vision

**Understand the fans. Predict the demand. Make smarter business decisions.**

Kizuna Insight aims to turn Japanese pop-culture fandom into actionable business intelligence and help businesses explore new opportunities in India's fandom economy.

---

## 📄 License

Choose and add an appropriate open-source license before distributing this project publicly. Do not assume that the project's code, datasets, or third-party assets are licensed for unrestricted commercial use.
