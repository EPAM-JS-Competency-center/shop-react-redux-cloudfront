import * as Yup from 'yup';

export const SingleProductSchema = Yup.object({
  id: Yup.string(),
  count: Yup.number().integer().min(0).required().defined().default(0),
  title: Yup.string().required().default(''),
  description: Yup.string().default(''),
  price: Yup.number().positive().required().defined().default(0)
});

export type Product = Yup.InferType<typeof SingleProductSchema>;
