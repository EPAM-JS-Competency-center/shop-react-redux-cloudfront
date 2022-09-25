import * as Yup from "yup";

export const ProductSchema = Yup.object({
  id: Yup.string(),
  name: Yup.string().required().default(""),
  description: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
  imageUrl: Yup.string().notRequired().url().default(""),
  quantity: Yup.number().positive().notRequired().defined().default(0),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;
