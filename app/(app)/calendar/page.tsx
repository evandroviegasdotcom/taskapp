import React from 'react'
import Calendar from './Calendar'
import { getTasks } from '@/services/task'

export default async function Page() {
  const tasks = await getTasks()
  console.log("tasks", tasks)
  return (
    <div>
      <Calendar tasks={tasks} />
    </div>
  )
}
