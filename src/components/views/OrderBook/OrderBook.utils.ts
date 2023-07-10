export const formatNumberWithCommas = (inputNumber: number): string => {
  return new Intl.NumberFormat().format(inputNumber);
};
