import { z } from 'zod';

export const sportSchema = z.enum(['tennis', 'padel']);
export type Sport = z.infer<typeof sportSchema>;

export const genderSchema = z.enum(['male', 'female', 'other', 'prefer_not']);
export type Gender = z.infer<typeof genderSchema>;

export const usernameSchema = z
  .string()
  .min(3)
  .max(32)
  .regex(/^[a-z0-9_]+$/, 'Solo minúsculas, números y _');

export const playerSportSchema = z.object({
  sport: sportSchema,
  level: z.number().min(1.0).max(7.0).multipleOf(0.5, 'El nivel sube de 0.5 en 0.5'),
  years_playing: z.number().int().min(0).max(80).default(0),
  is_primary: z.boolean().default(false),
});
export type PlayerSport = z.infer<typeof playerSportSchema>;

export const profileUpdateSchema = z.object({
  username: usernameSchema,
  full_name: z.string().min(1).max(80),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida (YYYY-MM-DD)')
    .refine((value) => {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return false;
      const ageYears = (Date.now() - d.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      return ageYears >= 16 && ageYears <= 100;
    }, 'Debes tener entre 16 y 100 años')
    .optional(),
  gender: genderSchema.optional(),
  bio: z.string().max(280).optional(),
  city: z.string().max(60).default('Cartagena'),
  neighborhood: z.string().max(60).optional(),
  photos: z.array(z.string().url()).max(6).default([]),
  primary_photo_idx: z.number().int().min(0).max(5).default(0),
  favorite_venues: z.array(z.string().uuid()).max(20).default([]),
  availability: z.record(z.string(), z.array(z.string())).default({}),
});
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
