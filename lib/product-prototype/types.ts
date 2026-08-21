export type SpecificationType =
  | "text"
  | "number"
  | "select"
  | "boolean";

export type SpecificationDefinition = {
  id: string;
  name: string;
  type: SpecificationType;
  unit?: string;
  options?: string[];
  required?: boolean;
};

export type ProductCategory = {
  id: string;
  name: string;
  description?: string;
  specifications: SpecificationDefinition[];
};

export type ProductSpecificationValue = {
  specificationId: string;
  value: string | number | boolean;
};