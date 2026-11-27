# Placement Tracker

A role-based campus placement portal built with **React** and **Vite**. Students can browse and apply to open roles from listed companies, while company admins can review incoming applications for their organization and update candidate statuses.

## Render Link -> https://placement-tracker-s1d4.onrender.com/login

## Features

### Student View
- **Apply to Open Roles:** Select from a predefined list of companies and their specific open positions with deadlines (duplicate applications for the same role are blocked).
- **Personal Dashboard:** Track total applications, online assessments (OA), interviews, offers, and upcoming deadlines.
- **Application Tracking:** Search and filter personal applications with color-coded status badges (`Applied`, `OA`, `Interview`, `Offer`, `Rejected`).

### Company / Admin View
- **Isolated Company Portal:** Log in under a specific company (e.g., TCS, Microsoft, Google, Amazon) to view only the candidates who applied to that company.
- **Candidate Management:** Search and filter applicants by name or role, update application statuses through the hiring pipeline, or remove entries.
- **Company Dashboard:** View live metrics and upcoming deadlines for incoming applications.

### General
- **Role-Based Protected Routes:** Prevents unauthorized access to student-only or authenticated pages.
- **Client-Side Persistence:** Uses React Context API (`AuthContext`, `PlacementContext`) backed by `localStorage`.

## Tech Stack
- **Frontend:** React, Vite, React Router (`react-router-dom`)
- **State Management:** React Context API + `localStorage`
- **Styling:** Custom CSS

## Project Structure

```text
Placement-Tracker-/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── PlacementContext.jsx
│   │   ├── data/
│   │   │   └── companies.js
│   │   ├── pages/
│   │   │   ├── AddApplication.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
└── README.md

