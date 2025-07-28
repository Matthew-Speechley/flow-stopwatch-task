# Flow Stopwatch Task

A clean and functional stopwatch application built with React and TypeScript.

## Features

- Start/pause/lap/reset timer functionality
- Scrollable lap time list and csv download functionality
- Modern and clean UI design with light/dark mode (using flow color scheme)
- Responsive layout

## Chess mode!

- Two timers in a chess clock format, allowing you to accumulate time on two timers alternatively.
- Chess clock svg decoration indicating active timer.

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules for styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Matthew-Speechley/flow-stopwatch-task.git
cd flow-stopwatch-task
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Feature Wish List

- I didn't have time to make the chess button interactive unfortunately.
- Also, if the app was to get any more complex, a global context to share states like isRunning and shouldResetChessTimers would be useful, rather than the current prop drilling. I would use useReducer / useContext for this.
