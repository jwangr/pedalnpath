const L = {
  Icon: {
    Default: function () {},
  },
  map: jest.fn(),
  tileLayer: jest.fn(),
  marker: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  latLng: jest.fn(),
  layerGroup: jest.fn(() => ({
    addLayer: jest.fn(),
  })),
};

L.Icon.Default.prototype = {
  _getIconUrl: jest.fn(),
};

L.Icon.Default.mergeOptions = jest.fn();

export default L;
export { L };
