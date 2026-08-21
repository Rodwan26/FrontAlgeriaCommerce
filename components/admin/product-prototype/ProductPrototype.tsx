"use client";

import { useMemo, useState } from "react";

import { prototypeCategories } from "../../../lib/product-prototype/categories";

import BasicInformation from "./BasicInformation";
import CategorySelector from "./CategorySelector";
import Specifications from "./Specifications";
import PricingInventory from "./PricingInventory";
import ProductImages from "./ProductImages";

export default function ProductPrototype() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [specificationValues, setSpecificationValues] =
    useState<Record<string, string>>({});

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [preview, setPreview] = useState("");

  const selectedCategory = useMemo(
    () =>
      prototypeCategories.find(
        (category) => category.id === categoryId
      ),
    [categoryId]
  );

  function handleCategoryChange(id: string) {
    setCategoryId(id);

    // Reset specification values when category changes.
    setSpecificationValues({});
  }

  function handleSpecificationChange(
    id: string,
    value: string
  ) {
    setSpecificationValues((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function handleImageChange(file: File | null) {
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  }

  function handleAddSpecification() {
    alert(
      "Merchant-defined specifications will be implemented in the next prototype."
    );
  }

  function handleSave() {
    alert(
      "Prototype only — no product will be saved."
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <BasicInformation
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />

      <CategorySelector
        categories={prototypeCategories}
        selectedCategoryId={categoryId}
        onChange={handleCategoryChange}
      />

      <Specifications
        specifications={
          selectedCategory?.specifications ?? []
        }
        values={specificationValues}
        onChange={handleSpecificationChange}
        onAddSpecification={handleAddSpecification}
      />

      <PricingInventory
        price={price}
        stock={stock}
        onPriceChange={setPrice}
        onStockChange={setStock}
      />

      <ProductImages
        preview={preview}
        onFileChange={handleImageChange}
      />

      <div className="flex justify-end pb-8">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Save Product
        </button>
      </div>
    </div>
  );
}