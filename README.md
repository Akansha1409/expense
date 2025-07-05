# 💰 Expense Tracker App

A sleek, full-stack personal budgeting tool that lets you track transactions, set category-wise monthly budgets, and visualize spending insights through charts.

---

## 🚀 Features

- ✅ Add, view, and delete transactions
- ✅ Set monthly budgets per category
- ✅ Get alerts when overspending
- ✅ Budget vs Actual comparison (bar chart)
- ✅ Monthly expenses overview
- ✅ Category-wise breakdown (pie chart)

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 13+ (App Router), TypeScript, Tailwind CSS
- **Backend:** API Routes (Node.js)
- **Database:** MongoDB Atlas (via Mongoose)
- **Charts:** Recharts
- **Data Fetching:** SWR

---

## 📸 Screenshots

| Dashboard | Category Breakdown | Budget vs Spent |
|----------|---------------------|-----------------|
| ![Dashboard](./public/screenshot-dashboard.png) | ![Pie](./public/screenshot-pie.png) | ![Bar](./public/screenshot-bar.png) |

---

## 📦 Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/expense-tracker-app.git
   cd expense-tracker-app
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Configure environment variables
Create a .env.local file:

env
Copy
Edit
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"
Run the development server

bash
Copy
Edit
npm run dev
Visit the app

arduino
Copy
Edit
http://localhost:3000
🌐 Folder Structure
bash
Copy
Edit
/app
  /api
    /transactions     → transaction CRUD APIs
    /budgets          → budget APIs
  /components         → reusable UI components
  /lib
    db.ts             → MongoDB connection
    models.ts         → Mongoose models
✨ Upcoming Features
 Edit transactions

 Budget history & trend tracking

 User authentication (optional)

 Export to CSV

