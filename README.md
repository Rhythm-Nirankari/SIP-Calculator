# SIP Calculator Assignment - Anuyog Software

## Overview
This is a modern, responsive SIP (Systematic Investment Plan) and Lumpsum Calculator built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**. It visualizes investment growth over time using **Recharts**.

## Features
- **Dual Mode**: Switch between SIP (Monthly) and Lumpsum (One-time) investments.
- **Step-Up SIP**: Optional feature to increase monthly investment annually by a fixed percentage.
- **Interactive Sliders**: Easy-to-use sliders for Amount, Interest Rate, Duration, and Step-Up Rate.
- **Goal Planner**: Gamified progress tracker to map investments against real-life goals (Car, House, etc.).
- **Real-time Visualization**:
    - **Pie Chart**: Shows the ratio of Invested Amount vs. Estimated Returns.
    - **Growth Chart**: Area chart displaying the wealth accumulation over the investment tenure.
- **Detailed Summary**: Instant calculation of Total Invested, Returns, and Maturity Value.
- **Compounding Logic**: Uses standard financial formulas to estimate returns.

## Tech Stack
- **Frontend Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide-React

## Setup Instructions
1. Clone the repository.
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Run the development server.
   ```bash
   npm run dev
   ```
4. Open the link shown in the terminal (usually `http://localhost:5173`).

## Logic Explanation
### SIP Formula
The calculator uses the standard formula for the future value of an annuity due:
```
M = P × ({[1 + i]^n - 1} / i) × (1 + i)
```
Where:
- `P`: Monthly Investment Amount
- `i`: Monthly Interest Rate (Annual Rate / 12 / 100)
- `n`: Total Number of Payments (Years * 12)

### Lumpsum Formula
For one-time investments, the compound interest formula is used:
```
A = P(1 + r)^n
```
Where:
- `P`: Principal Amount
- `r`: Annual Interest Rate (Rate / 100)
- `n`: Time in Years

## Assumptions
- Compounding happens monthly for SIP and annually for Lumpsum (Standard market convention for calculators).
- The inflation rate is not considered in the "Estimated Returns".

## Developer
Developed for the Frontend Developer Role assignment at Anuyog Software.
