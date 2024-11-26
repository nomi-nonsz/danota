'use client'

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "./button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ text, className, children, onClick, ...props }, ref) => {
    const [copied, setCopied] = useState<boolean>(false);

    const onCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      navigator.clipboard.writeText(text);
      setCopied(_ => true);

      setTimeout(() => setCopied(_ => false), 1500);
    }

    return (
      <Button
        className={cn(className)}
        variant={'outline-2'}
        ref={ref}
        onClick={onCopy}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="sr-only">copy</span>
      </Button>
    )
  }
)