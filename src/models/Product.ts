import * as Yup from 'yup';

export type Product = {
  id: string,
  title: string,
  brand: string,
  color: string,
  material: string,
  weight: number,
  handOrientation: HandOrientation,
  imageUrl: string,
  price: number,
  count: number,
  description: string,
};

enum HandOrientation {
  leftHand = 'Left Hand',
  rightHand = 'Right Hand'
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
