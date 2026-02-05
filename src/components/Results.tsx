import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { InfoTooltip } from './InfoTooltip';

interface CalculationResult {
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
}

interface ResultsProps {
    result: CalculationResult;
    yearlyData: any[];
}

const ValueWithTooltip: React.FC<{ value: string; displayValue: string; className: string; tooltipBg?: string; tooltipText?: string }> = ({
    value,
    displayValue,
    className,
    tooltipBg = "bg-[#1F1F20]",
    tooltipText = "text-white"
}) => (
    <div className="group relative inline-block">
        <span className={className}>{displayValue}</span>
        <div className={`absolute left-1/2 bottom-full mb-3 px-4 py-2 ${tooltipBg} border border-[#242425] rounded-2xl text-sm font-bold ${tooltipText} shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[9999] transform -translate-x-1/2 translate-y-0 group-hover:-translate-y-3`}>
            {value}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent transition-colors duration-300 ${tooltipBg.includes('bg-[#B2E5F9]') ? 'border-t-[#B2E5F9]/70' :
                tooltipBg.includes('bg-[#1F1F20]/70') ? 'border-t-[#1F1F20]/70' :
                    tooltipBg.includes('bg-[#050a47b3]') ? 'border-t-[#050a47b3]' : 'border-t-[#1F1F20]'
                }`}></div>
        </div>
    </div>
);

export const Results: React.FC<ResultsProps> = ({ result, yearlyData }) => {
    /* Finexa Colors */
    const COLORS = ['#818CF8', '#B2E5F9']; // Invested (Indigo) & Returns (Sky Blue)

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const formatSmartCurrency = (val: number) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        return formatCurrency(val);
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const isPie = !label;
            return (
                <div className="p-4 rounded-3xl border border-[#242425] shadow-2xl bg-[#1F1F20]/90 backdrop-blur-xl">
                    {!isPie && <p className="text-white/70 text-[13px] font-bold uppercase tracking-widest mb-3">Year {label}</p>}
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 mb-2 min-w-[140px]">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.payload.fill }}></div>
                            <span className="text-[12px] font-bold uppercase tracking-[0.1em]" style={{ color: entry.color || entry.payload.fill }}>{entry.name}</span>
                            <span className="text-sm font-bold text-white ml-auto">{formatCurrency(entry.value)}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 h-full flex flex-col">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-8 min-h-[160px] flex flex-col justify-between bg-[#1F1F20]">
                    <p className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                        <InfoTooltip text="Total principal amount you have committed to this investment over the period.">
                            Invested Amount
                        </InfoTooltip>
                    </p>
                    <ValueWithTooltip
                        value={formatCurrency(result.investedAmount)}
                        displayValue={formatSmartCurrency(result.investedAmount)}
                        className="text-2xl sm:text-3xl font-bold text-[#818CF8] tracking-tight"
                        tooltipBg="bg-[#B2E5F9]/70"
                        tooltipText="text-white"
                    />
                </div>

                <div className="glass-card p-8 min-h-[160px] flex flex-col justify-between bg-[#1F1F20]">
                    <p className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                        <InfoTooltip text="The net profit or interest earned on your principal amount.">
                            Wealth Gained
                        </InfoTooltip>
                    </p>
                    <ValueWithTooltip
                        value={formatCurrency(result.estimatedReturns)}
                        displayValue={formatSmartCurrency(result.estimatedReturns)}
                        className="text-2xl sm:text-3xl font-bold text-[#B2E5F9] drop-shadow-[0_0_12px_rgba(178,229,249,0.3)] tracking-tight"
                        tooltipBg="bg-[#B2E5F9]/70"
                        tooltipText="text-white"
                    />
                </div>

                <div className="glass-card p-0 mesh-gradient relative min-h-[180px] flex flex-col overflow-visible">
                    <div className="p-8 relative z-10 w-full h-full flex flex-col justify-between flex-1">
                        <div className="flex items-center justify-between">
                            <p className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                                <InfoTooltip text="The final projected value of your investment including principal and interest.">
                                    Total Balance
                                </InfoTooltip>
                            </p>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center gap-1">
                                <ValueWithTooltip
                                    value={formatCurrency(result.totalValue)}
                                    displayValue={formatSmartCurrency(result.totalValue)}
                                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter"
                                    tooltipBg="bg-[#1F1F20]/70"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                {/* Pie Chart */}
                <div className="glass-card p-8">
                    <h3 className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                        <InfoTooltip text="Visual breakdown of your principal investment vs the returns generated.">
                            Asset Allocation
                        </InfoTooltip>
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Invested', value: result.investedAmount },
                                        { name: 'Returns', value: result.estimatedReturns },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    cornerRadius={6}
                                >
                                    <Cell fill={COLORS[0]} stroke="transparent" />
                                    <Cell fill={COLORS[1]} stroke="transparent" />
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value, entry) => <span className="text-[15px] font-bold uppercase tracking-[0.2em] ml-2" style={{ color: entry.color }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Growth Chart */}
                <div className="glass-card p-8">
                    <h3 className="text-[15px] font-bold text-white/95 uppercase tracking-[0.2em] mb-10 flex items-center">
                        <InfoTooltip text="Year-on-year projection showing how your wealth grows over time due to compounding.">
                            Growth Trajectory
                        </InfoTooltip>
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={yearlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#B2E5F9" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#B2E5F9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#242425" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    stroke="#ffffffcc"
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="Urbanist"
                                />
                                <YAxis
                                    stroke="#ffffffcc"
                                    fontSize={11}
                                    tickFormatter={(value) => {
                                        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
                                        if (value >= 100000) return `₹${(value / 100000).toFixed(0)} L`;
                                        return `₹${value}`;
                                    }}
                                    tickLine={false}
                                    axisLine={false}
                                    fontFamily="Urbanist"
                                />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="totalValue"
                                    stroke="#B2E5F9"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="invested"
                                    stroke="#818CF8"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    fill="none"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
