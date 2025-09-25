import ReviewModal from "@/components/reviews/ReviewModal";

const examplePath = {
  id: 19,
  title: "Otago Central Rail Trail",
  description:
    "Iconic multi-day ride through Central Otago's stunning landscapes, following a former railway line.",
  difficulty: "Easy to Moderate",
  distanceKm: 152,
  duration: "4-5 days (flexible)",
  startLat: -45.2418,
  startLng: 170.1281,
  endLat: -45.0797,
  endLng: 169.3378,
  notes: null,
  trackType: null,
  highlights: [
    "Spectacular scenery",
    "Historical railway heritage",
    "Charming towns and villages",
  ],
  coordinates: [
    [-45.2418, 170.1281],
    [-45.2345, 170.1122],
    [-45.2211, 170.0987],
    [-45.0797, 169.3378],
  ],
  suitableFor: ["Families", "Beginners", "Experienced cyclists"],
};

export default function PathPage() {
  return (
    <div>
      Example PathPage
    </div>
  );
}
