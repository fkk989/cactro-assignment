# 📌 Cactro Assignment

A backend API built using **Node.js**, **Express**, **MongoDB**, and **TypeScript**, with schema validation powered by **Zod**. This project supports user authentication and task management, and can run with or without Docker.

#### postman collection is in

- ./postman-collection/cactro-assignment-collection

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **TypeScript** – Static typing
- **Zod** – Runtime schema validation
- **Docker** – Containerized development

---

## ⚙️ Setup Instructions

### ✅ With Docker

1. **Install Docker**:
   - [Docker for macOS](https://docs.docker.com/desktop/setup/install/mac-install/)
   - [Docker for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

2.**Clone the repo**

```bash
git clone https://github.com/fkk989/cactro-assignment.git
cd cactro-assignment
```

3. **Start Docker daemon** and run:

   ```bash
   docker compose up -d
   ```

### backend setup

#### copy enviroment varialbes from .env.example file

```bash
cp .env.example .env
```

- note: if you are not using docker you will need to modify `.env` as mentioned above in the pre requisite

#### Install dependencies

```bash
npm install
```

#### To start the server in dev mode

```bash
npm run dev
```

#### To start the server in prod mode

- build the project

```bash
npm run build
```

- start the project

```bash
npm run start
```

## 📘 API Endpoints

- Base Backend Url https://cactro-assignment-sexb.onrender.com
  > 🔐 All protected routes require a Bearer token in the Authorization header:  
  > `Authorization: Bearer <your-token>`

### 👤 User Routes

| Method | Endpoint           | Description     | Auth Required |
| ------ | ------------------ | --------------- | ------------- |
| POST   | `/api/user/signup` | Register a user | ❌            |
| POST   | `/api/user/login`  | Log in a user   | ❌            |
| GET    | `/api/user`        | Get user info   | ✅            |

#### 📥 Input Body for User Routes

**_SignUp Input_**

```json
{
  "name": "your name",
  "email": "your email",
  "password": "password"
}
```

**_LogIn Input_**

```json
{
  "email": "your email",
  "password": "password"
}
```

---

### 🧾 Task Routes

| Method | Endpoint        | Description             | Auth Required |
| ------ | --------------- | ----------------------- | ------------- |
| GET    | `/api/task`     | Get all tasks           | ✅            |
| POST   | `/api/task`     | Create a new task       | ✅            |
| PUT    | `/api/task/:id` | Update an existing task | ✅            |
| DELETE | `/api/task/:id` | Delete a task           | ✅            |

**_Task Input_**

- same Input is used for task creation and updation ( all fields are optional when updation task )

```json
{
  "title": "Title",
  "description": "Description",
  "status": "PENDING" // 'PENDING' | 'PROCESSING' | 'COMPLETED'
}
```
