# 🕵️ Sherlock Candidate AI


<p align="center">

<img src="https://img.shields.io/badge/Project-Sherlock%20Candidate%20AI-2563EB?style=for-the-badge" alt="Project"/>
<img src="https://img.shields.io/badge/Status-Development%20Paused-F59E0B?style=for-the-badge" alt="Status"/>
<img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/UI-Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI"/>
<img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>

</p>

<p align="center">

<strong>An AI-powered recruitment intelligence dashboard
designed to help recruiters identify, analyze, verify, and prioritize
candidates from a single platform.</strong>

</p>

<p align="center">

🚀 <strong>Built as a working project foundation ---
development is currently paused while future features are
planned.</strong>

</p>


------------------------------------------------------------------------

## ✨ Project Overview

**Sherlock Candidate AI** is a recruitment-focused web application that
brings candidate intelligence, resume analysis, verification, interview
insights, and recruitment analytics into one centralized interface.

The project was designed around a simple idea:

> **Give recruiters a clearer picture of a candidate before making a
> hiring decision.**

Instead of treating recruitment data as separate pieces, the application
combines candidate information and AI-oriented scoring concepts inside a
modern dashboard experience.

------------------------------------------------------------------------

## 🎯 What This Project Focuses On

Sherlock Candidate AI explores how AI-assisted recruitment workflows can
be organized into a practical enterprise-style application.

### 🧠 Candidate Intelligence

-   AI confidence scoring
-   Resume matching insights
-   Candidate ranking
-   Interview prediction
-   Candidate hiring status

### 📄 Candidate Processing

-   Candidate/resume upload workflow
-   Candidate information management
-   Resume-related matching concepts
-   Candidate activity tracking

### 🛡️ Verification & Fraud Detection

-   Face matching workflow
-   Candidate verification concepts
-   Fraud detection scoring
-   Live verification-related events

### 📊 Recruitment Dashboard

-   Candidate statistics
-   Recruitment activity
-   Hiring funnel
-   Interview insights
-   AI-generated insights
-   Top candidate ranking

### ⚡ Real-Time Experience

The application includes a WebSocket-based architecture for refreshing
relevant dashboard information when events occur, such as:

-   Candidate creation
-   Resume upload
-   Face matching
-   Interview completion
-   Candidate hiring

------------------------------------------------------------------------

## 🖥️ Interface

The application was designed with a modern SaaS / enterprise dashboard
approach using:

-   Clean card-based layouts
-   Responsive grids
-   AI scoring visualizations
-   Candidate ranking interfaces
-   Interactive settings
-   Live status indicators
-   Material UI components
-   Responsive navigation

The project also includes a configurable **Appearance Settings** system
for options such as:

-   Light / Dark / System theme
-   Primary color
-   Font size
-   Compact mode
-   Sidebar behavior
-   Animations
-   Rounded cards
-   Card shadows
-   Dense tables
-   Dashboard background

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
┌───────────────────────────────────────────────┐
│                Sherlock Candidate AI          │
├───────────────────────────────────────────────┤
│                                               │
│                  React Frontend               │
│                       │                       │
│          ┌────────────┴────────────┐          │
│          │                         │          │
│       REST API                WebSocket       │
│          │                         │          │
│          └────────────┬────────────┘          │
│                       │                       │
│                 FastAPI Backend               │
│                       │                       │
│                 SQLAlchemy ORM                │
│                       │                       │
│                    Database                   │
│                                               │
└───────────────────────────────────────────────┘
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer                     Technology
  ------------------------- -----------------------------------
  Frontend                  React
  UI Framework              Material UI (MUI)
  API Client                Axios
  Backend                   FastAPI
  Server                    Uvicorn
  Database Layer            SQLAlchemy
  Data Validation           Pydantic
  Real-Time Communication   WebSocket
  Authentication Context    React Context
  Appearance Management     React Context + MUI ThemeProvider
  Styling                   MUI `sx` + CSS
  Development Environment   Windows / Local Development

------------------------------------------------------------------------

## 📁 Project Structure

``` text
sherlock-candidate-ai/
│
├── backend/
│   ├── app/
│   │   ├── config/
│   │   ├── database/
│   │   ├── face/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── run.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   └── settings/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── theme/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

------------------------------------------------------------------------

## 🚀 Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/YOUR_USERNAME/sherlock-candidate-ai.git
cd sherlock-candidate-ai
```

### 2. Backend Setup

Move into the backend directory:

``` bash
cd backend
```

Create and activate a virtual environment:

``` bash
python -m venv venv
```

### Windows

