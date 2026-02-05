export interface CalculationResult {
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
}

/**
 * Calculates SIP (Systematic Investment Plan) Returns
 * Formula: Uses iterative calculation for accuracy with Step-Up support
 * @param monthlyInvestment - Monthly investment amount (P)
 * @param annualRate - Annual interest rate in %
 * @param years - Investment duration in years
 * @param stepUpRate - Annual step up percentage (default 0)
 */
export const calculateSIP = (
    monthlyInvestment: number,
    annualRate: number,
    years: number,
    stepUpRate: number = 0
): CalculationResult => {
    const i = annualRate / 12 / 100; // Monthly interest rate

    let totalInvested = 0;
    let currentVal = 0;
    let currentMonthlyInv = monthlyInvestment;

    for (let year = 1; year <= years; year++) {
        for (let month = 1; month <= 12; month++) {
            totalInvested += currentMonthlyInv;
            currentVal = (currentVal + currentMonthlyInv) * (1 + i);
        }
        // Increase monthly investment at the end of each year for next year
        currentMonthlyInv += currentMonthlyInv * (stepUpRate / 100);
    }

    const estimatedReturns = currentVal - totalInvested;

    return {
        investedAmount: Math.round(totalInvested),
        estimatedReturns: Math.round(estimatedReturns),
        totalValue: Math.round(currentVal),
    };
};

/**
 * Calculates Lumpsum Returns
 * Formula: A = P(1 + r)^n
 * @param totalInvestment - One-time investment amount
 * @param annualRate - Annual interest rate in %
 * @param years - Investment duration in years
 */
export const calculateLumpsum = (
    totalInvestment: number,
    annualRate: number,
    years: number
): CalculationResult => {
    const r = annualRate / 100;

    if (r === 0) {
        return {
            investedAmount: totalInvestment,
            estimatedReturns: 0,
            totalValue: totalInvestment,
        };
    }

    const totalValue = totalInvestment * Math.pow(1 + r, years);
    const estimatedReturns = totalValue - totalInvestment;

    return {
        investedAmount: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        totalValue: Math.round(totalValue),
    };
};

export const calculateYearlyBreakdown = (
    monthlyInvestment: number,
    annualRate: number,
    years: number,
    mode: 'SIP' | 'Lumpsum',
    stepUpRate: number = 0
) => {
    const data = [];
    let currentInvested = 0;
    let currentVal = 0;

    if (mode === 'Lumpsum') {
        const r = annualRate / 100;
        currentInvested = monthlyInvestment; // In lumpsum mode, this arg is totalInvestment

        for (let year = 1; year <= years; year++) {
            const val = currentInvested * Math.pow(1 + r, year);
            data.push({
                year: `Year ${year}`,
                invested: Math.round(currentInvested),
                totalValue: Math.round(val),
                returns: Math.round(val - currentInvested)
            });
        }
    } else {
        // SIP with Step-Up
        const i = annualRate / 12 / 100;
        let currentMonthlyInv = monthlyInvestment;

        for (let year = 1; year <= years; year++) {
            for (let month = 1; month <= 12; month++) {
                currentInvested += currentMonthlyInv;
                currentVal = (currentVal + currentMonthlyInv) * (1 + i);
            }

            data.push({
                year: `Year ${year}`,
                invested: Math.round(currentInvested),
                totalValue: Math.round(currentVal),
                returns: Math.round(currentVal - currentInvested)
            });

            // Increase monthly investment for next year
            currentMonthlyInv += currentMonthlyInv * (stepUpRate / 100);
        }
    }

    return data;
};
