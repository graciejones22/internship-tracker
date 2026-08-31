# Internship Application Tracker

A responsive web application for organizing and tracking internship applications throughout the recruiting process.

## Overview

The Internship Application Tracker was built to make it easier to keep track of internship opportunities in one place. Users can add applications, update their status, search and filter their applications, sort them by different criteria, and monitor their overall application progress through a dashboard.

The application stores data locally in the browser so that application information remains available after refreshing the page.

## Features

- Add internship applications
- Edit existing applications
- Delete applications
- Track application status
- Search applications by company or position
- Filter applications by status
- Sort applications by:
  - Newest application
  - Oldest application
  - Company name
  - Deadline
- Store job posting links
- Dashboard statistics
- Application status visualization
- Persistent data using browser localStorage
- Responsive design for desktop and mobile devices

## Technologies

- React
- TypeScript
- Vite
- Recharts
- CSS
- localStorage
- Git & GitHub

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/graciejones22/internship-tracker.git
```
Navigate to the project directory:
```bash
cd internship-tracker
```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
Open the local development URL provided by Vite in your browser.

### How It Works

Applications are stored in the browser using localStorage. React state is used to manage the application data and update the dashboard whenever applications are added, edited, or deleted.

The application list can be dynamically filtered based on application status and searched by company or position. Applications can also be sorted according to different criteria.

The dashboard calculates application statistics from the stored application data and displays the distribution of applications by status using a bar chart.

### What I Learned

## Through this project, I practiced:

- Building reusable React components
- Managing state with React hooks
- Working with TypeScript interfaces and types
- Handling forms and user input
- Filtering and sorting arrays of objects
- Persisting data with localStorage
- Creating data visualizations with Recharts
- Designing responsive layouts with CSS
- Debugging React and TypeScript errors
- Using Git for incremental version control
- Deploying a web application

### Future Improvements

## Potential future versions could include:

- A backend database
- User authentication
- Cloud data synchronization
- Calendar integration
- Application reminders
- Additional analytics
- Project Development

This project was developed incrementally using Git and GitHub, with separate commits for major functionality and design improvements.

## Key development milestones included:

- Initial dashboard and application form
- Application cards
- Edit and delete functionality
- Status filtering
- Dashboard status overview
- Application status chart
- Search and sorting
- Responsive styling and UI polish

### Author

Grace Jones
Computer Science (Software Development)
Siena University
