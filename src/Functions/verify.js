const verify = (info, filter) => {
  if (Object.keys(filter).length > 0) {
    const { columnFilter, numberFilter, comparisonFilter } = filter;
    const number = Number(numberFilter);

    if (comparisonFilter === 'maior que') {
      return info.filter((filterNumber) => Number(filterNumber[columnFilter]) > number);
    } if (comparisonFilter === 'menor que') {
      return info.filter((filterNumber) => Number(filterNumber[columnFilter]) < number);
    } if (comparisonFilter === 'igual a') {
      return info.filter((filterNumber) => Number(filterNumber[columnFilter]) === number);
    }
  }
  return info.filter((filterName) => filterName);
};

export default verify;
