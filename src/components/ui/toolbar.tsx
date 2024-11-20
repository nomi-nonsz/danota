'use client'

import {
  BoldIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EllipsisVertical,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  Link2Icon,
  PanelBottomIcon,
  PanelRightIcon,
  RefreshCwIcon,
  SaveIcon,
  Settings,
  UnderlineIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useContext, useState } from "react";

import { Button } from "./button"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Badge } from "./badge";
import { SeparatorLite } from "./separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useToolbarPosition } from "@/hooks/use-toolbar";
import { CanvasEditorContext } from "@/hooks/use-canvas-editor";
import { Popover } from "./popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { LinkForm } from "../single/forms/link-form";
import type { Editor } from "@tiptap/react";

export interface IToolbar {
  onClick?: () => void,
  name: string,
  label?: string,
  icon: any,
  hotkey?: React.ReactNode,
  isActive?: boolean,
}

const toolbarHeading: (editor: Editor) => IToolbar[] = (editor) => [
  {
    name: "h1",
    icon: Heading1Icon,
    label: "Heading 1",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    isActive: editor.isActive('heading', { level: 1 })
  },
  {
    name: "h2",
    icon: Heading2Icon,
    label: "Heading 2",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    isActive: editor.isActive('heading', { level: 2 })
  },
  {
    name: "h3",
    icon: Heading3Icon,
    label: "Heading 3",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    isActive: editor.isActive('heading', { level: 3 })
  },
  {
    name: "h4",
    icon: Heading4Icon,
    label: "Heading 4",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 4 }).run();
    },
    isActive: editor.isActive('heading', { level: 4 })
  },
  {
    name: "h5",
    icon: Heading5Icon,
    label: "Heading 5",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 5 }).run();
    },
    isActive: editor.isActive('heading', { level: 5 })
  },
  {
    name: "h6",
    icon: Heading6Icon,
    label: "Heading 6",
    onClick: () => {
      editor.chain().focus().toggleHeading({ level: 6 }).run();
    },
    isActive: editor.isActive('heading', { level: 6 })
  }
]

export const ToolbarButton = ({
  onClick,
  name,
  label,
  icon,
  hotkey,
  isActive
} : IToolbar) => { 
  const Icon = icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "w-12 h-12",
              isActive && "bg-primary-foreground text-primary"
            )}
            variant={"ghost"}
            onClick={onClick}
          >
            <Icon />
            <span className="sr-only">
              {name}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="pointer-events-none">
          <p>
            {label}
            {hotkey && <Badge className="ms-1 bg-border/50 p-1 rounded-sm text-foreground">
              {hotkey}
            </Badge>}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

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

export const Toolbar = () => {
  const { editor } = useContext(CanvasEditorContext);
  const toolbarPos = useToolbarPosition();

  const isToolbarBottom = toolbarPos.position === 'bottom';
  const toolbarDirection = isToolbarBottom ? "flex-row" : "flex-col";

  if (!editor) {
    return null;
  }

  const onBold = () => {
    editor.chain().focus().toggleBold().run();
  }

  const onUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  }

  const onItalic = () => {
    editor.chain().focus().toggleItalic().run();
  }

  const onLink = (url: string) => {
    editor.chain().focus().setLink({ href: url }).run();
  }

  const unLink = () => {
    editor.chain().focus().unsetLink().run();
  }

  const onSave = () => {
    console.log(editor.getHTML());
  }

  return (
    <div className={cn("flex rounded-2xl bg-background border w-fit shadow-lg", toolbarDirection)}>
      <section className={cn("p-2 flex gap-2", toolbarDirection)}>
        <ToolbarSelect
          data={toolbarHeading(editor)}
          direction={isToolbarBottom ? "horizontal" : "vertical"}
        />
        <ToolbarButton
          icon={BoldIcon}
          label="Bold"
          name="bold"
          hotkey="CTRL + B"
          onClick={onBold}
          isActive={editor.isActive('bold')}
        />
        <ToolbarButton
          icon={UnderlineIcon}
          label="Underline"
          name="underline"
          hotkey="CTRL + U"
          onClick={onUnderline}
          isActive={editor.isActive('underline')}
        />
        <ToolbarButton
          icon={ItalicIcon}
          label="Italic"
          name="italic"
          hotkey="CTRL + I"
          onClick={onItalic}
          isActive={editor.isActive('italic')}
        />
        {editor.isActive('link') ? (
          <ToolbarButton
            icon={Link2Icon}
            label="Insert link"
            name="link"
            onClick={unLink}
            isActive
          />
        ) : (
          <Popover>
            <PopoverTrigger>
              <ToolbarButton
                icon={Link2Icon}
                label="Insert link"
                name="link"
              />
            </PopoverTrigger>
            <PopoverContent side="top" className="p-3 bg-background border rounded-md shadow-lg">
              <div className="font-bold mb-2">Insert link</div>
              <LinkForm onSubmit={onLink} />
            </PopoverContent>
          </Popover>
        )}
      </section>
      <SeparatorLite
        orientation={isToolbarBottom ? "vertical": "horizontal"}
        className={isToolbarBottom ? "h-16": "w-16"}
      />
      <section className={cn("p-2 flex gap-2", toolbarDirection)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="font-bold h-12">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2">
              <RefreshCwIcon size={18} />
              Auto save
            </DropdownMenuItem>
            <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2">
              <Settings size={18} />
              Note Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="[&_svg]:size-auto text-sm p-2" onClick={toolbarPos.toggleLB}>
              {isToolbarBottom ? (<>
                <PanelRightIcon size={18} />
                Move to the right
              </>) : (<>
                <PanelBottomIcon size={18} />
                Move to the bottom
              </>)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant={"default"}
          className={cn("flex font-bold h-12", toolbarDirection)}
          onClick={onSave}
        >
          <SaveIcon />
          {isToolbarBottom && "Save"}
        </Button>
      </section>
    </div>
  )
}