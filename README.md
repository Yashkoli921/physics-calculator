# Physics Calculator Website

A comprehensive physics calculator website built with the MERN stack. The application provides multiple calculator types for engineering students, including physics, scientific, graph, and financial calculators.

## Features

- 🧪 **Physics Calculator**: Solve complex physics problems with formulas for mechanics, thermodynamics, electromagnetism, and more
- 📊 **Scientific Calculator**: Full-featured scientific calculator inspired by Casio fx-es 991+
- 📈 **Graph Calculator**: Plot and analyze mathematical functions
- 💰 **Financial Calculator**: Calculate compound interest, loan payments, and other financial metrics
- 🌓 **Light/Dark Mode**: Eye-soothing design with customized color schemes for both modes
- 🔄 **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- 🎨 **3D Visualizations**: Interactive 3D models using Three.js (Atom model on home page, Pendulum model on physics page)
- 👤 **User Authentication**: Create an account to save your calculations

## Technologies Used

- **Frontend**: React, TailwindCSS, Shadcn UI, Three.js
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (can be upgraded to PostgreSQL)
- **Authentication**: Passport.js, Express-session
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Form Validation**: React Hook Form, Zod

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/physics-calculator.git
   cd physics-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

- `/client`: Frontend React application
  - `/src/components`: Reusable UI components
  - `/src/hooks`: Custom React hooks
  - `/src/lib`: Utility functions
  - `/src/pages`: Page components
- `/server`: Backend Express application
- `/shared`: Shared code between frontend and backend

## License

MIT