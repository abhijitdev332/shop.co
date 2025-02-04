import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z.instanceof(FileList).optional(),
});
export const addressSchema = z.object({
  landMark: z.string().min(1, "land mark is required"),
  houseNo: z.string().optional(),
  city: z.string().min(1, "city is required"),
  district: z.string().optional(),
  state: z.string().min(1, "state is required"),
  country: z.string().min(1, "country is required"),
  pin: z.string().min(6, "pincode should 6 digits"),
});
