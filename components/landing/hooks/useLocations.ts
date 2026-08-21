"use client";

import { useState, useEffect } from "react";

interface Commune {
  code: string;
  nameAr: string;
}

interface Wilaya {
  code: number;
  nameAr: string;
  communes: Commune[];
}

export function useLocations() {
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/algeria-locations.json")
      .then((res) => res.json())
      .then((data: Wilaya[]) => {
        setWilayas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectWilaya = (code: number) => {
    const found = wilayas.find((w) => w.code === code);
    setCommunes(found ? found.communes : []);
  };

  const resetCommunes = () => {
    setCommunes([]);
  };

  return { wilayas, communes, loading, selectWilaya, resetCommunes };
}
