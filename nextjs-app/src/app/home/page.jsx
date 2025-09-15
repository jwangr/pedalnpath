import BikepathsAll from "@/components/BikepathsAll";
import WishlistSwitch from "@/components/WishlistSwitch";

const DunedinRoutes = [
  {
    title: "Otago Central Rail Trail",
    description:
      "Iconic multi-day ride through Central Otago's stunning landscapes, following a former railway line.",
    difficulty: "Easy to Moderate",
    distanceKm: 152,
    duration: "4-5 days (flexible)",
    startCoordinate: [-45.2418, 170.1281],
    endCoordinate: [-45.0797, 169.3378],
    coordinates: [
      [-45.2418, 170.1281],
      [-45.2345, 170.1122],
      [-45.2211, 170.0987],
      [-45.0797, 169.3378],
    ],
    highlights: [
      "Spectacular scenery",
      "Historical railway heritage",
      "Charming towns and villages",
    ],
    notes:
      "Can be done in sections. Requires some planning for accommodation and transport.",
    trackType: "Rail Trail",
    suitableFor: ["Families", "Beginners", "Experienced cyclists"],
  },
  {
    title: "Dunedin Botanic Garden Ride",
    description: "Leisurely ride through the beautiful Dunedin Botanic Garden.",
    difficulty: "Easy",
    distanceKm: 2,
    duration: "30 minutes - 1 hour",
    startCoordinate: [-45.8623, 170.5071],
    endCoordinate: [-45.8623, 170.5071],
    coordinates: [
      [-45.8623, 170.5071],
      [-45.8645, 170.5101],
      [-45.8678, 170.5087],
      [-45.8656, 170.5054],
      [-45.8623, 170.5071],
    ],
    highlights: ["Beautiful gardens", "Peaceful atmosphere", "Easy riding"],
    notes: "Mostly flat, suitable for all ages. Some paths may be gravel.",
    trackType: "Path",
    suitableFor: ["Families", "Beginners", "Casual cyclists"],
  },
  {
    title: "West Harbour Cycleway",
    description:
      "Scenic ride along the West Harbour, with views of the harbour and surrounding hills.",
    difficulty: "Easy",
    distanceKm: 10,
    duration: "1-2 hours",
    startCoordinate: [-45.8588, 170.4819],
    endCoordinate: [-45.8169, 170.5058],
    coordinates: [
      [-45.8588, 170.4819],
      [-45.8555, 170.4852],
      [-45.8421, 170.4933],
      [-45.831, 170.5002],
      [-45.8169, 170.5058],
    ],
    highlights: [
      "Harbour views",
      "Flat terrain",
      "Close to cafes and restaurants",
    ],
    notes: "Shared pathway with pedestrians.  Can be extended further.",
    trackType: "Cycleway",
    suitableFor: ["Families", "Beginners", "Road bikes"],
  },
  {
    title: "Signal Hill Mountain Bike Tracks",
    description:
      "A network of purpose-built mountain bike tracks on Signal Hill, catering to various skill levels.",
    difficulty: "Moderate to Advanced",
    distanceKm: 5,
    duration: "1-3 hours",
    startCoordinate: [-45.8388, 170.5388],
    endCoordinate: [-45.8388, 170.5388],
    coordinates: [
      [-45.8388, 170.5388],
      [-45.837, 170.54],
      [-45.835, 170.537],
      [-45.8368, 170.534],
      [-45.8388, 170.5388],
    ],
    highlights: ["Technical riding", "Great views", "Variety of trails"],
    notes:
      "Well-maintained trails. Suitable for mountain bikes with suspension.",
    trackType: "Mountain Bike Tracks",
    suitableFor: ["Intermediate Riders", "Advanced Riders", "Mountain Bikes"],
  },
  {
    title: "Ross Creek Reservoir Loop",
    description:
      "A scenic loop around the Ross Creek Reservoir, offering a mix of sealed and gravel tracks.",
    difficulty: "Moderate",
    distanceKm: 7,
    duration: "1-2 hours",
    startCoordinate: [-45.8527, 170.4983],
    endCoordinate: [-45.8527, 170.4983],
    coordinates: [
      [-45.8527, 170.4983],
      [-45.8493, 170.495],
      [-45.846, 170.4917],
      [-45.8527, 170.4983],
    ],
    highlights: ["Reservoir views", "Native bush", "Mix of terrain"],
    notes: "Some hills involved. Suitable for hybrid or mountain bikes.",
    trackType: "Loop Track",
    suitableFor: ["Intermediate Riders", "Hybrid Bikes", "Mountain Bikes"],
  },
];

const bikeRoute = DunedinRoutes[2];

export default function Home() {
  return (
    <>
      <h1 className="flex align-center justify-center">
        Home Page
        <WishlistSwitch bikeRoute={bikeRoute} />
      </h1>
      <BikepathsAll />
    </>
  );
}
