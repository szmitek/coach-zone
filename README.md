# Coach Zone
Coach Zone is a web application that allows coaches to manage their team's players, exercises, and training schedule.

## Features
* Players: coaches can view, add, update, and delete players in their team. Each player has a name, position, number, strengths, weaknesses, description, and photo.
* Exercises: coaches can view, add, update, and delete exercises in their training plan. Each exercise has a name, position, description, and photo.
* Training: coaches can view, add, update, and delete training sessions. Each session consists of a date, a list of exercises, and notes.
* Calendar: Coaches can view and add their events like trainings or matches added to calendar.
* Stopwatch: Coaches can instantly set a countdown for how long an drill should last.
## Prerequisites
* Node.js and npm
* A GraphQL API endpoint (provided by the backend server)
## Getting Started
1. Clone the repository: git clone https://github.com/szmitek/coach-zone.git
2. Go to the root directory: cd coach-zone
3. Install the dependencies: npm install
4. Start the backend and frontend servers: npm start
5. Open a web browser and go to http://localhost:7777
## Structure
* The project consists of a frontend (in the frontend directory) and a backend (in the backend directory).

* The frontend is a Next.js application that uses Apollo Client to communicate with the GraphQL API. It is built with React, TypeScript, and styled-components.

* The backend is a GraphQL server that uses Prisma to store and retrieve data from a database. It is built with Node.js, TypeScript, and GraphQL.

* The backend server will be running on port 3000 and the frontend client will be running on port 7777.

## Tech Stack
* Frontend: React, Next.js, Apollo Client, GraphQL, styled-components
* Backend: Node.js, Apollo Server, GraphQL, MongoDB
