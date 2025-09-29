import { z } from "zod";
import { roles } from "../constants/role";

const nameSchema = z
  .string()
  .min(20, "Name must be at least 20 characters")
  .max(60, "Name cannot exceed 60 characters");

const storeNameSchema = z
  .string()
  .min(3, "Store Name must be at least 3 characters")
  .max(100, "Store Name cannot exceed 100 characters");

const addressSchema = z
  .string()
  .max(400, "Address cannot exceed 400 characters");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password cannot exceed 16 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

const emailSchema = z.string().email("Invalid email format");

export const userSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  address: addressSchema,
});

export const adminSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  address: addressSchema,
  role: z.enum(roles),
});

export const storeSchema = z.object({
  storeName: storeNameSchema,
  storeAddress: addressSchema,
  ownerName: nameSchema,
  ownerEmail: emailSchema,
});

export type UserFormValues = z.infer<typeof userSchema>;
export type AdminFormValues = z.infer<typeof adminSchema>;
export type StoreFormValues = z.infer<typeof storeSchema>;
