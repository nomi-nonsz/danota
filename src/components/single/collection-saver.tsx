'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const CollectionSaver = ({
  noteId
}: {
  noteId: string | number
}) => {
  return (
    <div className="flex flex-col gap-3 mt-3">
      <div className="">
        <Input className="p-5" placeholder="Search collection..." />
      </div>
      <div className="h-[360px] overflow-y-scroll flex flex-col gap-3 p-2">
        {Array(10).fill("").map((_, i) => (
          <button className="bg-background border p-3 rounded-md text-left" key={i}>
            coll {i}
          </button>
        ))}
      </div>
      <Button className="py-6 text-md">
        Save
      </Button>
    </div>
  )
}