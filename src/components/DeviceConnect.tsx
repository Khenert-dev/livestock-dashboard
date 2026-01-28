"use client";

import { useEffect, useState } from "react";

export default function DeviceConnect() {
  const [state, setState] = useState("Connecting to ESP32…");

  useEffect(() => {
    const t = setTimeout(
      () => setState("ESP32 Connected"),
      2500
    );
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="small text-muted">
      {state}
    </div>
  );
}
