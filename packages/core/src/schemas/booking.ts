import { z } from 'zod';

export const bookingStatusSchema = z.enum(['pending', 'confirmed', 'cancelled', 'completed']);
export type BookingStatus = z.infer<typeof bookingStatusSchema>;

export const bookingInsertSchema = z
  .object({
    court_id: z.string().uuid(),
    start_at: z.string().datetime({ offset: true }),
    end_at: z.string().datetime({ offset: true }),
    participants: z.array(z.string().uuid()).max(8).default([]),
    match_id: z.string().uuid().optional(),
    notes: z.string().max(200).optional(),
    total_amount: z.number().int().min(0),
    platform_fee: z.number().int().min(0).default(0),
  })
  .refine((value) => new Date(value.end_at) > new Date(value.start_at), {
    message: 'end_at debe ser posterior a start_at',
    path: ['end_at'],
  })
  .refine((value) => new Date(value.start_at) > new Date(), {
    message: 'No se puede agendar en el pasado',
    path: ['start_at'],
  });
export type BookingInsert = z.infer<typeof bookingInsertSchema>;
