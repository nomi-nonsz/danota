'use client'

import { useState } from "react";
import { Button } from "./button"
import { IToolbar, ToolbarButton } from "./toolbar-button";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";

export const ToolbarSelect = ({
  data,
  defaultv,
  direction
} : {
  data: IToolbar[],
  defaultv?: string,
  direction?: 'horizontal' | 'vertical'
}) => {
  defaultv = defaultv ?? data[0].name;
  
  const [selected, setSelected] = useState<string>(defaultv);
  const [show, setShow] = useState<boolean>(false);

  const displayedData = data.filter(val => val.name !== selected).reverse();
  const selectedTool = data.filter(val => val.name === selected)[0];

  const isDirectionVertical = (direction && direction === "vertical");

  const toggleShow = () => setShow(val => !val);

  return (
    <Popover open={show} onOpenChange={setShow}>
      <div className={cn(
        "flex",
        isDirectionVertical ? "flex-col" : "flex-row"
      )}>
        <ToolbarButton {...selectedTool} />
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
        {displayedData.map((toolbar, i) => (    
          <ToolbarButton
            key={toolbar.name}
            onClick={() => {
              setShow(false);
              setSelected(_ => toolbar.name);
              toolbar.onClick?.();
            }}
            {...toolbar}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}