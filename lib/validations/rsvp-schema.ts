import { z } from "zod";

/**
 * Validates RSVP submissions at the Server Action boundary. This is the
 * only place RSVP input is trusted from — never assume data reaching the
 * action already matches this shape, even though the form is typed too.
 */
export const rsvpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Ingresá tu nombre completo.")
      .max(80, "El nombre es demasiado largo."),
    attending: z.enum(["yes", "no"], {
      error: "Contanos si vas a poder acompañarnos.",
    }),
    guestCount: z.coerce
      .number()
      .int()
      .min(1, "Tiene que ser al menos 1.")
      .max(10, "Para grupos de más de 10, escribinos directamente.")
      .optional(),
    dietaryNotes: z.string().trim().max(300, "Máximo 300 caracteres.").optional(),
    message: z.string().trim().max(500, "Máximo 500 caracteres.").optional(),
  })
  .superRefine((value, ctx) => {
    if (value.attending === "yes" && !value.guestCount) {
      ctx.addIssue({
        code: "custom",
        message: "Contanos cuántas personas asisten (incluite vos).",
        path: ["guestCount"],
      });
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;
