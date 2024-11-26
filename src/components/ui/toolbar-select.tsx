'use client'

import { useEffect, useState } from "react";
import { Button } from "./button"
import type { Editor } from "@tiptap/react";
import { IToolbar, ToolbarButton } from "./toolbar-button";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";

export const ToolbarSelect = ({
  editor,
  data,
  defaultv,
  direction
} : {
  editor: Editor
  data: IToolbar[],
  defaultv?: string,
  direction?: 'horizontal' | 'vertical'
}) => {
  defaultv = defaultv ?? data[0].name;
  const [show, setShow] = useState<boolean>(false);

  const [selected, setSelected] = useState<string>(defaultv);

  const isDirectionVertical = (direction && direction === "vertical");

  const toggleShow = () => setShow(val => !val);

  // idk bruh, i give up 😭️🙏️
  useEffect(() => {
    setTimeout(() => {
      if (!show)
      editor.chain().focus();
    }, 200);
  }, [show])

  return (
    <Popover open={show} onOpenChange={setShow}>
      <div className={cn(
        "flex",
        isDirectionVertical ? "flex-col" : "flex-row"
      )}>
        <ToolbarButton {...data.filter(val => val.name === selected)[0]} />
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "p-0 [&_svg]:size-3",
              isDirectionVertical ? "w-12 h-5" : "w-5 h-12"
            )}
            onClick={toggleShow}
          >
            {isDirectionVertical
              ? <ChevronLeftIcon />
              : <ChevronDownIcon />}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className={cn(
          "flex bg-white w-fit p-1 rounded-lg border shadow-md",
          isDirectionVertical ? "flex-row right-14 top-0" : "flex-col bottom-14"
        )}
        side={isDirectionVertical ? "right" : "bottom"}
      >
        {data
          .filter(val => val.name !== selected)
          .reverse()
          .map((toolbar: IToolbar, i) => (    
          <ToolbarButton
            key={toolbar.name}
            {...toolbar}
            onClick={() => {
              setShow(false);
              setSelected(toolbar.name);
              toolbar.onClick?.();
            }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}