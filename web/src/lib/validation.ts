import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name."),
  lastName: z.string().min(1, "Please enter your last name."),
  email: z.string().email("Please enter a valid email."),
  phone: z.string().optional().default(""),
  country: z.string().min(1, "Please select your country."),
  investorType: z.string().min(1, "Please choose an investor type."),
  ticket: z.string().min(1, "Please select a commitment range."),
  accredited: z.string().optional().default(""),
  sectors: z.array(z.string()).min(1, "Select at least one sector."),
  message: z.string().optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Please provide consent to continue." }) }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
