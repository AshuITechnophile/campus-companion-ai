<div align="center">

# 🎓 SageSync – AI Campus Companion

### Intelligent Student Assistant for SAGE University, Indore

An AI-powered campus assistant that helps students get instant university information, find official contacts, register complaints, and track complaint status—all from one modern chatbot.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_SageSync-2563EB?style=for-the-badge)](https://campus-companion-ai-beige.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)](https://vitejs.dev/)
[![n8n](https://img.shields.io/badge/n8n-Automation-EA4B71?logo=n8n)](https://n8n.io/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_2.5-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)

🌐 **Live Demo:** https://campus-companion-ai-beige.vercel.app/

</div>

---

# 📖 Overview

SageSync is an AI-powered Campus Companion built for **SAGE University, Indore**.

Students frequently struggle to find accurate information about admissions, hostel facilities, fees, examination schedules, department contacts, library timings, transport, and complaint procedures.

SageSync solves this problem by providing a conversational AI assistant connected to an official university knowledge base. Students can ask questions naturally in **English, Hindi, or Hinglish**, register complaints, and track complaint status in real time.

---

# ✨ Features

## 🎓 University Information

Get instant answers about:

- Library Timings
- Hostel Information
- Hostel Rules
- Fee Structure
- Scholarships
- Admissions
- ERP Support
- Examination
- Semester Details
- WiFi
- Transport
- Bus Timings
- Timetable
- Certificates
- Campus Facilities
- Holidays

---

## 📞 Official Contacts

Find official:

- Phone Numbers
- Email Addresses
- Office Locations

Including:

- Admissions
- Finance Office
- Administration
- Library
- Hostel
- Examination Cell

---

## 🏫 Department Contacts

Search department information including:

- HOD Details
- Faculty Contacts
- Computer Science
- IT
- Engineering
- Agriculture
- Commerce
- Law
- Pharmacy
- Science
- Arts
- IAC
- ICA
- IMS
- JMC

---

## 📝 Complaint Management

Students can register complaints for:

- Hostel
- WiFi
- Electricity
- Water Supply
- Mess
- Cleanliness
- Maintenance
- Furniture
- Classroom Issues
- Fan
- AC

---

## 🔍 Complaint Status Tracking

Track complaints using a Complaint ID.

Displays:

- Complaint ID
- Current Status
- Category
- Description
- Admin Remark
- Updated Time

---

## 🌍 Multilingual Support

Supports:

- 🇬🇧 English
- 🇮🇳 Hindi
- 💬 Hinglish

The assistant automatically responds in the same language used by the student.

---

## 🧠 Smart Conversation Memory

The assistant remembers conversation context.

Example:

```
User:
Register a hostel complaint.

Assistant:
Collects complaint details.

User:
What are library timings?

Assistant:
Answers library question.

User:
What is the status?

Assistant:
Automatically checks the previously created complaint.
```

---

# 🚀 Live Demo

### 🌐 Website

https://campus-companion-ai-beige.vercel.app/

---

# 🏗️ System Architecture

```
                Student
                    │
                    ▼
          React + Vite Frontend
                    │
                    ▼
           n8n AI Agent Workflow
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
 Campus FAQ   Official Contacts  Department Contacts
        │
        ▼
 Complaint Creator
        │
        ▼
 Complaint Status
        │
        ▼
 Google Sheets Database
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

## AI & Backend

- Google Gemini 2.5
- n8n
- Google Sheets
- Webhooks

---

## Deployment

- Lovable
- Vercel

---

# 📂 Project Structure

```
src/
│
├── components/
├── hooks/
├── lib/
├── pages/
├── services/
├── utils/
└── assets/

n8n/
│
├── AI Agent
├── Complaint Workflow
├── Google Sheets
└── Memory

Database/
│
├── Campus_FAQ
├── Official_Contacts
├── Department_Contacts
└── Complaints
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/AshuITechnophile/campus-companion-ai.git
```

Go to project

```bash
cd campus-companion-ai
```

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build project

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
VITE_N8N_WEBHOOK_URL=https://your-n8n-domain/webhook/chat

VITE_APP_NAME=SageSync
```

---

# 🤖 AI Capabilities

SageSync can:

- Answer university FAQs
- Search official contacts
- Find department information
- Register complaints
- Track complaint status
- Maintain conversation memory
- Understand follow-up questions
- Handle interrupted conversations
- Detect English, Hindi & Hinglish
- Avoid hallucinated answers

---

# 🔄 Complaint Workflow

### Step 1

Student requests to register a complaint.

↓

### Step 2

AI collects:

- Student Name
- Student ID
- Category
- Description
- Room Number (Optional)

↓

### Step 3

Complaint is stored in Google Sheets.

↓

### Step 4

Complaint ID is generated.

↓

### Step 5

Student receives confirmation.

↓

### Step 6

Student can track complaint anytime.

---

# 🧪 Testing

The project has been tested for:

✅ FAQ Retrieval

✅ Official Contacts

✅ Department Contacts

✅ Complaint Registration

✅ Complaint Status

✅ Conversation Memory

✅ Topic Switching

✅ Follow-up Questions

✅ Language Detection

✅ Hinglish Responses

✅ Empty Inputs

✅ Invalid Complaint IDs

✅ Duplicate Complaints

✅ Error Handling

---

# 🔒 Security

- Uses only official university information
- No hallucinated responses
- Internal tools are hidden
- No fake contact information
- No fake complaint IDs
- Graceful error handling
- Production-ready workflow

---

 # 🚀 Future Scope

- Student Authentication
- Admin Dashboard
- Analytics Dashboard
- Email Notifications
- Push Notifications
- Complaint Analytics
- Voice Assistant
- OCR Support
- Campus Map Integration
- PDF Knowledge Base
- Multi-campus Support

---

# 👨‍💻 Developer

## Ashutosh Mishra

**B.Tech Computer Science**

SAGE University, Indore

GitHub

https://github.com/AshuITechnophile

LinkedIn

(Add your LinkedIn URL)

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a Pull Request.

---

# 📄 License

This project is developed as an academic capstone project for **SAGE University, Indore**.

---

<div align="center">

## ⭐ If you found this project useful, please consider giving it a Star!

Made with ❤️ by **Ashutosh Mishra**

</div>
