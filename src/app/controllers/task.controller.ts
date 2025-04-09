import { Response } from "express";
import { AuthenticatedRequest } from "../../utils/types";
import { createResponse } from "../../utils/helpers";
import { Task } from "../../models/task.model";
import { TTaskInput, TUpdateTaskInput } from "../validation/task.validation";

// 
export const getTasks = async (req: AuthenticatedRequest<{ id: string }, {}>, res: Response) => {
  try {
    const userId = req.user?.id!
    const taskId = req.params.id

    const task = await Task.find({ id: taskId, user: userId })

    res.status(200).json(createResponse(true, "Task fetched successfuly", { data: task }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

// 
export const createTask = async (req: AuthenticatedRequest<{}, {}, TTaskInput>, res: Response) => {
  try {
    const userId = req.user?.id!

    const task = await Task.create({ user: userId, ...req.body })

    res.status(200).json(createResponse(true, "Task created successfully", { data: task }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

// 
export const updateTask = async (req: AuthenticatedRequest<{ id: string }, {}, TUpdateTaskInput>, res: Response) => {
  try {
    const userId = req.user?.id!
    const taskId = req.params.id

    const task = await Task.findOne({ _id: taskId, user: userId })

    if (!task) {
      res.status(400).json(createResponse(false, "Task not found"))
      return
    }

    const updatedTask = await Task.findOneAndUpdate({ _id: taskId, user: userId }, req.body, { new: true })

    res.status(200).json(createResponse(true, "Task updated successfully", { data: updatedTask }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

// 
export const deleteTask = async (req: AuthenticatedRequest<{ id: string }, {}>, res: Response) => {
  try {
    const userId = req.user?.id!
    const taskId = req.params.id

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!deletedTask) {
      res.status(400).json(createResponse(false, "Task not found"));
      return;
    }

    res.json(createResponse(true, "Task deleted successfully", { data: deletedTask }));

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}