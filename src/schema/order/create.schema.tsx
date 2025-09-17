import * as z from "zod";

export const createOrderSchema = z.object({
    product_name: z.string().nonempty("Product name is required"),
    order_type: z.enum(["BUY", "SELL"]),
    price: z.number().nonnegative("Price must be non-negative"),
    volume: z.number().nonnegative("Volume must be non-negative"),
    unit: z.string().nonempty("Unit is required"),
  });