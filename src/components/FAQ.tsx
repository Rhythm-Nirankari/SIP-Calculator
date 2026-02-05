import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
    {
        question: "Can I increase my SIP amount later?",
        answer: "Yes. You can increase your SIP anytime as your income grows. This is often called a Step-Up SIP. Even increasing your investment by 5–10% every year can significantly improve long-term results without putting pressure on your monthly budget."
    },
    {
        question: "What happens if I stop my SIP midway?",
        answer: "If you stop your SIP, your already invested money will remain invested and can continue to grow based on market performance. However, stopping early means you miss future contributions and the strongest phase of compounding. SIP works best when continued for the full planned duration."
    },
    {
        question: "Is SIP risky?",
        answer: "SIP investments are market-linked, so short-term ups and downs are normal. However, SIP reduces risk by spreading investments over time instead of investing everything at once. The longer you stay invested, the smoother the journey usually becomes."
    },
    {
        question: "How much should I invest every month?",
        answer: "Start with an amount that feels comfortable and does not affect your daily expenses. Even ₹500 or ₹1,000 is enough to begin. You can increase your SIP later as your income grows. Consistency matters more than starting with a large amount."
    },
    {
        question: "What is the impact of inflation on my goals?",
        answer: "Inflation reduces the purchasing power of money over time. This means ₹10 lakhs today may not have the same value after 10 or 20 years. Investing through SIP helps your money grow faster than inflation, making it easier to achieve future financial goals."
    },
    {
        question: "Does this calculator guarantee returns?",
        answer: "No. This calculator provides estimated results based on expected returns. Actual market performance may vary. This tool is designed to help with planning and understanding long-term growth, not to predict exact returns."
    },
    {
        question: "When is the best time to start SIP?",
        answer: "The best time to start is as early as possible. If not today, then tomorrow. Time in the market matters more than trying to find the perfect time to invest."
    }
];

export const FAQ: React.FC = () => {
    const [isSectionExpanded, setIsSectionExpanded] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="glass-card p-6 space-y-1">
            <button
                onClick={() => setIsSectionExpanded(!isSectionExpanded)}
                className="w-full flex items-center justify-between border-b border-[#242425] pb-4 group transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-2xl border transition-all duration-500 ${isSectionExpanded ? 'bg-[#B2E5F9]/20 border-[#B2E5F9]/40' : 'bg-white/5 border-white/10 group-hover:border-[#B2E5F9]/40'}`}>
                        <HelpCircle className={`w-5 h-5 transition-colors ${isSectionExpanded ? 'text-[#B2E5F9]' : 'text-white/40 group-hover:text-white'}`} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Frequently Asked Questions</h2>
                    </div>
                </div>
                <div className={`transition-transform duration-500 ${isSectionExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className={`w-5 h-5 ${isSectionExpanded ? 'text-[#B2E5F9]' : 'text-white/20'}`} />
                </div>
            </button>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 overflow-hidden transition-all duration-700 ${isSectionExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 space-y-0 pb-0 mt-0 pt-0'}`}>
                {FAQ_ITEMS.map((item, index) => (
                    <div
                        key={index}
                        className={`group border-b border-[#242425] last:border-0 transition-all duration-300 ${openIndex === index ? 'pb-4' : 'pb-2'
                            }`}
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between py-2 text-left transition-all"
                        >
                            <span className={`text-[15px] font-bold tracking-tight transition-colors ${openIndex === index ? 'text-[#B2E5F9]' : 'text-white/80 group-hover:text-white'
                                }`}>
                                {item.question}
                            </span>
                            <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-[#B2E5F9]' : 'text-white/20'
                                }`} />
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                            }`}>
                            <p className="text-sm text-white/50 leading-relaxed font-medium pl-1 border-l-2 border-[#B2E5F9]/20 ml-1">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
