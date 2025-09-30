import polyline from "@mapbox/polyline";

export function formatOSRMResponse(OSRMData) {
  const encoded = OSRMData.routes[0]?.geometry;
  const geometry = polyline.decode(encoded);
  const duration_seconds = OSRMData.routes[0]?.duration;
  const duration_minutes = Math.floor(duration_seconds / 60) % 60;
  const duration_hours = Math.floor(duration_seconds / 3600);
  const duration = duration_hours
    ? `${duration_hours}hr ${duration_minutes}min`
    : `${duration_minutes}min`;
  const distanceKm = (OSRMData.routes[0]?.distance / 1000).toFixed(1);

  return {
    geometry,
    duration,
    distanceKm,
  };
}
