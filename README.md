# 🧠 sereneMind – AI Mental Wellness Platform

sereneMind is a full-stack AI-powered mental wellness web application designed to help users understand their stress levels, track moods, and receive personalized, non-medical mental health guidance in a safe and ethical way.

> ⚠️ Disclaimer: This platform does NOT provide medical or clinical advice. It is meant for awareness and self-help only.

---

## 🌟 Features

### 🔐 User Authentication
- Secure Register & Login
- JWT-based authentication
- Password hashing using bcrypt
- Optional anonymous usage

---

### 🧪 Stress Level Checker
- Short multiple-choice questionnaire
- Stress score calculation
- Categorization:
  - Low Stress
  - Moderate Stress
  - High Stress
- Visual indicators (progress bar & colors)
- Stress history tracking

---

### 📊 Mood Tracker
- Daily mood selection:
  - Happy
  - Sad
  - Anxious
  - Angry
  - Calm
- Optional notes
- Weekly & monthly analytics
- Graph-based mood visualization

---

### 🤖 AI Mind Analysis
- Text-based emotional expression
- AI analyzes:
  - Stress level
  - Primary emotion
  - Possible reasons
  - Gentle coping suggestions
- Empathetic, human-like responses
- Analysis history saved securely

---

### 🧘 Guided Exercises
- Breathing exercises (2–5 minutes)
- Grounding technique (5-4-3-2-1)
- Focus reset exercises for students
- Timer-based interactive UI

---

### 🎯 Personalized Tips
- Stress-level-based recommendations
- Categories:
  - Study
  - Sleep
  - Lifestyle
  - Digital Detox

---

### 🚨 Emergency Support
- Clear disclaimer
- India mental health helpline numbers
- Encouragement to seek real human support

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Chart.js / Recharts
- Light & Dark Mode UI

### Backend
- Node.js
- Express.js
- RESTful APIs
- JWT Authentication

### Database
- MongoDB
- Mongoose ODM

### AI Integration
- Google Gemini / OpenAI (prompt-based analysis)

---

## 🗂️ Project Structure

mind-ease/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
│
├── README.md
└── .env


---

## 🔌 API Endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login


### Stress
GET /api/stress/questions
POST /api/stress/submit
GET /api/stress/history


### Mood
POST /api/mood/add
GET /api/mood/weekly
GET /api/mood/monthly


### AI Analysis
POST /api/ai/analyze
GET /api/ai/history


### Exercises
GET /api/exercises


---

## 🤖 AI Prompt Logic (Internal)

You are a mental wellness assistant.
Analyze the user's message and identify:

* Stress level (Low / Moderate / High)
* Primary emotion
* Possible causes
* Three gentle coping suggestions
Use empathetic and non-judgmental language.
Do NOT provide medical advice.
---

## 🔒 Security & Ethics
- Encrypted passwords
- JWT-based access control
- No medical diagnosis
- User data privacy & deletion support
- Ethical AI usage

---

## 🚀 Future Enhancements
- Voice input & output
- Weekly mental health PDF report
- Meditation audio guides
- PWA (offline support)
- Multi-language support

---

## 🏆 Use Cases
- Students dealing with academic stress
- Professionals managing burnout
- Anyone seeking mental clarity & emotional awareness

---

## 📌 Resume / Hackathon Description
**MindEase** is an AI-driven mental wellness platform that provides stress detection, mood tracking, and personalized coping guidance using React, Node.js, MongoDB, and AI models, while ensuring ethical and non-clinical mental health support.

---

## ❤️ Acknowledgement
Built with a focus on empathy, simplicity, and ethical AI to promote mental well-being.

