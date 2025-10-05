// Simple stub with the hooks and components your Map component uses
export const MapContainer = ({ children }) => <div data-testid="map">{children}</div>;
export const TileLayer = () => <div data-testid="tilelayer" />;
export const Marker = () => <div data-testid="marker" />;
export const Popup = () => <div data-testid="popup" />;

// mock hooks
export const useMap = jest.fn();
export const useMapEvent = jest.fn();
export const useMapEvents = jest.fn();
