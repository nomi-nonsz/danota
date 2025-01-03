import { useEffect, useRef, useState } from "react";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useNoteStore } from "@/hooks/use-note-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const EditableTitle = ({
  prevTitle
}: {
  prevTitle: string | null
}) => {
  const noteStore = useNoteStore();

  const [oldTitle, setOldTitle] = useState<string>(prevTitle ?? '');
  const [editMode, setEditoMode] = useState<boolean>(false);
  const editRef = useRef<HTMLInputElement | null>(null);

  const toggle = () => setEditoMode(!editMode);

  const onSave = () => {
    const newTitle = editRef.current?.value ?? "";
    noteStore.save();
    setEditoMode(false);
    setOldTitle(newTitle);
  }

  const toggleEdit = () => {
    if (editMode) noteStore.set('title', oldTitle);
    toggle();
  }

  useEffect(() => {
    if (editMode) editRef.current?.focus();
  }, [editMode]);
  
  return (
    <header className="flex gap-2 items-center">
      {editMode ? (
        <form onSubmit={(e) => { e.preventDefault(); onSave() }}>
          <Input
            ref={editRef}
            className="text-3xl font-bold p-1 w-fit"
            defaultValue={prevTitle ?? ""}
            onChange={(e) => {
              noteStore.set('title', e.target.value);
            }}
          />
        </form>
      ) : (
        <h1 className="text-3xl font-bold">{prevTitle}</h1>
      )}
      {editMode && <Button variant={"ghost"} className="[&_svg]:size-auto" onClick={onSave}>
        <CheckIcon className="text-muted-foreground" />
      </Button>}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="p-3" asChild>
            <Button variant={"ghost"} className="[&_svg]:size-auto" onClick={toggleEdit}>
              {editMode ? <XIcon className="text-muted-foreground" /> : <PencilIcon className="text-muted-foreground" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit title</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  )
}