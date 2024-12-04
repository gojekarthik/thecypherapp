import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "title must be of atleast 3 charectors"),
  description: z
    .string()
    .min(10, "Description must be of atleast 10 charectors")
    .max(400, "description must not exceet 400 charectors"),
  location: z
    .string()
    .min(3, "location must be of minimum 3 charectors")
    .max(400, "location must be less than 400 charectors"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().optional(),
});
