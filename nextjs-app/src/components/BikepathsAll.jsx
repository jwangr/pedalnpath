import { db } from "@/lib/db";
import { Card, CardHeader } from "@mui/material";

export default async function BikepathsAll() {
  const allPaths = await db.bikepath.findMany();

  const list = allPaths.map((path) => (
    <Card key={path?.id}>
      <CardHeader>{path?.title || "No title"}</CardHeader>
    </Card>
  ));

  return (
    <div className="m-2">
      <h2>All Bike Paths</h2>
      <div>
        {allPaths.length > 0 ? list : "No bike tracks added to Pedal N' Path. Go explore!"}
      </div>
    </div>
  );
}
