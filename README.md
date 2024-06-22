# Healthcare Benefits Management Application

## Description

This project is a frontend application for managing healthcare benefits packages for employees. The application allows users to add, edit, and view employees and their dependents, as well as calculate the cost of healthcare benefits per paycheck.


### Prerequisites

Before running the project, make sure you have the following tools installed:

- Node.js (version 19.x or higher)
- pnpm (version 6.x or higher)

## 🔧  Install & Use

```
pnpm install
pnpm  dev # For development
pnpm build && pnpm preview # For production preview
```

### Project Structure 

```sh
healthcare-benefits-management/
├── public/                     # Static assets
├── src/                        # Source code
│   ├── app/                    # Application entry point and routing
│   ├── components/             # Reusable UI components
│   ├── entities/               # Business entities and logic
│   │   └── Employee/           # Employee-related components and logic
│   │       ├── EmployeeCard.tsx
│   │       ├── EmployeeForm.tsx
│   │       ├── EmployeeList.tsx
│   │       └── employeeUtils.ts
│   ├── features/               # Application features/screens
│   │   ├── HOME/               # Home screen feature
│   │   │   └── HomeScreen.tsx
│   │   ├── Employees/          # Employees screen feature
│   │   │   └── EmployeesScreen.tsx
│   │   └── NotFound/           # NotFound screen feature
│   │       └── NotFoundScreen.tsx
│   └── shared/                 # Shared utilities, hooks, and state management
│       ├── api/                # API calls and state management
│       │   ├── employeeAPI.ts
│       │   └── state/
│       │       └── employees.ts
│       ├── hooks/              # Custom hooks
│       │   └── useEmployees.ts
│       └── ui/                 # Shared UI components
│           ├── form.tsx
│           ├── input.tsx
│           ├── button.tsx
│           ├── loading.tsx
│           └── use-toast.tsx
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── package.json                # Project metadata and scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── README.md                   # Project documentation
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration

```

##  📦  Architectural Decision Document

### Introduction

This document outlines the architectural decisions made for the Healthcare Benefits Management Application.

## Technology Stack
- React: For building the user interface.
- TypeScript: For static type checking.
- Vite: As the build tool.
- Recoil: For state management.
- Tailwind CSS: For styling.
- pnpm: For package management.

## Key Architectural Decisions
- Component-Based Architecture: The application is structured around reusable components to promote modularity and maintainability.

## Feature-Sliced Design (FSD):

### Why FSD?
- Feature-Sliced Design (FSD) was chosen as the architectural pattern for organizing the project's structure. FSD helps in structuring a project by feature rather than by technical concern. This makes the project more scalable, maintainable, and easier to navigate.

### Benefits of FSD:
- Modularity: Features are encapsulated, making it easy to understand and work on individual parts of the application without affecting others.
- Scalability: As the application grows, new features can be added with minimal impact on existing code.
- Maintainability: Clear separation of concerns allows for easier updates and debugging.
- Team Collaboration: Different teams or developers can work on separate features simultaneously without much conflict.
- Improved Code Reusability: Components, hooks, and logic specific to a feature are grouped together, facilitating reuse across the project.
- State Management with Recoil: Recoil is used for state management to handle the global state of employees and other shared states. This allows for easy sharing of state across components.
- React Hook Form for Forms: React Hook Form, integrated with zod for schema validation, is used for handling form state and validation. This simplifies form handling and ensures data integrity.
- Vite for Building: Vite is chosen as the build tool for its performance benefits and seamless integration with modern front-end frameworks.
- Persisting State with Recoil Persist: To ensure that changes made by the user are saved and reflected upon subsequent page loads, Recoil Persist is used to persist the state in local storage.
- Custom Hooks for Separation of Concerns: Custom hooks such as useEmployees are used to encapsulate logic related to specific functionality, promoting separation of concerns and reusability.