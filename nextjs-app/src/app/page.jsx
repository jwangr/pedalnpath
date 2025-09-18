'use client'

import { decrement, increment } from "@/store/slice";
// import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  // redirect("/home");
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
