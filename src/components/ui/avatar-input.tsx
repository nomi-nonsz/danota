'use client'

import { forwardRef, useCallback } from 'react'

import { CldUploadWidget } from "next-cloudinary";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui//avatar';
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const UPLOAD_PRESET = 'cksiv1gw';

interface AvatarInputProps {
  className?: string;
  field: React.InputHTMLAttributes<HTMLInputElement>
}

export const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(
  ({ className, field }, ref) => {
    const handleSuccess = useCallback((result: any) => {
      field.onChange?.(result.info.secure_url);
    }, [field.onChange]);

    return (
      <CldUploadWidget
        onSuccess={handleSuccess}
        uploadPreset={UPLOAD_PRESET}
        options={{
          maxFiles: 1
        }}
      >
        {({ open }) => (
          <div className={cn("w-48 h-48 mx-auto", className)}>
            <Label 
              htmlFor={field.name}
              onClick={() => open?.()}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-full cursor-pointer overflow-hidden",
                "border-gray-300 bg-gray-50 hover:bg-gray-100",
                "dark:border-neutral-600 dark:bg-background hover:dark:bg-accent",
                field.value && "border-none",
                field.disabled && "opacity-70"
              )}
            >
              {field.value ? (
                <Avatar className='w-full h-full hover:opacity-70 transition'>
                  <AvatarImage
                    src={field.value.toString()}
                    className='object-cover'
                  />
                  <AvatarFallback>Your Profile</AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Upload image</span>
                  </p>
                </div>
              )}
              <Input
                disabled={field.disabled}
                id={field.name}
                type="text"
                accept="image/*"
                className="hidden"
                ref={ref}
              />
            </Label>
          </div>
        )}
      </CldUploadWidget>
    );
  }
);