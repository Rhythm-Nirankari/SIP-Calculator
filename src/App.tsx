import { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import { CalculatorForm } from './components/CalculatorForm';
import { Results } from './components/Results';
import { calculateSIP, calculateLumpsum, calculateYearlyBreakdown } from './utils/formulas';
import { GoalPlanner, GOALS } from './components/GoalTracker';
import { Sidebar } from './components/Sidebar';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import type { GoalType } from './components/GoalTracker';


function App() {
  const [mode, setMode] = useState<'SIP' | 'Lumpsum'>('SIP');
  const [investment, setInvestment] = useState<number>(5000);
  const [rate, setRate] = useState<number>(12);
  const [years, setYears] = useState<number>(10);
  const [stepUp, setStepUp] = useState<number>(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Goal Planner State
  const [selectedGoal, setSelectedGoal] = useState<GoalType>('car');
  const [targetAmount, setTargetAmount] = useState<number>(GOALS['car'].amount);
  const [inflationRate, setInflationRate] = useState<number>(6);

  const result = useMemo(() => {
    if (mode === 'SIP') {
      return calculateSIP(investment, rate, years, stepUp);
    } else {
      return calculateLumpsum(investment, rate, years);
    }
  }, [mode, investment, rate, years, stepUp]);

  const yearlyData = useMemo(() => {
    return calculateYearlyBreakdown(investment, rate, years, mode, stepUp);
  }, [mode, investment, rate, years, stepUp]);

  return (
    <div className="min-h-screen bg-[#111112] text-white py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1500px] mx-auto">

        {/* Header - Navigation/Actions */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1F1F20] border border-[#242425] hover:border-[#B2E5F9]/30 transition-all group"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Learn More</span>
            <div className="p-1.5 rounded-lg bg-[#B2E5F9]/10 group-hover:bg-[#B2E5F9]/20 transition-all">
              <Info className="w-4 h-4 text-[#B2E5F9]" />
            </div>
          </button>
        </div>

        {/* Hero Section Centered & Simplified */}
        <div className="mb-8 sm:mb-16 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            SIP <span className="gradient-text-blue">CALCULATOR</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Top Section: Calculator & Results */}
          <div className="lg:col-span-1 h-full">
            <CalculatorForm
              mode={mode}
              setMode={setMode}
              investment={investment}
              setInvestment={setInvestment}
              rate={rate}
              setRate={setRate}
              years={years}
              setYears={setYears}
              stepUp={stepUp}
              setStepUp={setStepUp}
            />
          </div>

          <div className="lg:col-span-2 h-full">
            <Results result={result} yearlyData={yearlyData} />
          </div>

          {/* Bottom Section: Unified Goal Planner */}
          <div className="lg:col-span-3">
            <GoalPlanner
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
              targetAmount={targetAmount}
              setTargetAmount={setTargetAmount}
              currentValue={result.totalValue}
              years={years}
              inflationRate={inflationRate}
              setInflationRate={setInflationRate}
            />
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-3">
            <FAQ />
          </div>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Footer />
    </div>
  );
}

export default App;
