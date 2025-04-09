import { Schema, model, Document } from 'mongoose';

type TaskStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED';

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  important?: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'COMPLETED'],
      required: true,
      default: "PENDING",
    },
    important: { type: Boolean, default: false },
    user: { type: String, required: true, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Task = model<ITask>('Task', TaskSchema);
