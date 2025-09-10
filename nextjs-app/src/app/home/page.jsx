import BikepathsAll from "@/components/BikepathsAll";
import WishlistSwitch from "@/components/WishlistSwitch";

export default function Home() {
  return (
    <>
      <h1 className="flex align-center justify-center">
        Home Page
        <WishlistSwitch />
      </h1>
      <BikepathsAll />
    </>
  );
}
