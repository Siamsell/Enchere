# Enchère DZ 🇩🇿

### Bilingual Online Auction Platform

Enchère DZ is a web-based auction marketplace designed to facilitate the publication, discovery, and management of auction listings. The platform provides a bilingual experience in Arabic and French, allowing users to interact with the marketplace through a simple and accessible interface.

## Features

- **User Authentication:** Registration, login, and profile management.
- **Auction Management:** Create, update, delete, and manage auction listings.
- **Media Management:** Upload images and videos with automatic image watermarking.
- **Search System:** Search and discover available listings.
- **Subscription Management:** Manage user subscriptions, durations, and payment statuses.
- **User Dashboard:** Manage personal listings and account information.
- **Admin Dashboard:** Manage users, announcements, subscriptions, and platform statistics.
- **Bilingual Interface:** Support for Arabic and French.
- **Listing Details:** View listing information, media, and view counts.

## Technologies

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JWT, Bcrypt |
| File Upload | Multer |
| Image Processing | Sharp |
| API | REST API |

## Project Structure

```text
enchere-dz/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── public/
│   ├── app.js
│   └── server.js
│
├── uploads/
│   ├── images/
│   ├── videos/
│   └── tmp/
│
├── my.sql
├── package.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd enchere-dz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure your database connection and application secrets.

```env
DB_NAME=your_database
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret
SECRET_KEY=your_secret
PORT=3000
```

### 4. Set up the database

Import the provided `my.sql` file into your MySQL database.

### 5. Start the application

```bash
node src/server.js
```

Open your browser:

```text
http://localhost:3000
```

##  Project

**Enchère DZ – Online Auction Marketplace**

Developed as a web development project using modern backend technologies and database management.