``` bash
venv\Scripts\activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Start the backend:

``` bash
python run.py
```

The API runs locally at:

``` text
http://127.0.0.1:8000
```

FastAPI documentation:

``` text
http://127.0.0.1:8000/docs
```

------------------------------------------------------------------------

### 3. Frontend Setup

Open another terminal:

``` bash
cd frontend
```

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

The frontend will normally be available through the local Vite
development URL shown in the terminal.

------------------------------------------------------------------------

## 🔌 API Highlights

The dashboard architecture includes API operations around areas such as:

``` text
/dashboard/stats
/dashboard/summary
/dashboard/daily_uploads
/dashboard/daily_matches
/dashboard/interview_stats
/dashboard/recent_uploads
/dashboard/funnel
```

Appearance configuration is handled through:

``` text
GET  /appearance-settings/
PUT  /appearance-settings/
POST /appearance-settings/reset
```

> Endpoint availability can change as backend development continues.

------------------------------------------------------------------------

## ⚡ Real-Time Events

The frontend listens for dashboard-related WebSocket events and can
refresh relevant information without requiring a complete page reload.

Example event types used by the interface:

``` text
resume_uploaded
candidate_created
candidate_hired
interview_completed
face_matched
```

This provides the foundation for a more responsive recruitment
monitoring experience.

------------------------------------------------------------------------

## 🎨 Design Philosophy

The UI was designed around four principles:

### 01 --- Clarity

Recruiters should be able to understand important candidate information
quickly.

### 02 --- Visual Intelligence

Scores, rankings, trends, and verification states should be easier to
scan than raw data.

### 03 --- Real-Time Feedback

Recruitment activity should feel dynamic rather than static.

### 04 --- Extensibility

The application is structured so additional recruitment and AI
capabilities can be introduced later.

------------------------------------------------------------------------

## 📸 Screenshots

Add your project screenshots here:

``` text
docs/
└── screenshots/
    ├── dashboard.png
    ├── candidates.png
    ├── verification.png
    ├── settings.png
    └── ai-insights.png
```

Then display them in this section:

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Candidate Intelligence

![Candidate Intelligence](docs/screenshots/candidates.png)

### Settings

![Settings](docs/screenshots/settings.png)

------------------------------------------------------------------------

## 🧩 Current Project State

> 🟡 **Development Paused**

The current version represents a completed development phase / working
foundation.

I have intentionally paused active development at this stage. The
repository is being kept as a foundation for future improvements and
additional recruitment features.

This means some sections may still contain placeholder functionality or
features that are intended to be expanded later.

------------------------------------------------------------------------

## 🗺️ Future Roadmap

Future development may include:

-   [ ] Advanced AI candidate scoring
-   [ ] Improved resume parsing
-   [ ] Semantic resume-to-job matching
-   [ ] Job description analysis
-   [ ] Candidate recommendation engine
-   [ ] Advanced interview intelligence
-   [ ] More sophisticated fraud detection
-   [ ] Candidate comparison
-   [ ] Advanced recruitment analytics
-   [ ] Recruiter notifications
-   [ ] Role-based access control
-   [ ] Production authentication
-   [ ] Cloud deployment
-   [ ] Automated testing
-   [ ] Improved mobile experience

The roadmap is intentionally flexible and may change as the project
evolves.

------------------------------------------------------------------------

## 🔐 Important Note

This project is a development/portfolio project.

AI scores, predictions, verification indicators, and recruitment
recommendations should **not be treated as definitive hiring decisions**
without appropriate validation, human review, privacy controls, fairness
evaluation, and production-grade security.

------------------------------------------------------------------------

## 💡 Why I Built It

Recruitment generates a large amount of information:

``` text
Resume
   ↓
Candidate Profile
   ↓
Matching
   ↓
Verification
   ↓
Interview
   ↓
Evaluation
   ↓
Hiring Decision
```

The goal of Sherlock Candidate AI is to explore how these stages can be
brought together into a single intelligent recruitment workflow.

------------------------------------------------------------------------

## 👨‍💻 Project Status

**Current milestone:** Initial working platform / development phase
completed

**Development:** ⏸️ Paused

**Future development:** 🚧 Planned

------------------------------------------------------------------------

## ⭐ If You Find This Interesting

If this project gives you ideas for AI-assisted recruitment systems,
feel free to explore the repository, experiment with the architecture,
and build on the concept.

**Star ⭐ the repository if you find it useful.**

------------------------------------------------------------------------

```{=html}
<p align="center">
```
### 🕵️ Sherlock Candidate AI

**Recruitment Intelligence • Candidate Analysis • AI-Assisted Hiring**

Built with ❤️ using React + FastAPI + Material UI

```{=html}
</p>
```
