const isTouchScreendevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

export default isTouchScreendevice;
