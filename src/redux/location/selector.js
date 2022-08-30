function getFilteredLocations(state) {
  const { locations } = state.locationReducer;
  const { name, minConfirmed, maxConfirmed } = state.filterReducer;

  const filteredLocations = locations.filter(location => {
    const {
      country,
      province,
      latest: { confirmed },
    } = location;
    const lcCountry = country.toLowerCase();
    const lcProvince = province.toLowerCase();
    const lcQuery = name.toLowerCase();

    const isContainsQuery = lcCountry.includes(lcQuery) || lcProvince.includes(lcQuery);
    const isInConfirmedRange = confirmed >= minConfirmed && confirmed <= maxConfirmed;

    return isContainsQuery && isInConfirmedRange;
  });

  return filteredLocations;
}

export { getFilteredLocations };
