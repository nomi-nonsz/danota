'use client'

import {
  SaveIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useContext } from "react";

import { Button } from "./button"
import { SeparatorLite } from "./separator";

import { useToolbarPosition } from "@/hooks/use-toolbar";
import { CanvasEditorContext } from "@/hooks/use-canvas-editor";

import { HeadingToolbar } from "./toolbars/heading";
import { BoldToolbar } from "./toolbars/bold";
import { ToolbarMenu } from "./toolbar-menu";
import { UnderlineToolbar } from "./toolbars/underline";
import { ItalicToolbar } from "./toolbars/italic";
import { LinkToolbar } from "./toolbars/link";
import { BulletListToolbar, OrderedListToolbar } from "./toolbars/list";

export const Toolbar = () => {
  const { editor } = useContext(CanvasEditorContext);
  const toolbarPos = useToolbarPosition();

  const isToolbarBottom = toolbarPos.position === 'bottom';
  const toolbarDirection = isToolbarBottom ? "flex-row" : "flex-col";

  if (!editor) {
    return null;
  }

  const onSave = () => {
    console.log(editor.getHTML());
  }

  return (
    <div className={cn("flex rounded-2xl bg-background border w-fit shadow-lg", toolbarDirection)}>
      <section className={cn("p-2 flex gap-2", toolbarDirection)}>
        <HeadingToolbar
          editor={editor}
          direction={isToolbarBottom ? "horizontal" : "vertical"}
        />
        <BoldToolbar editor={editor} />
        <UnderlineToolbar editor={editor} />
        <ItalicToolbar editor={editor} />
        <BulletListToolbar editor={editor} />
        <OrderedListToolbar editor={editor} />
        <LinkToolbar editor={editor} />
      </section>
      <SeparatorLite
        orientation={isToolbarBottom ? "vertical": "horizontal"}
        className={isToolbarBottom ? "h-16": "w-16"}
      />
      <section className={cn("p-2 flex gap-2", toolbarDirection)}>
        <ToolbarMenu
          bottom={isToolbarBottom}
          onMoveTo={toolbarPos.toggleLB}
        />
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