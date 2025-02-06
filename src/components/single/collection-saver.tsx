'use client'

import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"

export const CollectionItem = ({
  id,
  name,
  onClick
} : {
  id: string | number,
  name: string,
  onClick?: () => void
}) => {
  const chckbox = useRef<HTMLButtonElement | null>(null);

  const onPress = () => {
    chckbox.current?.click();
  }

  const onCheck = () => {
    onClick?.();
  }

  return (
    <button
      className="bg-background p-3 rounded-md text-left inline-flex items-center gap-2 hover:bg-accent"
      onClick={onPress}
      key={id}
    >
      <Checkbox className="w-5 h-5 border-2 pointer-events-none dark:border-foreground dark:data-[state=checked]:bg-foreground dark:text-background" ref={chckbox} onClick={onCheck} />
      {name}
    </button>
  )
}

export const CollectionSaver = ({
  noteId
}: {
  noteId: string | number
}) => {
  const [selectedCollection, setSelectedCollection] = useState<Set<string | number>>(new Set());

  const onPressed = (collectionId: string | number) => {
    setSelectedCollection((prevCol) => {
      const newSet = new Set(prevCol);

      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      }
      else {
        newSet.add(collectionId);
      }

      return newSet;
    });
  }

  const onSave = () => {
    console.log(selectedCollection);
  }

  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="">
        <Input className="p-5" placeholder="Search collection..." />
      </div>
      <div className="h-[360px] overflow-y-scroll flex flex-col gap-3">
        {Array(10).fill("").map((_, i) => (
          <CollectionItem
            name={`col ${i}`}
            id={i}
            onClick={() => onPressed(i)}
          />
        ))}
      </div>
      <Button className="py-6 text-md" onClick={onSave}>
        Save
      </Button>
    </div>
  )
}