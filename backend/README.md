# HDP Map Engine Pro - Backend

Express.js API with SQLite database.

## Architecture
- **Repository Pattern** - Data access abstraction
- **Service Layer** - Business logic
- **Controller Layer** - HTTP request handling
- **Route Layer** - API endpoint definitions

## Modules
All modules follow the same layered architecture:
```
modules/[name]/
├── index.js      - module entry
├── routes.js     - Express routes
├── service.js    - business logic
└── controller.js - HTTP handlers
```

Traffic module has additional repositories:
```
modules/traffic/
├── routes/
├── services/
├── controllers/
└── repositories/
```

## Run
```bash
npm install
npm run seed   # create DB + seed data
npm run dev    # development with nodemon
npm start      # production
```
