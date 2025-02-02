"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2>This is just the landing page</h2>
      <p className="text-2xl font-bold">{count}</p>
      <Button variant="destructive" onClick={() => setCount(count + 1)}>
        Click here
      </Button>
    </div>
  );
}
