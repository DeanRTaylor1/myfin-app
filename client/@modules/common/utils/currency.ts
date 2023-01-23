const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'vnd':
      return '₫';
    case 'usd':
      return '$';
    case 'gbp':
      return '£';
  }
};

export { getCurrencySymbol };
