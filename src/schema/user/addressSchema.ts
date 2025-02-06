import { z } from "zod";

export const addressSchema = z.object({
  landMark: z.string().min(1, "land mark is required"),
  houseNo: z.string().optional(),
  city: z.string().min(1, "city is required"),
  district: z.string().optional(),
  state: z.string().min(1, "state is required"),
  country: z.string().min(1, "country is required"),
  mobile: z.string().min(10, "Phone Number Must be 10 digit"),
  pin: z.string().min(6, "pincode should 6 digits"),
});
export const addressObject = {
  landMark: "",
  houseNo: "",
  city: "",
  district: "",
  state: "",
  country: "",
  mobile: "",
  pin: "",
};
