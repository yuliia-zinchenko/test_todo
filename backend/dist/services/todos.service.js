import prisma from "../db/prisma.js";
import {} from "../schemas/todo.schema.js";
import { Prisma } from "@prisma/client";
export const buildWhere = (query) => {
    const { search, status } = query;
    const where = {};
    if (search) {
        where.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { text: { contains: search, mode: "insensitive" } },
        ];
    }
    if (status && status !== "all") {
        where.done = status === "done";
    }
    return where;
};
export const buildOrderBy = (sort) => {
    if (sort === "asc")
        return [{ priority: "asc" }, { id: "desc" }];
    if (sort === "desc")
        return [{ priority: "desc" }, { id: "desc" }];
    return [{ id: "desc" }];
};
export const getTodosFromDb = async (query) => {
    const page = parseInt(query.page || "1", 10);
    const limitNumber = parseInt(query.limit || "10", 10);
    const where = buildWhere(query);
    const orderBy = buildOrderBy(query.sort);
    const tasks = await prisma.task.findMany({
        where,
        orderBy,
        skip: (page - 1) * limitNumber,
        take: limitNumber,
    });
    const totalCount = await prisma.task.count({ where });
    return {
        items: tasks,
        pagination: {
            page,
            limit: limitNumber,
            total: totalCount,
            totalPages: Math.ceil(totalCount / limitNumber),
            hasNext: page < Math.ceil(totalCount / limitNumber),
            hasPrev: page > 1,
        },
    };
};
export const createTodoInDb = async (data) => {
    return prisma.task.create({
        data: {
            title: data.title,
            text: data.text || null,
            priority: data.priority || 1,
        },
    });
};
export const updateTodoInDb = async (id, data) => {
    return prisma.task.update({
        where: { id },
        data: {
            title: data.title,
            text: data.text ?? null,
            priority: data.priority ?? 1,
            done: data.done ?? false,
        },
    });
};
export const deleteTodoInDb = async (id) => {
    return prisma.task.delete({
        where: { id },
    });
};
//# sourceMappingURL=todos.service.js.map