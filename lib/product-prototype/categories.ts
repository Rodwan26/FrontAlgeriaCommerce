import { ProductCategory } from "./types";

export const prototypeCategories: ProductCategory[] = [
  {
    id: "shoes",
    name: "Shoes",
    description: "Footwear and sneakers",
    specifications: [
      {
        id: "size",
        name: "Size",
        type: "select",
        options: ["39", "40", "41", "42", "43", "44", "45"],
        required: true,
      },
      {
        id: "color",
        name: "Color",
        type: "select",
        options: [
          "Black",
          "White",
          "Red",
          "Blue",
          "Green",
        ],
        required: true,
      },
      {
        id: "material",
        name: "Material",
        type: "text",
        required: false,
      },
      {
        id: "gender",
        name: "Gender",
        type: "select",
        options: ["Men", "Women", "Unisex"],
        required: false,
      },
    ],
  },

  {
    id: "printers",
    name: "Printers",
    description: "Printers and printing equipment",
    specifications: [
      {
        id: "voltage",
        name: "Voltage",
        type: "select",
        options: ["110V", "220V"],
        required: true,
      },
      {
        id: "technology",
        name: "Printing Technology",
        type: "select",
        options: [
          "Laser",
          "Inkjet",
          "FDM",
          "SLA",
        ],
        required: true,
      },
      {
        id: "print-speed",
        name: "Print Speed",
        type: "number",
        unit: "ppm",
        required: false,
      },
      {
        id: "generation",
        name: "Generation",
        type: "text",
        required: false,
      },
    ],
  },

  {
    id: "laptops",
    name: "Laptops",
    description: "Laptops and portable computers",
    specifications: [
      {
        id: "ram",
        name: "RAM",
        type: "select",
        options: [
          "4 GB",
          "8 GB",
          "16 GB",
          "32 GB",
          "64 GB",
        ],
        required: true,
      },
      {
        id: "storage",
        name: "Storage",
        type: "select",
        options: [
          "128 GB",
          "256 GB",
          "512 GB",
          "1 TB",
          "2 TB",
        ],
        required: true,
      },
      {
        id: "screen-size",
        name: "Screen Size",
        type: "number",
        unit: "inch",
        required: false,
      },
      {
        id: "processor",
        name: "Processor",
        type: "text",
        required: false,
      },
    ],
  },
];