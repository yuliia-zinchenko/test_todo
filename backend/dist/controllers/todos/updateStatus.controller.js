import { updateTodoInDb } from "../../services/todos.service.js";
export const updateStatus = async (req, reply) => {
    const { id } = req.params;
    try {
        const updatedTask = await updateTodoInDb(Number(id), req.body);
        return reply.status(200).send(updatedTask);
    }
    catch (error) {
        return reply.status(404).send({ message: "Task not found" });
    }
};
//# sourceMappingURL=updateStatus.controller.js.map