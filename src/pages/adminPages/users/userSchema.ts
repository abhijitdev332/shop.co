import { z } from "zod";

export const userSchema = z.object({
  displayName: z.string().min(5, "Display name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits."),
  role: z.enum(["User", "Admin", "Moderator"], {
    invalid_type_error: "Please select a valid role.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters."),
  profileImage: z
    .union([z.instanceof(FileList), z.null()])
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Please upload exactly one profile image or leave it empty."
    ),
});
