# Kambaz Node Server

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

> **Live API →** <https://kambaz-node-server-app-tgaq.onrender.com>

REST API backend for **Kambaz** — a full-stack Learning Management System built for Northeastern University's CS5610 Web Development course.

## Features

- Session-based authentication (signup, signin, signout, profile)
- Full CRUD for Courses, Modules, Assignments, and Enrollments
- DAO pattern with in-memory data store — zero database setup required
- Typed from the ground up with TypeScript strict mode
- CORS-ready for local frontend development
- Seeded with realistic sample data out of the box

## Tech Stack

| Layer      | Technology                 |
|------------|----------------------------|
| Runtime    | Node.js 22                 |
| Language   | TypeScript 5 (strict)      |
| Framework  | Express 5                  |
| Sessions   | express-session            |
| Dev runner | tsx (zero-config ESM + TS) |
| ID gen     | uuid v4                    |

## Local Development

```bash
git clone https://github.com/anurag-bg-neu/kambaz-node-server-app.git
cd kambaz-node-server-app
npm install

# create .env from the table below, then:
npm run dev          # tsx watch index.ts — hot reload on http://localhost:4000
```

> Requires Node.js 18+ and [Kambaz Client](https://github.com/anurag-bg-neu/kambaz-next-js) running on `http://localhost:3000`.

## Production Deployment

Deployed on **Render** (free tier) at <https://kambaz-node-server-app-tgaq.onrender.com>. On each push to `main`, Render runs:

| Step  | Command                      |
|-------|------------------------------|
| Build | `npm install`                |
| Start | `npm start` → `tsx index.ts` |

> Free-tier instances spin down after inactivity — first request may take ~50 s to cold-start.

## Environment Variables

Copy `.env` and adjust as needed:

| Variable                     | Default                            | Description                      |
|------------------------------|------------------------------------|----------------------------------|
| `PORT`                       | `4000`                             | Server port                      |
| `CLIENT_URL`                 | `http://localhost:3000`            | Allowed CORS origin              |
| `SESSION_SECRET`             | `kambaz`                           | express-session secret           |
| `SERVER_ENV`                 | `development`                      | `development` skips HTTPS cookie |
| `SERVER_URL`                 | —                                  | Cookie domain (production)       |
| `DATABASE_CONNECTION_STRING` | `mongodb://127.0.0.1:27017/kambaz` | Database Connection URI          |

## API Reference

### Auth — `/api/users`

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| POST   | `/api/users/signup`  | Register a new user         |
| POST   | `/api/users/signin`  | Sign in                     |
| POST   | `/api/users/signout` | Sign out (destroys session) |
| POST   | `/api/users/profile` | Get current session user    |
| PUT    | `/api/users/:userId` | Update user profile         |

### Courses — `/api/courses`

| Method | Endpoint                     | Description                         |
|--------|------------------------------|-------------------------------------|
| GET    | `/api/courses`               | List all courses                    |
| GET    | `/api/users/:userId/courses` | Courses enrolled by a user          |
| POST   | `/api/users/current/courses` | Create course & auto-enroll creator |
| PUT    | `/api/courses/:courseId`     | Update course                       |
| DELETE | `/api/courses/:courseId`     | Delete course                       |

### Modules — `/api/courses/:courseId/modules`

| Method | Endpoint                         | Description   |
|--------|----------------------------------|---------------|
| GET    | `/api/courses/:courseId/modules` | List modules  |
| POST   | `/api/courses/:courseId/modules` | Create module |
| PUT    | `/api/modules/:moduleId`         | Update module |
| DELETE | `/api/modules/:moduleId`         | Delete module |

### Assignments — `/api/courses/:courseId/assignments`

| Method | Endpoint                             | Description       |
|--------|--------------------------------------|-------------------|
| GET    | `/api/courses/:courseId/assignments` | List assignments  |
| POST   | `/api/courses/:courseId/assignments` | Create assignment |
| PUT    | `/api/assignments/:assignmentId`     | Update assignment |
| DELETE | `/api/assignments/:assignmentId`     | Delete assignment |

### Enrollments — `/api/users/:userId/enrollments`

| Method | Endpoint                                   | Description      |
|--------|--------------------------------------------|------------------|
| GET    | `/api/users/:userId/enrollments`           | List enrollments |
| POST   | `/api/users/:userId/enrollments`           | Enroll in course |
| DELETE | `/api/users/:userId/enrollments/:courseId` | Unenroll         |

## Project Structure

```text
kambaz-node-server-app/
├── index.ts                  # App entry — middleware & route mounting
├── Hello.ts                  # Health-check routes
├── Kambaz/
│   ├── types.ts              # Shared TypeScript interfaces
│   ├── Database/             # Seeded in-memory data
│   ├── Users/                # Auth — dao.ts + routes.ts
│   ├── Courses/              # Courses — dao.ts + routes.ts
│   ├── Modules/              # Modules — dao.ts + routes.ts
│   ├── Assignments/          # Assignments — dao.ts + routes.ts
│   └── Enrollments/          # Enrollments — dao.ts + routes.ts
├── Lab5/                     # Educational lab exercises (path params, arrays, objects)
├── tsconfig.json
└── package.json
```

## Scripts

```bash
npm run dev      # tsx watch — hot reload
npm run start    # tsx — production-like run
npm run build    # tsc --noEmit — type check only
```

## License

MIT © [Anurag Bheemappa Gnanamurthy](https://github.com/anurag-bg-neu)
