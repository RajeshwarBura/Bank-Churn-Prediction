# 🏦 Bank Customer Churn Prediction

A machine learning project that predicts whether a customer will exit the bank based on demographic, financial, and behavioral data.  
This helps banks proactively identify high-risk customers and take action to improve retention.

---

## 🚀 Project Overview

Customer churn is a major challenge in the banking sector. This project builds and compares multiple machine learning models to predict churn and provide actionable insights.

**Key goals:**
- Identify customers likely to leave the bank
- Understand factors influencing churn through EDA
- Build a reliable ML pipeline ready for deployment

---

## ✅ Features

- Data Preprocessing & Cleaning
- Feature Engineering
- Exploratory Data Analysis (EDA)
- Model Training & Comparison (Logistic Regression, Random Forest, XGBoost, etc.)
- Hyperparameter Tuning
- Model Evaluation (Accuracy, Precision, Recall, F1-Score, ROC-AUC)
- Saved Model Inference Pipeline
- Deployment Support (Flask / FastAPI / Streamlit optional)

---

## 📁 Project Structure

├── data/ # Raw dataset

├── notebooks/ # Experiments & EDA

├── src/ # Preprocessing, training & inference scripts

├── models/ # Saved trained models (.pkl / .json)

├── app/ # API or UI deployment (optional)

├── README.md # Project documentation

├── requirements.txt # Python dependencies

└── .gitignore # Ignore unnecessary files


## 📊 Dataset

Public bank customer dataset containing features such as:

| Feature | Description |
|--------|------------|
| Credit Score | Customer's credit rating |
| Country | Customer's location |
| Age | Customer's age |
| Tenure | Years in the bank |
| Balance | Account balance |
| NumOfProducts | Number of bank products used |
| IsActiveMember | Whether customer is active |
| Estimated Salary | Approx salary |
| Exited | Target variable (1 = churn, 0 = retained) |

---

## 🧠 Machine Learning Workflow

1. Load data
2. Clean & preprocess
3. Perform EDA for insights
4. Train multiple ML models
5. Evaluate & compare results
6. Tune best performing model
7. Save model & run inference
8. (Optional) Deploy model

---

## 📈 Model Evaluation Sample

Models are evaluated using:

- **Accuracy**
- **Precision**
- **Recall**
- **F1-Score**
- **ROC-AUC Curve** for discrimination power
- **Confusion Matrix**

> The best performing model is selected based on ROC-AUC and overall balanced metrics.

---

## 🛠 Tech Stack

- **Python**
- **Machine Learning**: Scikit-Learn, XGBoost
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn
- **Deployment (optional)**: Flask / FastAPI / Streamlit

---

## ⚙ Installation

### 1️⃣ Clone the repository
```bash
git clone <repo-link>
cd bank-churn-prediction

2️⃣ Install dependencies

pip install -r requirements.txt

3️⃣ Run training pipeline

python src/train.py

4️⃣ Run predictions

python src/predict.py

🔎 Sample Prediction

{
  "customer_id": 156845,
  "churn_probability": 0.87,
  "prediction": "Likely to Churn ⚠"
}

🌍 Deployment (Optional)
You can serve the model using:

Flask API

FastAPI

Streamlit UI

Example with FastAPI:

uvicorn app.api:app --reload

💡 Business Impact
This project supports:

Proactive customer retention

Targeted marketing strategies

Reduction in customer acquisition cost

Improved customer satisfaction

🤝 Contributing
Contributions are welcome!
Feel free to open an issue or submit a pull request.

⭐ Show Your Support
If you like this project, please star the repository! 🌟
It motivates me to keep improving the work.

