// Helper to get the first and last day of the current month in DD/MM/YYYY format

export function getCurrentMonthRange() {
  const d = new Date(), y = d.getFullYear(), m = d.getMonth();
  const pad = (n: number) => n < 10 ? '0' + n : '' + n;
  const from = `01/${pad(m + 1)}/${y}`;
  const last = new Date(y, m + 1, 0).getDate();
  const to = `${pad(last)}/${pad(m + 1)}/${y}`;
  return { from, to };
}

export function getTotalsByType(transactions: any[]) {
  let totalExpense = 0;
  let totalIncome = 0;
  transactions.forEach(t => {
    if (t.tipo === 'GASTO') totalExpense += Number(t.monto);
    if (t.tipo === 'INGRESO') totalIncome += Number(t.monto);
  });
  return { totalExpense, totalIncome };
}


export function getLastDayOfCurrentMonth() {
  const d = new Date(), y = d.getFullYear(), m = d.getMonth();
  const last = new Date(y, m + 1, 0);
  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];
  const day = last.getDate();
  const month = months[last.getMonth()];
  return `${day} ${month}, ${y}`;
}

