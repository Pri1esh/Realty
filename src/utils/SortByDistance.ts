const getPosition = (position: any, cityarr: any) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const PropertiesWithStatus = sortIconsByLocationWithStatus(latitude, longitude, cityarr);
  const Properties = sortIconsByLocation(latitude, longitude, cityarr);
  return { status: PropertiesWithStatus, all: Properties };
};

const sortIconsByLocation = (latitude: any, longitude: any, cityarr: any) => {
  return [...cityarr]?.sort(
    (element1: { latitude: any; logitude: any }, element2: { latitude: any; logitude: any }) => {
      if (
        calculateDistance(latitude, longitude, element2.latitude, element2.logitude) >
        calculateDistance(latitude, longitude, element1.latitude, element1.logitude)
      ) {
        return -1;
      } else if (
        calculateDistance(latitude, longitude, element2.latitude, element2.logitude) <
        calculateDistance(latitude, longitude, element1.latitude, element1.logitude)
      ) {
        return 1;
      }
      return 0;
    },
  );
};

const sortIconsByLocationWithStatus = (latitude: any, longitude: any, cityarr: any) => {
  return [...cityarr]?.sort(
    (
      element1: { latitude: any; logitude: any; status: any },
      element2: { latitude: any; logitude: any; status: any },
    ) => {
      if (
        element1.status === element2.status &&
        calculateDistance(latitude, longitude, element2.latitude, element2.logitude) >
          calculateDistance(latitude, longitude, element1.latitude, element1.logitude)
      ) {
        return -1;
      } else if (
        element1.status === element2.status &&
        calculateDistance(latitude, longitude, element2.latitude, element2.logitude) <
          calculateDistance(latitude, longitude, element1.latitude, element1.logitude)
      ) {
        return 1;
      }
      return 0;
    },
  );
};

function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
  const radian = Math.PI / 180;
  const distance =
    0.5 -
    Math.cos((lat2 - lat1) * radian) / 2 +
    (Math.cos(lat1 * radian) * Math.cos(lat2 * radian) * (1 - Math.cos((lon2 - lon1) * radian))) / 2;
  return 12742 * Math.asin(Math.sqrt(distance));
}

export { getPosition, calculateDistance, sortIconsByLocationWithStatus, sortIconsByLocation };
