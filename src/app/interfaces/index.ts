import { ProductStatus, ProductType } from "../../../generated/prisma/client";

export interface CreateProductPayload {
  sku: string;
  name: string;
  description?: string;
  shortDescription?: string;
  productType: ProductType;
  status?: ProductStatus;
  basePrice: number;
  salePrice?: number;
  costPrice?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  isFeatured?: boolean;
  isEcoFriendly?: boolean;
  isHandmade?: boolean;
  isLocal?: boolean;
  isSustainable?: boolean;
  isOrganic?: boolean;
  isHalal?: boolean;
  isSunnahBased?: boolean;

  categoryId: string;
}
