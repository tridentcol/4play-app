import { z } from 'zod';

export const messageAttachmentSchema = z.object({
  url: z.string().url(),
  kind: z.enum(['image', 'file']),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});
export type MessageAttachment = z.infer<typeof messageAttachmentSchema>;

export const messageInsertSchema = z.object({
  conversation_id: z.string().uuid(),
  body: z.string().min(1).max(2000),
  attachments: z.array(messageAttachmentSchema).max(4).default([]),
});
export type MessageInsert = z.infer<typeof messageInsertSchema>;
