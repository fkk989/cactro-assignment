import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED']),
});

export const taskUpdateSchema = taskSchema.partial()

export type TTaskInput = z.infer<typeof taskSchema>;
export type TUpdateTaskInput = z.infer<typeof taskUpdateSchema>;