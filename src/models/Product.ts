import * as Yup from "yup";

export const ProductSchema = Yup.object({
  productId: Yup.string().default(""),
  productName: Yup.string().required().default(""),
  description: Yup.string().default(""),
  productType: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
  currency: Yup.string().required().default("USD"),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;
