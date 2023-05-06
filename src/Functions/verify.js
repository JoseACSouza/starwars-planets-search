const verify = (info, filter) => {
  if (Object.keys(filter).length > 1) {
    const { columnFilter, numberFilter, comparisonFilter, nameFilter } = filter;
    const number = Number(numberFilter);

    if (comparisonFilter === 'maior que') {
      return info.filter((filterName) => filterName.name.includes(nameFilter))
        .filter((filterNumber) => Number(filterNumber[columnFilter]) > number);
    } if (comparisonFilter === 'menor que') {
      return info.filter((filterName) => filterName.name.includes(nameFilter))
        .filter((filterNumber) => Number(filterNumber[columnFilter]) < number);
    } if (comparisonFilter === 'igual a') {
      return info.filter((filterName) => filterName.name.includes(nameFilter))
        .filter((filterNumber) => Number(filterNumber[columnFilter]) === number);
    }
  }
  return info.filter((filterName) => filterName.name.includes(filter.nameFilter));
};

export default verify;
