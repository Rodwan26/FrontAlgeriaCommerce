"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

export default function AdminPage(){
 const [price, setPrice] = useState("");
const [image, setImage] = useState("");

const [products, setProducts] = useState<Product[]>([]);

const [name, setName] = useState("");
const [description, setDescription] = useState("");


async function loadProducts() {
 
  const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/products`
);
  
  const data = await res.json();

  setProducts(data);
}

useEffect(() => {
  loadProducts();
}, []); 
 return (
    <div>
      <h1>Admin Dashboard</h1>

      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}