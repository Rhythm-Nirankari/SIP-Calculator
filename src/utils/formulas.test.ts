import { describe, it, expect } from 'vitest';
import { calculateSIP, calculateLumpsum, calculateYearlyBreakdown } from './formulas';

describe('Financial Calculator Logic', () => {

    describe('calculateLumpsum', () => {
        it('should calculate correct returns for basic scenario', () => {
            // 1L invested, 10% annual return, 1 year
            // Expected: 100000 * (1 + 0.10)^1 = 110000
            const result = calculateLumpsum(100000, 10, 1);
            expect(result.investedAmount).toBe(100000);
            expect(result.totalValue).toBe(110000);
            expect(result.estimatedReturns).toBe(10000);
        });

        it('should handle longer durations correctly', () => {
            // 10k, 12%, 10 years
            // 10000 * (1.12)^10 = 31058.48... -> 31058
            const result = calculateLumpsum(10000, 12, 10);
            expect(result.investedAmount).toBe(10000);
            // Allow small rounding differences
            expect(result.totalValue).toBeGreaterThan(31050);
            expect(result.totalValue).toBeLessThan(31065);
        });

        it('should return initial amount if rate is 0', () => {
            const result = calculateLumpsum(50000, 0, 5);
            expect(result.totalValue).toBe(50000);
            expect(result.estimatedReturns).toBe(0);
        });
    });

    describe('calculateSIP (Basic)', () => {
        it('should calculate correct returns for basic SIP', () => {
            // 5000/mo, 12% p.a., 1 year
            // Invested: 60000
            // Monthly rate i = 1% = 0.01
            // FV = 5000 * [((1.01)^12 - 1)/0.01] * 1.01
            // FV ≈ 5000 * 12.6825 * 1.01 ≈ 64047 approx
            const result = calculateSIP(5000, 12, 1);

            expect(result.investedAmount).toBe(60000);
            expect(result.totalValue).toBeGreaterThan(64000);
            expect(result.totalValue).toBeLessThan(64100);
        });

        it('should accumulate correctly over 5 years', () => {
            // 1000/mo, 10% p.a., 5 years (60 months)
            const result = calculateSIP(1000, 10, 5);
            expect(result.investedAmount).toBe(60000); // 1000 * 12 * 5
            // Standard calculator check: ~78,082
            expect(result.totalValue).toBeGreaterThan(78000);
            expect(result.totalValue).toBeLessThan(78150);
        });
    });

    describe('calculateSIP (Step-Up)', () => {
        it('should handle step-up correctly', () => {
            // 5000/mo, 12%, 2 years, 10% step-up
            // Year 1: 5000 * 12 = 60000 invested
            // Year 2: 5500 * 12 = 66000 invested
            // Total Invested: 126000
            const result = calculateSIP(5000, 12, 2, 10);

            expect(result.investedAmount).toBe(126000);

            // Expected Value calculation is complex, but should be > basic SIP
            const basicSIP = calculateSIP(5000, 12, 2, 0);
            expect(result.totalValue).toBeGreaterThan(basicSIP.totalValue);
        });
    });

    describe('calculateYearlyBreakdown', () => {
        it('should generate correct number of data points', () => {
            const data = calculateYearlyBreakdown(5000, 12, 10, 'SIP');
            expect(data).toHaveLength(10);
            expect(data[0].year).toBe('Year 1');
            expect(data[9].year).toBe('Year 10');
        });

        it('should accurately track invested amount in Lumpsum breakdown', () => {
            const data = calculateYearlyBreakdown(100000, 12, 5, 'Lumpsum');
            // Invested amount should stay constant for lumpsum
            data.forEach(point => {
                expect(point.invested).toBe(100000);
            });
            // Value should increase every year
            expect(data[4].totalValue).toBeGreaterThan(data[0].totalValue);
        });

        it('should accurately track invested amount in SIP breakdown', () => {
            const data = calculateYearlyBreakdown(1000, 12, 5, 'SIP');
            // Year 1 invested: 12000
            expect(data[0].invested).toBe(12000);
            // Year 5 invested: 60000 (assuming no step up)
            expect(data[4].invested).toBe(60000);
        });
    });

    describe('Edge Cases: Maximum Values', () => {
        it('should handle maximum SIP values without overflow', () => {
            // Max monthly: 100000, max rate: 30%, max years: 40
            const result = calculateSIP(100000, 30, 40);
            expect(result.investedAmount).toBe(100000 * 12 * 40); // 48M
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.estimatedReturns).toBeGreaterThan(0);
        });

        it('should handle maximum Lumpsum values without overflow', () => {
            // Max investment: 10M, max rate: 30%, max years: 40
            const result = calculateLumpsum(10000000, 30, 40);
            expect(result.investedAmount).toBe(10000000);
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.estimatedReturns).toBeGreaterThan(0);
        });

        it('should handle maximum step-up (50%) over long period', () => {
            // 100K monthly, 30% rate, 40 years, 50% step-up
            const result = calculateSIP(100000, 30, 40, 50);
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            // With step-up, invested should be much higher than basic
            const basicSIP = calculateSIP(100000, 30, 40, 0);
            expect(result.investedAmount).toBeGreaterThan(basicSIP.investedAmount);
        });
    });

    describe('Edge Cases: Negative Values', () => {
        it('should handle negative investment in SIP', () => {
            const result = calculateSIP(-5000, 12, 5);
            // Negative investment should still calculate (though not realistic)
            expect(result.investedAmount).toBeLessThan(0);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle negative investment in Lumpsum', () => {
            const result = calculateLumpsum(-100000, 12, 5);
            expect(result.investedAmount).toBe(-100000);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle negative rate', () => {
            // Negative rate means losing money
            const result = calculateLumpsum(100000, -5, 5);
            expect(result.totalValue).toBeLessThan(result.investedAmount);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle negative years gracefully', () => {
            // Negative years is invalid, but shouldn't crash
            const result = calculateSIP(5000, 12, -5);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle negative step-up', () => {
            // Negative step-up means decreasing investment
            const result = calculateSIP(10000, 12, 5, -10);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.investedAmount).toBeLessThan(10000 * 12 * 5);
        });
    });

    describe('Edge Cases: Decimal Values', () => {
        it('should handle decimal monthly investment', () => {
            const result = calculateSIP(5000.50, 12, 5);
            expect(result.investedAmount).toBeCloseTo(5000.50 * 12 * 5, 0);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle decimal lumpsum investment', () => {
            const result = calculateLumpsum(100000.75, 12, 5);
            expect(result.investedAmount).toBe(100001); // Rounded
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle decimal rates accurately', () => {
            const result1 = calculateSIP(5000, 12.5, 5);
            const result2 = calculateSIP(5000, 12.75, 5);
            // Higher rate should give higher returns
            expect(result2.totalValue).toBeGreaterThan(result1.totalValue);
        });

        it('should handle very precise decimal rates', () => {
            const result = calculateLumpsum(100000, 12.345, 10);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
        });

        it('should handle decimal step-up rates', () => {
            const result = calculateSIP(5000, 12, 5, 7.5);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.investedAmount).toBeGreaterThan(5000 * 12 * 5);
        });
    });

    describe('Edge Cases: Boundary Conditions', () => {
        it('should handle minimum SIP values', () => {
            // Min: 500 monthly, 1% rate, 1 year
            const result = calculateSIP(500, 1, 1);
            expect(result.investedAmount).toBe(6000);
            expect(result.totalValue).toBeGreaterThan(6000);
        });

        it('should handle minimum Lumpsum values', () => {
            // Min: 5000 investment, 1% rate, 1 year
            const result = calculateLumpsum(5000, 1, 1);
            expect(result.investedAmount).toBe(5000);
            expect(result.totalValue).toBe(5050);
        });

        it('should handle zero step-up (should match basic SIP)', () => {
            const withStepUp = calculateSIP(5000, 12, 5, 0);
            const withoutStepUp = calculateSIP(5000, 12, 5);
            expect(withStepUp.totalValue).toBe(withoutStepUp.totalValue);
            expect(withStepUp.investedAmount).toBe(withoutStepUp.investedAmount);
        });

        it('should handle very small investment amounts', () => {
            const result = calculateSIP(1, 12, 5);
            expect(result.investedAmount).toBe(60);
            expect(result.totalValue).toBeGreaterThan(60);
        });

        it('should handle 1 year duration correctly', () => {
            const result = calculateSIP(5000, 12, 1);
            expect(result.investedAmount).toBe(60000);
            // Should have some returns even in 1 year
            expect(result.estimatedReturns).toBeGreaterThan(0);
        });
    });

    describe('Edge Cases: Step-Up Scenarios', () => {
        it('should handle 100% step-up (doubling each year)', () => {
            const result = calculateSIP(1000, 12, 3, 100);
            // Year 1: 1000/mo = 12000
            // Year 2: 2000/mo = 24000
            // Year 3: 4000/mo = 48000
            // Total: 84000
            expect(result.investedAmount).toBe(84000);
            expect(Number.isFinite(result.totalValue)).toBe(true);
        });

        it('should handle step-up over maximum period (40 years)', () => {
            const result = calculateSIP(5000, 12, 40, 10);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.investedAmount).toBeGreaterThan(5000 * 12 * 40);
        });

        it('should verify step-up increases invested amount correctly', () => {
            const result = calculateSIP(5000, 12, 3, 10);
            // Year 1: 5000 * 12 = 60000
            // Year 2: 5500 * 12 = 66000
            // Year 3: 6050 * 12 = 72600
            // Total: 198600
            expect(result.investedAmount).toBe(198600);
        });
    });

    describe('Edge Cases: Precision and Rounding', () => {
        it('should maintain reasonable precision over long periods', () => {
            const result = calculateSIP(5000, 12, 40);
            // Check that rounding doesn't cause negative returns
            expect(result.estimatedReturns).toBeGreaterThan(0);
            expect(result.totalValue).toBe(result.investedAmount + result.estimatedReturns);
        });

        it('should round consistently', () => {
            const result = calculateLumpsum(100000, 12, 5);
            // All values should be integers after rounding
            expect(Number.isInteger(result.investedAmount)).toBe(true);
            expect(Number.isInteger(result.totalValue)).toBe(true);
            expect(Number.isInteger(result.estimatedReturns)).toBe(true);
        });

        it('should handle very large numbers without precision loss', () => {
            const result = calculateLumpsum(10000000, 30, 40);
            // Should still be finite and positive
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
        });
    });

    describe('Edge Cases: Special Scenarios', () => {
        it('should handle zero investment', () => {
            const result = calculateSIP(0, 12, 5);
            expect(result.investedAmount).toBe(0);
            expect(result.totalValue).toBe(0);
            expect(result.estimatedReturns).toBe(0);
        });

        it('should handle zero years', () => {
            const result = calculateLumpsum(100000, 12, 0);
            // 0 years means no growth
            expect(result.totalValue).toBe(100000);
        });

        it('should handle extremely high rates', () => {
            // 100% annual return
            const result = calculateLumpsum(10000, 100, 5);
            expect(Number.isFinite(result.totalValue)).toBe(true);
            expect(result.totalValue).toBeGreaterThan(result.investedAmount);
        });

        it('should verify yearly breakdown matches final calculation', () => {
            const finalResult = calculateSIP(5000, 12, 5, 10);
            const breakdown = calculateYearlyBreakdown(5000, 12, 5, 'SIP', 10);
            const lastYear = breakdown[breakdown.length - 1];

            expect(lastYear.invested).toBe(finalResult.investedAmount);
            expect(lastYear.totalValue).toBe(finalResult.totalValue);
            expect(lastYear.returns).toBe(finalResult.estimatedReturns);
        });
    });

});
