import { getTaskCountByStatus } from '@/services/task'
import React from 'react'
import ChartsComp from "./charts"
export default async function Charts() {
    const count = await getTaskCountByStatus()
    const data = [
        { status: "starting", count: count.starting, fill: "#ef4444" },
        { status: "progress", count: count.progress, fill: "#f97316"  },
        { status: "done", count: count.done, fill: "#22c55e" },
    ]
    return (
    <ChartsComp data={data} />
  )
}
