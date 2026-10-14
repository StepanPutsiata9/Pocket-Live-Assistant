export const getProgressPercent = (
  waterAmount: number,
  targetWater: number,
): number => {
  return Math.min((waterAmount / targetWater) * 100, 100);
};
