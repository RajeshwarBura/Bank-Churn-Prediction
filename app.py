import streamlit as st
import joblib
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import base64
import os

# ===============================
# 🌆 PAGE CONFIGURATION
# ===============================
st.set_page_config(
    page_title="Telecom Customer Churn Prediction",
    page_icon="OIP.jpg",
    layout="wide"
)

# ===============================
# 🖼️ BACKGROUND IMAGE
# ===============================
def add_bg_from_local(image_file):
    if os.path.exists(image_file):
        with open(image_file, "rb") as f:
            encoded_string = base64.b64encode(f.read()).decode()
        st.markdown(
            f"""
            <style>
            .stApp {{
                background-image: url("data:image/png;base64,{encoded_string}");
                background-size: cover;
                background-attachment: fixed;
                background-position: center;
            }}
            </style>
            """,
            unsafe_allow_html=True
        )

# Add your background image
add_bg_from_local(r"C:\Users\VIVEK\Documents\MJ\Customer-churn\photo.png")

# ===============================
# 🧠 LOAD MODEL & ASSETS
# ===============================
try:
    model = joblib.load("churn_model.pkl")
    model_columns = joblib.load("model_columns.pkl")
    scaler = joblib.load("scaler.pkl")
except:
    st.warning("⚠️ Model file not found. Please ensure 'churn_model.pkl', 'model_columns.pkl', and 'scaler.pkl' are in the same directory.")
    st.stop()

# ===============================
# 💡 CUSTOM CSS STYLING
# ===============================
st.markdown("""
    <style>
    h1, h2, h3, h4, h5 {
        color: #00ffff;
        text-align: center;
        text-shadow: 1px 1px 4px #000;
    }
    .stButton>button {
        background: linear-gradient(90deg, #007bff, #00ffff);
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px 24px;
        font-size: 16px;
        transition: 0.3s;
    }
    .stButton>button:hover {
        background: linear-gradient(90deg, #00ffff, #007bff);
        transform: scale(1.05);
    }
    </style>
""", unsafe_allow_html=True)

# ===============================
# 🧩 HEADER
# ===============================
st.markdown("""
    <h1>📡 Telecom Customer Churn Prediction</h1>
    <h4>Predict customer churn and get retention strategies</h4>
""", unsafe_allow_html=True)
st.markdown("---")

# ===============================
# 🧾 INPUT FORM
# ===============================
st.markdown("<h3 style='color:white;'>Enter Customer Details:</h3>", unsafe_allow_html=True)

col1, col2, col3 = st.columns(3)

with col1:
    gender = st.selectbox("Gender", ["Male", "Female"])
    SeniorCitizen = st.selectbox("SeniorCitizen (0 = No, 1 = Yes)", [0, 1])
    Partner = st.selectbox("Partner", ["Yes", "No"])
    Dependents = st.selectbox("Dependents", ["Yes", "No"])
    tenure = st.number_input("Tenure (Months)", min_value=0.0, max_value=72.0, value=12.0)
    PhoneService = st.selectbox("PhoneService", ["Yes", "No"])
    MultipleLines = st.selectbox("MultipleLines", ["Yes", "No"])
    InternetService = st.selectbox("InternetService", ["DSL", "Fiber optic", "No"])

with col2:
    OnlineSecurity = st.selectbox("OnlineSecurity", ["Yes", "No"])
    OnlineBackup = st.selectbox("OnlineBackup", ["Yes", "No"])
    DeviceProtection = st.selectbox("DeviceProtection", ["Yes", "No"])
    TechSupport = st.selectbox("TechSupport", ["Yes", "No"])
    StreamingTV = st.selectbox("StreamingTV", ["Yes", "No"])
    StreamingMovies = st.selectbox("StreamingMovies", ["Yes", "No"])
    Contract = st.selectbox("Contract", ["Month-to-month", "One year", "Two year"])
    PaperlessBilling = st.selectbox("PaperlessBilling", ["Yes", "No"])

with col3:
    PaymentMethod = st.selectbox("PaymentMethod", ["Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"])
    MonthlyCharges = st.number_input("MonthlyCharges", min_value=0.0, max_value=200.0, value=75.0)
    TotalCharges = st.number_input("TotalCharges", min_value=0.0, max_value=10000.0, value=1800.0)
    AvgMonthlyCharges = st.number_input("AvgMonthlyCharges", min_value=0.0, max_value=500.0, value=75.0)
    TenureGroup = st.selectbox("TenureGroup", ["Low", "Medium", "High"])
    ChargesGroup = st.selectbox("ChargesGroup", ["Low", "Medium", "High"])

# ===============================
# 🔢 ENCODING FUNCTION
# ===============================
def encode_value(val):
    mapping = {
        "Yes": 1, "No": 0,
        "Male": 1, "Female": 0,
        "Month-to-month": 0, "One year": 1, "Two year": 2,
        "Electronic check": 0, "Mailed check": 1,
        "Bank transfer (automatic)": 2, "Credit card (automatic)": 3,
        "DSL": 0, "Fiber optic": 1, "No": 2,
        "Low": 0, "Medium": 1, "High": 2
    }
    return mapping.get(val, val)

