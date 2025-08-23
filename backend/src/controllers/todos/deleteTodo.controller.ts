import type { FastifyRequest, FastifyReply } from "fastify";
import { deleteTodoInDb } from "../../services/todos.service.js";

export const deleteTodo = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;

  try {
    await deleteTodoInDb(Number(id));
    return reply.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    return reply.status(404).send({ message: "Task not found" });
  }
};
