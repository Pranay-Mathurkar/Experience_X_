# 🚀 Experience_X  
**Real Experiences. Real Companies. Real Insights.**  

Experience_X is a modern web platform where users can share, explore, and discuss real interview and workplace experiences of companies. It helps job seekers make better career decisions through authentic peer insights.

🌐 **Live Demo:** https://experience-x.onrender.com  
💻 **GitHub Repository:** https://github.com/Pranay-Mathurkar/Experience_X_

---

## ✨ Features  

- 🏢 **Company Experience Sharing** – Users can post interview & workplace experiences  
- 🔍 **Smart Search** – Search companies instantly  
- ⭐ **Trending Companies** – View popular companies dynamically  
- 💬 **Real-Time Chat System** – WhatsApp-style messaging with:
  - ✅ Seen ticks  
  - 🕒 Message timestamps  
  - 🎨 Different colors for sender & receiver  
- 🔐 **User Authentication** – Secure login & signup  
- 🔵 **Google OAuth Login** – One-click login using Google  
- 📩 **Email Notifications** – Users receive email alerts when:
  - They follow a company  
  - New experiences are posted for followed companies  
- 📊 **Company Detail Page** – Dynamic stats & all user experiences  
- 📝 **Add Review System** – Logged-in users can submit experiences  
- 📱 **Responsive UI** – Works across mobile, tablet & desktop  
- ⚡ **Fast Navigation** – Powered by React Router  
- 🔄 **Live Data Updates** – Using REST APIs & MongoDB  

---

## 🛠️ Tech Stack  

### Frontend  
- React.js  
- Tailwind CSS  
- React Router  
- Axios  

### Backend  
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- Google OAuth 2.0  
- Socket.IO (for real-time chat)  
- Nodemailer (for email notifications)  

### Deployment  
- Frontend: Render  
- Backend: Render  
- Database: MongoDB Atlas  

---

## 🔧 How It Works  

1. User **logs in using Email/Password or Google OAuth**.  
2. Users can **browse companies** or search instantly.  
3. Users can **follow any company**.
4. Whenever a **new experience is posted** for a followed company:
   - 📩 An **email notification is sent automatically**.
5. On any company page, users can:
   - Read all shared experiences  
   - View company stats  
   - Open real-time chat  
6. Logged-in users can:
   - Share their own interview/work experience  
   - Chat with other users  
7. Backend manages:
   - User sessions  
   - OAuth tokens  
   - Follow system  
   - Email service  
   - Messages & reviews  

---

## 🚀 Getting Started  

### ✅ Prerequisites  
- Node.js (v14+)  
- npm  
- MongoDB Atlas Account  
- Google Developer Console Project  
- Email service credentials (Gmail / SMTP)  

---

### 🔽 Installation  

```bash
git clone https://github.com/Pranay-Mathurkar/Experience_X_.git
cd Experience_X_
```

---

### 🔧 Backend Setup  

```bash
cd backend
npm install
```

Create a `.env` file inside `backend` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Notifications
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm start
```

---

### 🎨 Frontend Setup  

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots  
*(Add screenshots here for better project presentation)*  

---<img width="1913" height="997" alt="Screenshot 2025-12-09 044840" src="https://github.com/user-attachments/assets/e0ae1fd4-bcda-4280-9ee4-5c063e3c68d6" />
<img width="1901" height="992" alt="Screenshot 2025-12-09 044900" src="https://github.com/user-attachments/assets/30b5f907-86e8-4d3e-b2ab-ad8243f3bfb1" />

<img width="1895" height="978" alt="Screenshot 2025-12-09 044926" src="https://github.com/user-attachments/assets/3ae8de23-a54b-4f54-9b19-e3b12e12659a" />
<img width="1891" height="872" alt="Screenshot 2025-12-09 044939" src="https://github.com/user-attachments/assets/912ffb7a-e112-4900-aec8-0f4b778d4ccc" />
<img width="1735" height="964" alt="Screenshot 2025-12-09 045008" src="https://github.com/user-attachments/assets/e445c956-0afe-467e-a943-165d5b3f808c" />
<img width="1873" height="960" alt="Screenshot 2025-12-09 045026" src="https://github.com/user-attachments/assets/d1c56fa5-922b-4b32-94ee-3e6a17e16aa1" />
<img width="1587" height="934" alt="Screenshot 2025-12-09 045123" src="https://github.com/user-attachments/assets/d40d178d-9adb-4210-b348-24be7d8886c7" />
<img width="1584" height="963" alt="Screenshot 2025-12-09 045534" src="https://github.com/user-attachments/assets/60ac1431-6948-4cdc-bfa1-1917f1f76ee4" />
<img width="1843" height="989" alt="Screenshot 2025-12-09 041253" src="https://github.com/user-attachments/assets/9a3d72dc-202a-4449-8cb2-ccd501e15c0c" />
## 🧑‍💻 Author 
 

**Pranay Mathurkar**  
- GitHub: https://github.com/Pranay-Mathurkar  
- Project Repo: https://github.com/Pranay-Mathurkar/Experience_X_  

---

## ✅ Future Enhancements  

- ✅ Admin Dashboard  
- ✅ AI based Experience Filtering  
- ✅ Resume Upload Feature  
- ✅ Job Referrals Section  
- ✅ Anonymous Experience Posting  

---



This project is licensed under the MIT License.

---

⭐ If you like this project, give it a star on GitHub!