# ===============================
# 🧮 PREPARE INPUT (FIXED)
# ===============================
encoded_inputs = [
    encode_value(gender),
    SeniorCitizen,
    encode_value(Partner),
    encode_value(Dependents),
    tenure,
    encode_value(PhoneService),
    encode_value(MultipleLines),
    encode_value(InternetService),
    encode_value(OnlineSecurity),
    encode_value(OnlineBackup),
    encode_value(DeviceProtection),
    encode_value(TechSupport),
    encode_value(StreamingTV),
    encode_value(StreamingMovies),
    encode_value(Contract),
    encode_value(PaperlessBilling),
    encode_value(PaymentMethod),
    MonthlyCharges,
    TotalCharges,
    AvgMonthlyCharges,
    encode_value(TenureGroup),
    encode_value(ChargesGroup)
]

input_data = pd.DataFrame([encoded_inputs], columns=model_columns)
input_scaled = scaler.transform(input_data)

# ===============================
# 🚀 PREDICT BUTTON
# ===============================
if st.button("🚀 Predict Churn"):
    churn_prob = model.predict_proba(input_scaled)[0][1] * 100
    stay_prob = 100 - churn_prob

    st.markdown("<br>", unsafe_allow_html=True)

    if churn_prob > 50:
        st.error(f"⚠️ This customer is **likely to churn**.\n\n**Churn Probability:** {churn_prob:.2f}%")
    else:
        st.success(f"✅ This customer is **likely to stay**.\n\n**Retention Probability:** {stay_prob:.2f}%")

    # ===============================
    # 💡 RETENTION POLICY
    # ===============================
    st.markdown("### 💡 Retention Strategy Suggestion")
    if churn_prob > 80:
        st.info("Offer a **loyalty discount**, upgrade plan benefits, or assign a **personal relationship manager**.")
    elif churn_prob > 60:
        st.info("Send **targeted offers** or **personalized recommendations** to improve engagement.")
    elif churn_prob > 40:
        st.info("Encourage through **customer satisfaction surveys** or **reward points**.")
    else:
        st.info("Customer is satisfied. Maintain service quality and provide **regular engagement**.")

    # ===============================
    # 📊 INTERACTIVE PLOTLY VISUALS
    # ===============================
    st.markdown("### 📈 Prediction Visuals")

    colA, colB = st.columns(2)

    # --- Bar Chart (Hover Enabled) ---
    with colA:
        bar_fig = px.bar(
            x=["Retention", "Churn"],
            y=[stay_prob, churn_prob],
            color=["Retention", "Churn"],
            color_discrete_map={"Retention": "#00ff99", "Churn": "#ff4d4d"},
            text=[f"{stay_prob:.2f}%", f"{churn_prob:.2f}%"],
            title="Customer Churn vs Retention"
        )
        bar_fig.update_traces(textposition="outside", hovertemplate="%{x}: %{y:.2f}%")
        bar_fig.update_layout(
            template="plotly_dark",
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            font=dict(color="white")
        )
        st.plotly_chart(bar_fig, use_container_width=True)

    # --- Pie Chart (Hover Enabled) ---
    with colB:
        pie_fig = px.pie(
            names=["Retention", "Churn"],
            values=[stay_prob, churn_prob],
            color=["Retention", "Churn"],
            color_discrete_map={"Retention": "#00ff99", "Churn": "#ff4d4d"},
            title="Proportion of Churn vs Retention",
            hole=0.4
        )
        pie_fig.update_traces(textinfo="label+percent", hovertemplate="%{label}: %{value:.2f}%")
        pie_fig.update_layout(
            template="plotly_dark",
            plot_bgcolor="rgba(0,0,0,0)",
            paper_bgcolor="rgba(0,0,0,0)",
            font=dict(color="white")
        )
        st.plotly_chart(pie_fig, use_container_width=True)

    # --- Gauge Chart ---
    st.markdown("### 🚦 Churn Likelihood Gauge")
    gauge_fig = go.Figure(go.Indicator(
        mode="gauge+number",
        value=churn_prob,
        title={'text': "Churn Probability (%)", 'font': {'color': '#00ffff'}},
        gauge={
            'axis': {'range': [0, 100], 'tickcolor': '#ffffff'},
            'bar': {'color': "#ff4d4d"},
            'bgcolor': "black",
            'steps': [
                {'range': [0, 40], 'color': "#00ff99"},
                {'range': [40, 70], 'color': "#f1c40f"},
                {'range': [70, 100], 'color': "#ff4d4d"}
            ]
        }
    ))
    gauge_fig.update_layout(
        height=350,
        template="plotly_dark",
        paper_bgcolor="rgba(0,0,0,0)",
        font=dict(color="white")
    )
    st.plotly_chart(gauge_fig, use_container_width=True)
