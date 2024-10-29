export function formatMoney(number, currencySymbol = '₱', decimalPlaces = 2, thousandsSeparator = ',', decimalSeparator = '.') {
    // Ensure the number is a finite number
    if (!isFinite(number)) {
      return number;
    }
  
    // Convert the number to a fixed-point notation based on decimal places
    const fixedNumber = number.toFixed(decimalPlaces);
  
    // Split the number into integer and decimal parts
    const parts = fixedNumber.split('.');
  
    // Format the integer part with the thousands separator
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
    // Join the integer and decimal parts with the decimal separator
    const formattedNumber = parts.join(decimalSeparator);
  
    // Combine the currency symbol with the formatted number
    return `${currencySymbol}${formattedNumber}`;
  }