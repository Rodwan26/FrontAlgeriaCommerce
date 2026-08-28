"use client";

import { useMemo, useState } from "react";

import { prototypeCategories } from "../../../lib/product-prototype/categories";
import { getDemoProduct } from "../../../lib/demo-products";

import ProductEditorHeader from "./layout/ProductEditorHeader";
import ProductEditorLayout from "./layout/ProductEditorLayout";
import ProductSidebar from "./layout/ProductSidebar";

import ProductInformation from "./sections/ProductInformation";
import ProductMedia from "./sections/ProductMedia";
import ProductPricing from "./sections/ProductPricing";
import ProductInventory from "./sections/ProductInventory";
import ProductOptions, {
  ProductOption,
} from "./sections/ProductOptions";
import ProductVariants, {
  ProductVariant,
} from "./sections/ProductVariants";

function isColorOption(name: string) {
  const normalized = name.trim().toLowerCase();

  return (
    normalized === "color" ||
    normalized === "colour" ||
    normalized === "couleur" ||
    normalized === "اللون"
  );
}

function getColorData(
  options: ProductOption[],
  colorName: string
) {
  const colorOption = options.find((option) =>
    isColorOption(option.name)
  );

  if (!colorOption) {
    return undefined;
  }

  return colorOption.colorValues?.find(
    (color) =>
      color.name.trim().toLowerCase() ===
      colorName.trim().toLowerCase()
  );
}

function generateVariants(
  options: ProductOption[],
  previousVariants: ProductVariant[]
): ProductVariant[] {
  const validOptions = options.filter(
    (option) =>
      option.name.trim() &&
      option.values.some(
        (value) => value.trim()
      )
  );

  if (validOptions.length === 0) {
    return [];
  }

  const combinations: Record<string, string>[] = [
    {},
  ];

  for (const option of validOptions) {
    const values = option.values.filter(
      (value) => value.trim()
    );

    const next: Record<string, string>[] = [];

    for (const combination of combinations) {
      for (const value of values) {
        next.push({
          ...combination,
          [option.name]: value,
        });
      }
    }

    combinations.splice(
      0,
      combinations.length,
      ...next
    );
  }

  return combinations.map((values) => {
    const existing = previousVariants.find(
      (variant) =>
        Object.keys(values).every(
          (key) =>
            variant.values[key] === values[key]
        ) &&
        Object.keys(variant.values).length ===
          Object.keys(values).length
    );

    const colorOptionName = Object.keys(values).find(
      (name) => isColorOption(name)
    );

    const colorName = colorOptionName
      ? values[colorOptionName]
      : "";

    const colorData = colorName
      ? getColorData(options, colorName)
      : undefined;

    return {
      id:
        existing?.id ??
        crypto.randomUUID(),

      values,

      price: existing?.price ?? "",
      sku: existing?.sku ?? "",
      stock: existing?.stock ?? "",

      image:
        existing?.image ??
        colorData?.image ??
        "",
    };
  });
}

export default function ProductEditor({
  productId,
  cloneId,
}: {
  productId?: number;
  cloneId?: number;
}) {
  const demoProduct = productId
    ? getDemoProduct(productId)
    : cloneId
      ? getDemoProduct(cloneId)
      : undefined;

  const isEdit = Boolean(productId);
  const isClone = Boolean(cloneId);
  const title = isEdit
    ? "Edit product"
    : isClone
      ? "Duplicate product"
      : "Add product";

  const [name, setName] = useState(
    demoProduct?.name ?? ""
  );
  const [description, setDescription] = useState(
    demoProduct?.description ?? ""
  );

  const [categoryId, setCategoryId] = useState(() => {
    if (!demoProduct) return "";

    const match = prototypeCategories.find(
      (category) =>
        category.name.trim().toLowerCase() ===
        demoProduct.category.trim().toLowerCase()
    );

    return match?.id ?? "";
  });

  const [price, setPrice] = useState(
    demoProduct ? String(demoProduct.price) : ""
  );
  const [stock, setStock] = useState(
    demoProduct ? String(demoProduct.stock) : ""
  );

  const [preview, setPreview] = useState(
    demoProduct?.image ?? ""
  );

  const [options, setOptions] = useState<ProductOption[]>(
    []
  );

  const [variants, setVariants] = useState<ProductVariant[]>(
    []
  );

  const selectedCategory = useMemo(
    () =>
      prototypeCategories.find(
        (category) =>
          category.id === categoryId
      ),
    [categoryId]
  );

  function handleOptionsChange(
    nextOptions: ProductOption[]
  ) {
    setOptions(nextOptions);

    setVariants((currentVariants) =>
      generateVariants(
        nextOptions,
        currentVariants
      )
    );
  }

  function handleImageChange(
    file: File | null
  ) {
    if (!file) {
      setPreview("");
      return;
    }

    setPreview(
      URL.createObjectURL(file)
    );
  }

  function handleSave() {
    console.log({
      name,
      description,
      categoryId,
      category:
        selectedCategory?.name ?? null,
      price,
      stock,
      options,
      variants,
    });

    alert(
      isEdit
        ? "Edit prototype only — no product will be saved."
        : "Prototype only — no product will be saved."
    );
  }

  if ((isEdit || isClone) && !demoProduct) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            المنتج غير موجود
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            تعذّر العثور على المنتج رقم {productId || cloneId} في
            البيانات التجريبية.
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.assign("/admin/products")
            }
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            العودة للمنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductEditorHeader
        title={title}
        productId={productId}
        onSave={handleSave}
      />

      <ProductEditorLayout
        main={
          <>
            <ProductInformation
              name={name}
              description={description}
              onNameChange={setName}
              onDescriptionChange={
                setDescription
              }
            />

            <ProductMedia
              preview={preview}
              onFileChange={
                handleImageChange
              }
            />

            <ProductPricing
              price={price}
              onPriceChange={setPrice}
            />

            <ProductInventory
              stock={stock}
              onStockChange={setStock}
            />

            <ProductOptions
              options={options}
              onChange={
                handleOptionsChange
              }
            />

            <ProductVariants
              variants={variants}
              options={options}
              onChange={setVariants}
/>
          </>
        }
        sidebar={
          <ProductSidebar>
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Status
                </h2>
              </div>

              <div className="p-5">
                <select
                  defaultValue="draft"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="active">
                    Active
                  </option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Organization
                </h2>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Category
                  </label>

                  <select
                    value={categoryId}
                    onChange={(e) =>
                      setCategoryId(
                        e.target.value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      Select category
                    </option>

                    {prototypeCategories.map(
                      (category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Collections
                  </label>

                  <input
                    type="text"
                    placeholder="Search collections"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Tags
                  </label>

                  <input
                    type="text"
                    placeholder="Add tags"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Add tags to help organize
                    your products.
                  </p>
                </div>
              </div>
            </div>
          </ProductSidebar>
        }
      />

      <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pb-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Save product
        </button>
      </div>
    </div>
  );
}

