# Node.js Ignite Challenge - Task Manager API

## Introduction

Hey folks,


In this challenge, I practically reinforce the **concepts** I've learned in the Ignite track.

## About the Challenge

The API includes the following features:

- Create a task
- List all tasks
- Update a task by `id`
- Remove a task by `id`
- Mark a task as complete by `id`
- And the real challenge: Bulk import tasks from a CSV file

### Routes and Business Rules

- `id` - Unique identifier for each task
- `title` - Title of the task
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed, initially `null`
- `created_at` - Date when the task was created
- `updated_at` - updated to the date when the task was last modified

Routes:

- `POST - /tasks`
  create a task in the database by sending the `title` and `description` in the request body.
  Upon creation, the fields: `id`, `created_at`, `updated_at`, and `completed_at` are automatically populated as per the properties outlined above.

- `GET - /tasks`
  list all tasks stored in the database.
  It should also be possible to search for tasks by `title` and `description`.

- `PUT - /tasks/:id`
  update a task by `id`.
  The request body only accept `title` and/or `description` for updates.
  If only `title` is sent, `description` should not be updated and vice versa.
  Before updating, validate if the `id` corresponds to a task in the database.

- `DELETE - /tasks/:id`
  remove a task by `id`.
  Validate if the `id` corresponds to a task in the database before removal.
  
- `PATCH - /tasks/:id/complete`
  toggle a task's completion status.
  Validate if the `id` corresponds to a task in the database before updating.
