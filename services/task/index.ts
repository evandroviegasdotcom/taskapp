"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

function revalidatePageData() {
  revalidatePath("/", "layout");
}
export async function createTask(task: Prisma.TaskCreateArgs["data"]) {
  await prisma.task.create({
    data: {
      description: task.description || "",
      status: task.status,
      title: task.title,
      ownerId: task.ownerId as string,
      createdAt: task.createdAt
    },
  });
  revalidatePageData();
}

export async function getTasks() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const userId = session?.user.id
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" }, where: { ownerId: userId } });
  return tasks;
}
export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePageData();
}

export async function updateTask(task: Task) {
  await prisma.task.update({
    where: { id: task.id },
    data: task,
  });
  revalidatePageData();
}

export async function getTaskCountByStatus() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const userId = session?.user.id

  const [starting, progress, done] = await Promise.all([
    prisma.task.count({ where: { status: "starting", ownerId: userId } }),
    prisma.task.count({ where: { status: "progress", ownerId: userId } }),
    prisma.task.count({ where: { status: "done", ownerId: userId } })
  ])
  return { starting, progress, done };
}
