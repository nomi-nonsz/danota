'use client'

import { useEffect, useRef, useState } from "react"
import { Collection } from "@prisma/client"

import { LoaderCircleIcon } from "lucide-react"
import axios from "axios"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { useAction } from "@/hooks/use-action"
import { useToast } from "@/hooks/use-toast"
import { useDebouncedCallback } from "use-debounce"

type OnlyIdNote = {
  id: string
};

export const CollectionItem = ({
  id,
  name,
  defaultChecked,
  onClick
} : {
  id: string | number,
  name: string,
  defaultChecked?: boolean,
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
      <Checkbox
        className="w-5 h-5 border-2 pointer-events-none dark:border-foreground dark:data-[state=checked]:bg-foreground dark:text-background"
        ref={chckbox}
        defaultChecked={defaultChecked}
        onClick={onCheck}
      />
      {name}
    </button>
  )
}

export const CollectionSaver = ({
  noteId,
  onToggle
}: {
  noteId: string | number
  onToggle?: () => void
}) => {
  const { toast } = useToast();
  const [collections, setCollections] = useState<(Collection & { notes: OnlyIdNote[] | null })[] | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Set<string | number>>(new Set());

  const action = useAction();

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

  const onSave = async () => {
    try {
      await action.patch(`/api/notes/${noteId}/collection`, {
        // @ts-ignore
        collectionIds: [...selectedCollection]
      });
      onToggle?.();
    }
    catch (err) {
      toast({
        title: "Failed to add to collection",
        variant: 'destructive'
      })
    }
  }

  const getCollections = async (page?: number, searchQuery?: string) => {
    const reqParams = new URLSearchParams();
    if (page) reqParams.set('page', page.toString());
    if (searchQuery) reqParams.set('q', searchQuery);

    const res = await axios.get<{data: (Collection & { notes: OnlyIdNote[] | null })[]}>(`/api/collections?${reqParams.toString()}`);
    const { data } = res.data;

    setCollections(data);
    setSelectedCollection((prevCol) => {
      const newSet = new Set(prevCol);
      data.forEach((collection) => {
        if (!!collection.notes?.find(note => note.id === noteId)) {
          newSet.add(collection.id);
        }
      })
      return newSet;
    })
  }

  const searchCollection = useDebouncedCallback((query) => {
    setCollections(v => null);
    getCollections(0, query);
  }, 500);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchCollection(e.target.value);
  }

  useEffect(() => {
    getCollections(0);
  }, []);

  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="">
        <Input
          className="p-5"
          placeholder="Search collection..."
          onChange={onSearch}
        />
      </div>
      <div className="h-[360px] overflow-y-scroll flex flex-col gap-3">
        {collections ? (
          collections.map((collection) => {
            const isChecked = selectedCollection.has(collection.id);

            return <CollectionItem
              name={collection.name}
              id={collection.id}
              onClick={() => onPressed(collection.id)}
              defaultChecked={isChecked}
            />
          })
        ) : (
          <div className="m-auto">
            <LoaderCircleIcon className="loading-icon animate-spin" />
          </div>
        )}
      </div>
      <Button
        className="py-6 text-md"
        onClick={onSave}
        isLoading={action.pending}
      >
        Save
      </Button>
    </div>
  )
}