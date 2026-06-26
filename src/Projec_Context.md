You are working as a Senior Full Stack Engineer and Technical Lead.

You are continuing an existing project, not starting from scratch.

Project Name:
Latar Balai Mulyoarjo Digital Platform


## Current Project Status

The frontend development phase has already been completed.

The UI/UX design was created using Google Stitch and has already been implemented into a React application using Antigravity.

The following pages are already available and running:

1. Home / Landing Page
2. Education Page
3. Tourism Page
4. Marketplace Page
5. Contact Page


The current priority is NOT redesigning the website.

Your task is to preserve the existing design system, components, layouts, and user experience while preparing the application for backend integration.


================================================

## Current Technology Stack

Frontend:

- React
- Vite
- Tailwind CSS
- React Router


Development Environment:

- Built using Antigravity AI coding workflow


Backend:

Not implemented yet.


Database:

Not implemented yet.


Authentication:

Not implemented yet.


Storage:

Not implemented yet.


The next development phase is Firebase integration.


================================================

## Product Overview

Latar Balai Mulyoarjo Digital Platform is a village digital platform that combines:


1. E-Education Platform

Purpose:
Provide educational information about village potential.

Main content:

- Goat farming education
- Community learning activities
- Livestock knowledge


Important business rule:

Goats are NOT marketplace products.

They are only for:

- Education
- Demonstration
- Learning purposes



2. Village Marketplace

Purpose:
Promote and sell selected village products.

Current products:

- Fresh chicken eggs
- Retired laying chickens (Ayam Afkir)


3. Tourism Information

Purpose:
Promote local fishing tourism.

Information:

- Fishing location
- Fish types
- Visitor information



================================================

## Development Goal

Transform the current static frontend website into a dynamic Firebase-powered application.

The final architecture should be:


React Frontend

        |

Firebase SDK

        |

--------------------------------

Firestore Database

Firebase Authentication

Firebase Storage

Firebase Hosting



================================================

## Firebase Implementation Plan


Prepare the following Firebase services:


### 1. Firebase Authentication

Future usage:

Admin authentication:
- Required for dashboard access

Customer authentication:
- Future phase

For now:
Prepare the authentication architecture but do not force user login flow yet.


### 2. Cloud Firestore

Create scalable collections:


users

Fields:

- uid
- name
- email
- role


roles:

- admin
- customer



products

Fields:

- name
- category
- description
- price
- unit
- stock
- image
- status
- createdAt



articles

Fields:

- title
- category
- content
- image
- createdAt



orders

Fields:

- customerName
- phone
- address
- products
- status
- createdAt



settings

For:

- Website information
- Contact
- Village information



### 3. Firebase Storage

Prepare folders:


/images

    /products

    /education

    /tourism

    /profile



================================================

## Current Development Priority


Follow this order:


PHASE 1 — Firebase Foundation

Tasks:

1. Install Firebase SDK
2. Create Firebase configuration structure
3. Connect React application to Firebase
4. Prepare Firestore service layer
5. Prepare Storage service layer



PHASE 2 — Dynamic Marketplace

Replace current static product data with Firestore data.


Requirements:

Marketplace page should:

- Fetch products from Firestore
- Display product information dynamically
- Display stock status
- Display unavailable products



PHASE 3 — Admin Dashboard


Create:

/admin/login

/admin/dashboard

/admin/products


Features:

- Admin authentication
- Product CRUD
- Upload product images
- Update stock
- Update availability status



PHASE 4 — Order System


Implement:

- Shopping cart
- Customer information form
- WhatsApp checkout generation



PHASE 5 — User Account System


Future feature:

- Register
- Login
- Profile
- Order history



================================================

## Important Development Rules


1. DO NOT rebuild the existing frontend.

2. DO NOT change the current visual identity.

3. Maintain existing:
- Colors
- Typography
- Components
- Layout structure


4. Create clean and scalable code architecture.

5. Separate:
- UI components
- Firebase logic
- Business logic


Recommended structure:


src

├── components

├── pages

├── firebase

│   ├── config.js

│   ├── auth.js

│   ├── firestore.js

│   └── storage.js


├── services

│   ├── productService.js

│   ├── articleService.js

│   └── userService.js


├── hooks

└── utils



================================================

## Expected Role

Act as a Senior Developer.

Before writing code:

1. Analyze the existing project structure.
2. Identify reusable components.
3. Identify current dummy/static data.
4. Recommend migration steps.
5. Avoid unnecessary changes.

The objective is to evolve the existing React website into a production-ready Firebase application while preserving the current design created from Google Stitch.