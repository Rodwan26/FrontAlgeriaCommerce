"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { imageUrl } from "../../../lib/images";

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

function sameVariantValues(
  first: Record<string, string>,
  second: Record<string, string>
) {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  return firstKeys.every(
    (key) => first[key] === second[key]
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

  const usedPreviousIds = new Set<
    string | number
  >();

  return combinations.map((values) => {
    const existing = previousVariants.find(
      (variant) => {
        if (
          !sameVariantValues(
            variant.values,
            values
          )
        ) {
          return false;
        }

        if (
          variant.dbId != null &&
          usedPreviousIds.has(variant.dbId)
        ) {
          return false;
        }

        return true;
      }
    );

    if (existing?.dbId != null) {
      usedPreviousIds.add(existing.dbId);
    }

    const colorOptionName =
      Object.keys(values).find((name) =>
        isColorOption(name)
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

      dbId: existing?.dbId,

      values,

      price:
        existing?.price ?? "",

      stock:
        existing?.stock ?? "",

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
  const isEdit = Boolean(productId);
  const isClone = Boolean(cloneId);

  const title = isEdit
    ? "Edit product"
    : isClone
      ? "Duplicate product"
      : "Add product";

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [preview, setPreview] =
    useState("");

  const [uploadedImage, setUploadedImage] =
    useState("");

  const [uploadError, setUploadError] =
    useState("");

  const [loading, setLoading] =
    useState(isEdit || isClone);

  const [loadError, setLoadError] =
    useState(false);

  const [status, setStatus] =
    useState("draft");

  const [collections, setCollections] =
    useState<number[]>([]);

  const [collectionsList, setCollectionsList] =
    useState<
      {
        id: number;
        name: string;
      }[]
    >([]);

  const [options, setOptions] =
    useState<ProductOption[]>([]);

  const [variants, setVariants] =
    useState<ProductVariant[]>([]);

  const [realCategories, setRealCategories] =
    useState<
      {
        id: number;
        name: string;
      }[]
    >([]);

  /*
   * Load categories
   */
  useEffect(() => {
    let cancelled = false;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to load categories"
          );
        }

        return res.json();
      })
      .then((data) => {
        if (
          !cancelled &&
          Array.isArray(data)
        ) {
          setRealCategories(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRealCategories([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Load collections
   */
  useEffect(() => {
    let cancelled = false;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/collections`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to load collections"
          );
        }

        return res.json();
      })
      .then((data) => {
        if (
          !cancelled &&
          Array.isArray(data)
        ) {
          setCollectionsList(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCollectionsList([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Load existing product
   */
  useEffect(() => {
    if (!isEdit && !isClone) {
      setLoading(false);
      return;
    }

    const id = productId ?? cloneId;

    if (!id) {
      setLoading(false);
      setLoadError(true);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setLoadError(false);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to load product"
          );
        }

        return res.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        setName(data.name ?? "");

        setDescription(
          data.description ?? ""
        );

        setPrice(
          data.price != null
            ? String(data.price)
            : ""
        );

        setStock(
          data.stock != null
            ? String(data.stock)
            : ""
        );

        setStatus(
          data.status ?? "draft"
        );

        setCategoryId(
          data.category_id != null
            ? String(data.category_id)
            : ""
        );

        const image =
          data.image ?? "";

        setPreview(
          image
            ? imageUrl(image)
            : ""
        );

        setUploadedImage(image);

        /*
         * Options
         */
        const loadedOptions =
          Array.isArray(data.options)
            ? data.options.map(
                (option: {
                  name?: string;
                  values?: string[];
                  colorValues?: ProductOption["colorValues"];
                }) => ({
                  id: crypto.randomUUID(),

                  name:
                    option.name ?? "",

                  values:
                    option.values ?? [],

                  colorValues:
                    option.colorValues,
                })
              )
            : [];

        setOptions(
          loadedOptions
        );

        /*
         * Variants
         *
         * SKU is intentionally NOT part
         * of the frontend ProductVariant state.
         *
         * Backend owns SKU completely.
         */
        const loadedVariants =
          Array.isArray(data.variants)
            ? data.variants.map(
                (variant: {
                  id?: number;
                  price?: number;
                  stock?: number;
                  image?: string;
                  options?: Record<
                    string,
                    string
                  >;
                }) => ({
                  id: crypto.randomUUID(),

                  /*
                   * Edit:
                   * preserve DB id.
                   *
                   * Clone:
                   * do not preserve DB id.
                   */
                  dbId: isClone
                    ? undefined
                    : variant.id,

                  values:
                    variant.options ?? {},

                  price:
                    variant.price != null
                      ? String(
                          variant.price
                        )
                      : "",

                  stock:
                    variant.stock != null
                      ? String(
                          variant.stock
                        )
                      : "",

                  image:
                    variant.image ?? "",
                })
              )
            : [];

        setVariants(
          loadedVariants
        );

        /*
         * Collections
         */
        const loadedCollections =
          Array.isArray(
            data.collections
          )
            ? data.collections
                .filter(
                  (item: {
                    id?: number;
                  }) =>
                    item.id != null
                )
                .map(
                  (item: {
                    id: number;
                  }) => item.id
                )
            : [];

        setCollections(
          isClone
            ? []
            : loadedCollections
        );
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setLoadError(true);

        setName("");
        setDescription("");
        setCategoryId("");
        setPrice("");
        setStock("");
        setPreview("");
        setUploadedImage("");
        setOptions([]);
        setVariants([]);
        setCollections([]);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    isEdit,
    isClone,
    productId,
    cloneId,
  ]);

  /*
   * Options change
   *
   * Regenerates variant combinations while
   * preserving existing variant data when
   * the same combination still exists.
   */
  function handleOptionsChange(
    nextOptions: ProductOption[]
  ) {
    setOptions(nextOptions);

    setVariants(
      (currentVariants) =>
        generateVariants(
          nextOptions,
          currentVariants
        )
    );
  }

  /*
   * Product image upload
   */
  async function uploadImage(
    file: File
  ) {
    setUploadError("");

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    let res: Response;

    try {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/product-image`,
        {
          method: "POST",
          body: formData,
        }
      );
    } catch {
      setUploadError(
        "تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مجددًا."
      );

      return;
    }

    const data =
      await res
        .json()
        .catch(() => null);

    if (!res.ok) {
      const reason =
        data?.detail ??
        `الخادم رفض الطلب (رمز ${res.status})`;

      setUploadError(
        `لم تُرفع صورتك: ${reason}`
      );

      return;
    }

    if (!data?.url) {
      setUploadError(
        "لم تُرفع صورتك: استجابة الخادم غير مكتملة"
      );

      return;
    }

    setUploadedImage(
      data.url
    );
  }

  function handleImageChange(
    file: File | null
  ) {
    setUploadError("");

    if (!file) {
      setPreview("");
      setUploadedImage("");

      return;
    }

    setPreview(
      URL.createObjectURL(file)
    );

    uploadImage(file);
  }

  /*
   * Collections
   */
  function toggleCollection(
    id: number
  ) {
    setCollections(
      (current) =>
        current.includes(id)
          ? current.filter(
              (item) =>
                item !== id
            )
          : [
              ...current,
              id,
            ]
    );
  }

  /*
   * Save product
   */
  async function handleSave() {
    if (!name.trim()) {
      alert(
        "Please enter a product name"
      );

      return;
    }

    if (!price) {
      alert(
        "Please enter a price"
      );

      return;
    }

    if (!categoryId) {
      alert(
        "Please select a category"
      );

      return;
    }

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/products`;

    const method = isEdit
      ? "PUT"
      : "POST";

    /*
     * IMPORTANT:
     *
     * SKU is NOT sent here.
     *
     * Backend generates and owns SKU.
     */
    const res = await fetch(
      url,
      {
        method,

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,

          description,

          price:
            Number(price),

          stock:
            Number(stock) || 0,

          status,

          image:
            uploadedImage,

          category_id:
            Number(categoryId),

          options:
            options
              .filter(
                (option) =>
                  option.name.trim()
              )
              .map(
                (option) => ({
                  name:
                    option.name,

                  values:
                    option.values.filter(
                      (value) =>
                        value.trim()
                    ),
                })
              ),

          /*
           * Variants
           *
           * Frontend sends:
           * - id
           * - price
           * - stock
           * - options
           * - image
           *
           * Frontend DOES NOT send SKU.
           */
          variants:
            variants.map(
              (variant) => ({
                /*
                 * Existing variant:
                 * real DB id.
                 *
                 * New variant:
                 * null.
                 *
                 * Clone:
                 * null.
                 */
                id:
                  isClone
                    ? null
                    : variant.dbId ??
                      null,

                price:
                  variant.price
                    ? Number(
                        variant.price
                      )
                    : undefined,

                stock:
                  Number(
                    variant.stock
                  ) || 0,

                options:
                  variant.values,

                image:
                  variant.image ||
                  undefined,
              })
            ),

          collections,
        }),
      }
    );

    if (!res.ok) {
      const errorData =
        await res
          .json()
          .catch(() => null);

      const message =
        errorData?.detail ??
        (isEdit
          ? "Failed to update product"
          : "Failed to create product");

      alert(
        Array.isArray(message)
          ? message.join(
              ", "
            )
          : String(message)
      );

      return;
    }

    router.push(
      "/admin/products"
    );
  }

  /*
   * Loading state
   */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-gray-500">
          Loading product...
        </p>
      </div>
    );
  }

  /*
   * Load error
   */
  if (
    (isEdit || isClone) &&
    loadError
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            المنتج غير موجود
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            تعذّر تحميل المنتج رقم{" "}
            {productId ??
              cloneId}
            .
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.assign(
                "/admin/products"
              )
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
        productId={
          productId
        }
        onSave={
          handleSave
        }
      />

      <ProductEditorLayout
        main={
          <>
            <ProductInformation
              name={name}
              description={
                description
              }
              onNameChange={
                setName
              }
              onDescriptionChange={
                setDescription
              }
            />

            <ProductMedia
              preview={
                preview
              }
              onFileChange={
                handleImageChange
              }
              error={
                uploadError
              }
            />

            <ProductPricing
              price={price}
              onPriceChange={
                setPrice
              }
            />

            <ProductInventory
              stock={stock}
              onStockChange={
                setStock
              }
            />

            <ProductOptions
              options={
                options
              }
              onChange={
                handleOptionsChange
              }
            />

            <ProductVariants
              variants={
                variants
              }
              options={
                options
              }
              onChange={
                setVariants
              }
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
                  value={
                    status
                  }
                  onChange={(
                    e
                  ) =>
                    setStatus(
                      e.target
                        .value
                    )
                  }
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
                    value={
                      categoryId
                    }
                    onChange={(
                      e
                    ) =>
                      setCategoryId(
                        e.target
                          .value
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">
                      Select category
                    </option>

                    {realCategories.map(
                      (
                        category
                      ) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {
                            category.name
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-800">
                    Collections
                  </label>

                  {collectionsList.length ===
                  0 ? (
                    <p className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                      No collections yet.
                    </p>
                  ) : (
                    <div className="max-h-56 overflow-y-auto rounded-lg border border-gray-300">
                      {collectionsList.map(
                        (
                          collection
                        ) => {
                          const checked =
                            collections.includes(
                              collection.id
                            );

                          return (
                            <label
                              key={
                                collection.id
                              }
                              className="flex cursor-pointer items-center gap-2 border-b border-gray-100 px-3 py-2.5 text-sm last:border-0 hover:bg-gray-50"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  checked
                                }
                                onChange={() =>
                                  toggleCollection(
                                    collection.id
                                  )
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />

                              <span className="text-gray-900">
                                {
                                  collection.name
                                }
                              </span>
                            </label>
                          );
                        }
                      )}
                    </div>
                  )}

                  {collections.length >
                    0 && (
                    <p className="mt-2 text-xs text-gray-500">
                      {
                        collections.length
                      }{" "}
                      selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ProductSidebar>
        }
      />

      <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pb-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={
            handleSave
          }
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Save product
        </button>
      </div>
    </div>
  );
}