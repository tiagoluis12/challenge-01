import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/task"),
    handler: (req, res) => {
      const { search } = req.query;

      const task = database.select("task", {
        title: search,
        description: search,
      });

      return res.end(JSON.stringify(task));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/task"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Title is required" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Description is required" }));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("task", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT", // route parameters: indentify a resource
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: "Title and description are required" })
          );
      }

      const [task] = database.select("task", { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.update("task", id, {
        title,
        description,
        updated_at: new Database(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("task", { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE", // route parameters: indentify a resource
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("task", { id });

      if (!task) {
        return res.writeHead(404).end();
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
];
