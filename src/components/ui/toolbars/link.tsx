'use client'

import type { Editor } from "@tiptap/react"
import { ToolbarButton } from "../toolbar-button"
import { Link2Icon, Link2Off } from "lucide-react"
import { LinkForm } from "@/components/single/forms/link-form"
import { Popover } from "../popover"
import { PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";

export const LinkToolbar = ({
  editor
}: {
  editor: Editor
}) => {
  const run = (url: string) => {
    editor.chain().focus().setLink({ href: url }).run();
  }

  const down = () => {
    editor.chain().focus().unsetLink().run();
  }

  if (editor.isActive('link')) {
    return (
      <ToolbarButton
        icon={Link2Off}
        label="Remove link"
        name="link"
        onClick={down}
        isActive
      />
    )
  }

  return (
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
        <LinkForm onSubmit={run} />
      </PopoverContent>
    </Popover>
  )
}