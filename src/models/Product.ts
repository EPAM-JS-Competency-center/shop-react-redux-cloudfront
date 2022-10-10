import * as Yup from "yup";

export const ProductSchema = Yup.object({
  id: Yup.string(),
  product_name: Yup.string().required().default(""),
  price: Yup.number().positive().required().defined().default(0),
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;
