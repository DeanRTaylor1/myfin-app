var year = new Date().getFullYear();
var month = new Date().getMonth();

const getWeeklySavings = (
  monthlySalary: number,
  monthlyOutgoings: number,
  savingsRate?: number
) => {
  const freeCash = monthlySalary - monthlyOutgoings;
  const days = daysInMonth(year, month);
  if (savingsRate) {
    //console.log(savingsRate);
    return Math.floor((freeCash / days) * 7 * (savingsRate / 100));
  }

  return Math.floor((freeCash / days) * 7);
};

function daysInMonth(month: number, year: number) {
  // Use 1 for January, 2 for February, etc.
  return new Date(year, month, 0).getDate();
}

const getDailySpend = (totalOutgoings: number) => {
  const days = daysInMonth(year, month);

  return Math.floor(totalOutgoings / days);
};

const targetDailySpend = (
  monthlySalary: number,
  monthlyOutgoings: number,
  savingsRate: number
) => {
  const freeCash = monthlySalary - monthlyOutgoings;
  const days = daysInMonth(year, month);

  return (
    Math.floor((freeCash * (1 - savingsRate / 100)) / days) +
    Math.floor(monthlyOutgoings / days)
  );
};

const daysUntilTarget = (
  monthlySalary: number,
  monthlyOutgoings: number,
  savingsRate: number,
  savingsTarget: number,
  currentSavings: number = 0
) => {
  //console.log(monthlySalary, monthlyOutgoings, savingsRate, savingsTarget);
  const freeCash = monthlySalary - monthlyOutgoings;
  const monthlySavings = freeCash * (savingsRate / 100);
  //console.log(Math.floor(savingsTarget / (monthlySavings / 30)));
  return Math.floor((savingsTarget - currentSavings) / (monthlySavings / 30));
};

export { getWeeklySavings, getDailySpend, targetDailySpend, daysUntilTarget };
