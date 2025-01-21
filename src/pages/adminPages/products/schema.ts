import { array, number, string, z } from "zod";

const productModalScheama = z.object({
  packOf: string().optional(),
  styleCode: string().optional(),
  fabric: string().optional(),
  fabricCare: string().optional(),
  pattern: string().optional(),
  pockets: string().optional(),
  sleeve: string().optional(),
  SuitableFor: string().optional(),
  fit: string().optional(),
  style: string().optional(),
});

const variantSchema = z.object({
  color: string(),
  size: array(string()),
  images: array(string()),
});
export { productModalScheama };
