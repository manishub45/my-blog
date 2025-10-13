# 📰 My Blog — Full-Stack React Blog App

A fully-functional, responsive **Blog Web App** built with **React, Redux Toolkit, Appwrite**, and **TailwindCSS** — designed for smooth blogging, authentication, image uploads, and powerful search.

🔗 **Live Demo:** [my-blog-nine-phi-30.vercel.app](https://my-blog-nine-phi-30.vercel.app)  
📦 **Repository:** [GitHub Repo](https://github.com/manishub45/my-blog)

---

## 🧪 Demo Credentials

You can explore the app using the following test account:
Email: test@example.com
Password: testpassword123


➡️ Login here → [My Blog Live](https://my-blog-nine-phi-30.vercel.app)

---

## 🚀 Features

✅ **Authentication (Signup / Login)** — Secure user login & signup with Appwrite Auth  
✅ **Add / Edit / Delete Posts** — Full CRUD functionality connected to Appwrite Database  
✅ **Image Upload + Preview** — Upload post images to Appwrite Storage with instant preview  
✅ **Search Posts** — Real-time filtering by title or content  
✅ **Delete Confirmation Modal** — Custom modal with smooth animations  
✅ **Toast Notifications** — Instant success/error feedback using React Hot Toast  
✅ **Responsive UI** — Mobile-friendly design built with TailwindCSS  
✅ **Rich Text Editor** — TinyMCE integrated for formatted blog content  
✅ **Optimized State Management** — Redux Toolkit for predictable, clean global state

---

## 🧠 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React (Vite), Redux Toolkit, React Hook Form, React Router DOM |
| **Backend & DB** | Appwrite (Auth • Database • Storage) |
| **Styling** | TailwindCSS |
| **UI Components** | TinyMCE, React Hot Toast, Custom Modal |
| **Deployment** | Vercel (Frontend), Appwrite Cloud |

---

## 🧩 Folder Structure

my-blog/
├── src/
│ ├── appwrite/ # Appwrite configuration
│ ├── components/ # Reusable UI components (PostCard, SearchBar, Modals, etc.)
│ ├── pages/ # Main pages (Home, AllPosts, AddPost, EditPost, Post, Login, Signup)
│ ├── store/ # Redux Toolkit slices
│ ├── App.jsx # App routing and layout
│ ├── main.jsx # App entry point
│ └── index.css # Global styles
├── public/
├── .env # Environment variables (Appwrite config)
└── README.md


---

## ⚙️ Environment Variables

Before running the app, create a `.env` file in the root directory:

```bash
VITE_APPWRITE_URL=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id


🧑‍💻 Running Locally

Clone the project and install dependencies:

git clone https://github.com/manishub45/my-blog.git
cd my-blog
npm install
npm run dev
Now open http://localhost:5173
 to view the app.

🌐 Deployment

Deployed on Vercel with environment variables configured for Appwrite Cloud.

Frontend: React (Vite) → Vercel

Backend: Appwrite (Auth, Database, Storage)

Add your domain (https://my-blog-nine-phi-30.vercel.app) to Appwrite → Settings → Web Origins

Add same domain in TinyMCE API key allowlist


## 📸 Screenshots

### 🏠 Homepage
![Homepage](https://raw.githubusercontent.com/manishub45/my-blog/main/src/assets/home.png)

### 📰 All Posts
![All Posts](https://raw.githubusercontent.com/manishub45/my-blog/main/src/assets/allpost.png)

### ➕ Add Post
![Add Post](https://raw.githubusercontent.com/manishub45/my-blog/main/src/assets/addpost.png)

### 🧾 Signup
![Signup](https://raw.githubusercontent.com/manishub45/my-blog/main/src/assets/signup.png)

### 🔑 Login Page
![Login](https://raw.githubusercontent.com/manishub45/my-blog/main/src/assets/login.png)




🧾 Author

👨‍💻 Manish Ubnare
Frontend Developer | React | Redux | Tailwind | Appwrite

📧 Email: manishub75@gmail.com

🔗 Portfolio / GitHub: 🧾 Author

👨‍💻 Manish Ubnare
Frontend Developer | React | Redux | Tailwind | Appwrite

📧 Email: manishubnare@example.com

 GitHub: github.com/manishub45

