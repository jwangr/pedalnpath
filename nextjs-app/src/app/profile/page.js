import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import UserPathsContainer from "@/components/PathsContainer";
import { Box, Card } from "@mui/material";


export default async function ProfilePage() {
    const user = await getSession();
    console.log(user);

    // const userPaths = await db.userPath.findMany({
    //     where: { userId: user.id },
    //     include: { bikepath: true },
    // });
    // console.log(userPaths);

    if (user) {
        return (
            <div className="py-10">
                <Box className='flex align-items-center' sx={{ width: '90%', margin:'auto' }}>
                    <Card variant="outlined" sx={{ width: '100%' }}>
                        <h1 className="my-5 text-xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">DASHBOARD</h1>
                        <h2 className="my-5 text-l text-center leading-none tracking-tight text-gray-700">{user.email}</h2>
                    </Card>
                </Box>

                <UserPathsContainer displayPaths={"user"} userId={user.id} displayUserPathsToggle={false} />
            </div>
        )
    } else {
        redirect('/login')
    }


}

//  userPaths Returns a response like this:
// [
//         {
//             id: 6,
//             userId: 4,
//             bikepathId: 33,
//             dateAdded: 2025-09-17T03:13:35.148Z,
//             completed: false,
//             bikepath: {
//             id: 33,
//             title: 'Waterview Shared Path',
//             description: 'A scenic route through parks and alongside the Oakley Creek.',
//             difficulty: 'Easy',
//             distanceKm: 5.5,
//             duration: '30-60 minutes',
//             startLat: -36.88,
//             startLng: 174.7,
//             endLat: -36.8993,
//             endLng: 174.6744,
//             notes: null,
//             trackType: null,
//             highlights: [Array],
//             coordinates: [Array],
//             suitableFor: [Array]
//             }
//         },
//         {
//             id: 9,
//             userId: 4,
//             bikepathId: 34,
//             dateAdded: 2025-09-17T03:17:32.092Z,
//             completed: false,
//             bikepath: {
//             id: 34,
//             title: 'Northwestern Cycleway',
//             description: 'A long, mostly flat cycleway following the Northwestern Motorway, connecting the city centre with the western suburbs.',
//             difficulty: 'Medium',
//             distanceKm: 20,
//             duration: '60-90 minutes',
//             startLat: -36.85,
//             startLng: 174.75,
//             endLat: -36.87,
//             endLng: 174.6,
//             notes: null,
//             trackType: null,
//             highlights: [Array],
//             coordinates: [Array],
//             suitableFor: [Array]
//             }
//         },
//         {
//             id: 13,
//             userId: 4,
//             bikepathId: 36,
//             dateAdded: 2025-09-17T03:24:09.276Z,
//             completed: false,
//             bikepath: {
//             id: 36,
//             title: 'Twin Rivers Trail (Part of the Queenstown Trail)',
//             description: 'A section of the Queenstown Trail that runs along the Kawarau River, linking Frankton with Gibbston. Mostly flat and easy riding.',
//             difficulty: 'Easy',
//             distanceKm: 15,
//             duration: '1.5-2.5 hours',
//             startLat: -45.025,
//             startLng: 168.715,
//             endLat: -45.03,
//             endLng: 168.8,
//             notes: null,
//             trackType: null,
//             highlights: [Array],
//             coordinates: [Array],
//             suitableFor: [Array]
//             }
//         },
//         {
//             id: 16,
//             userId: 4,
//             bikepathId: 38,
//             dateAdded: 2025-09-17T03:26:08.418Z,
//             completed: false,
//             bikepath: {
//             id: 38,
//             title: 'Kelvin Heights Peninsula Track',
//             description: 'A loop track around the Kelvin Heights Peninsula, offering panoramic views of Lake Wakatipu and the surrounding mountains.  Mix of paved and gravel surfaces.',
//             difficulty: 'Easy to Moderate',
//             distanceKm: 8,
//             duration: '1-1.5 hours',
//             startLat: -45.012,
//             startLng: 168.623,
//             endLat: -45.012,
//             endLng: 168.623,
//             notes: null,
//             trackType: null,
//             highlights: [Array],
//             coordinates: [Array],
//             suitableFor: [Array]
//             }
//         }
//         ]
