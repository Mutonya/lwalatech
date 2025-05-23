# Commodity Request Management System

## Overview

This application provides a system for managing commodity requests from Community Health Workers (CHWs) and approvals by Community Health Assistants (CHAs). It includes a modern frontend, a backend with a documented API, and a PostgreSQL database.

---

## Running the Application

### 1. Start the Database

```bash
docker-compose up -d
```

### 2. Start the Backend

```bash
cd server
npm install
npm run dev
```

### 3. Start the Frontend

```bash
cd ../client
npm install
npm run dev
```

### 4. Access the Application

* Frontend: [http://localhost:5173](http://localhost:5173)
* API Docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## Portals

* **CHW Portal**: Submit commodity requests.
* **CHA Portal**: Approve or reject requests.

---

## Key Features Implemented

### Form Logic

* Auto-selection of CHA based on CHW
* Configurable commodity options
* Quantity validation (1-100)
* Daily and monthly request limits enforced

### Dashboard

* Visual representations of request statuses
* Commodity distribution charts
* Summary statistics for monitoring

### Professional Standards

* **TypeScript**: For type safety
* **React Query**: Data fetching and caching
* **Material UI**: UI components
* **React Hook Form**: Form handling and validation
* **Swagger**: API documentation
* **Separation of Concerns**: Modular, scalable architecture

### Database

* **PostgreSQL with Sequelize ORM**
* Relational data modeling (Users, Commodities, Requests)
* Validation at schema and ORM levels

---

## Core Components Based on Medic Mobile Architecture

### Mobile Clients

* Android app for CHWs (Cordova-based or similar)
* Offline-first with local storage
* Syncs data when online

### Sync Server

* Intermediary between mobile devices and cloud database
* Handles authentication, conflict resolution
* Manages secure sync operations

### Database Layer

* CouchDB (legacy) or PostgreSQL (current)
* Flexible, document-oriented or relational schemas
* Native replication and sync capabilities

### API Layer

* REST APIs with Swagger docs
* OAuth or JWT authentication

### Monitoring and Analytics

* Integrated logging
* Performance monitoring
* Basic analytics dashboard

---

## Key Architectural Characteristics

### 1. Current Architecture

* Mobile-first with offline support
* Sync-capable database layer (CouchDB or PostgreSQL)
* Modular, extensible system

### 2. Scaling Considerations

#### Technical

* Sharded database with regional replicas
* Sync protocol optimization
* Load balancing and containerization

#### Organizational

* Support county-specific workflows
* Device provisioning & training
* Role-based access control

### 3. Scaling Components

| Component   | Strategy                           |
| ----------- | ---------------------------------- |
| Database    | Shard by region, read replicas     |
| API Layer   | Dockerized, horizontally scaled    |
| Sync Server | Regional hubs, optimized protocols |
| Caching     | Redis for frequently accessed data |

### 4. Bottlenecks & Solutions

| Bottleneck            | Solution                       |
| --------------------- | ------------------------------ |
| Sync congestion       | Prioritize/stagger sync tasks  |
| Database write limits | Batch + async write processing |
| Poor network access   | Enhance offline functionality  |
| Device storage limits | Auto-purge old data            |

### 5. Proposed Enhancements

* **Edge Computing**: Local servers at county hubs
* **Microservices**: Split into user, commodity, sync services
* **Streaming Data Pipeline**: For real-time analytics
* **Advanced Monitoring**: Distributed observability tools

---

## Pilot Rollout: Migori County

* Assess local network/device capacity
* Customize flows for local language and needs
* Align with county health systems
* Plan for scaling to 3-5x user base
