import ExplorePage from "@/components/ExplorePage";
import { db } from "@/lib/db";

import { getSession } from "@/lib/auth"; // make sure this points to your next-auth options
import BikePathDBController from "@/lib/controllers/BikePathDBController";
const allPathsController = new BikePathDBController();

export default async function Explore() {
  const user = await getSession();

  const userPaths = await db.userBikepath.findMany({
    where: { userId: user.id },
    include: { bikepath: true },
  });
  console.log(userPaths);

  const allPaths = await allPathsController.getAllPaths();
  console.log(allPaths);

  const allPathsAdd = async (newPath) => {
    await allPathsController.createPath(newPath);
  };
  
  const allPathsDelete = async (pathId) => {
    await allPathsController.deletePath(pathId);
  };
  

  return (
    <>
      <ExplorePage
        userPaths={userPaths}
        allPaths={allPaths}
        allPathsAdd={allPathsAdd}
        allPathsDelete={allPathsDelete}
      />
    </>
  );
}
