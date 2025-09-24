import Image from "next/image";

export default function ShakeLoading() {
  return (
    <div className="relative w-16 h-16 animate-bounce animate-infinite animate-duration-[1500ms] animate-ease-linear">
      <Image src="/24356-673ab7.svg" fill alt="loading" />
    </div>
  );
}
