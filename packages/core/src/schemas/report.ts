import { z } from 'zod';

export const reportReasonSchema = z.enum([
  'spam',
  'harassment',
  'fake',
  'inappropriate_content',
  'other',
]);
export type ReportReason = z.infer<typeof reportReasonSchema>;

export const reportInsertSchema = z.object({
  reported_id: z.string().uuid(),
  reason: reportReasonSchema,
  context: z.string().max(500).optional(),
  message_id: z.string().uuid().optional(),
});
export type ReportInsert = z.infer<typeof reportInsertSchema>;
