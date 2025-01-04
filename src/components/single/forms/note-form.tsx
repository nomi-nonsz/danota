'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { useRefreshAlert } from "@/hooks/use-refresh-alert";
import { useAction } from "@/hooks/use-action";
import { useNoteModal } from "@/hooks/disclosures/use-notemodal";

import { ChevronsUpDown, DotIcon, icons } from "lucide-react";
import { categories } from "@/data/categories";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SwitchForm } from "@/components/ui/switch-form";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import { noteSchema } from "@/schemas/note-schema";

export const NoteForm = () => {
  const { post, errorMessage } = useAction();
  const noteModal = useNoteModal();

  const form = useForm<z.infer<typeof noteSchema>>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      isPublic: false,
      allowComment: true
    },
  })

  useRefreshAlert(form.formState.isDirty);
 
  function onSubmit(values: z.infer<typeof noteSchema>) {
    post("/api/notes", values, {
      success: {
        title: "Note created!",
      },
      redirect: (res) => `/note/${res.data.data.id}`,
    }).then(() => {
      noteModal.onClose();
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note title</FormLabel>
              <FormControl>
                <Input placeholder="School resume..." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline-2"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <div className="">
                        {field.value
                          ? categories.find(
                              (category) => category.name === field.value
                            )?.label
                          : "Select category"}
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup className="p-2">
                        {categories.map((category) => {
                          const Icon = icons[category.icon];
                          const selected = category.name === field.value;

                          return <CommandItem
                            className={cn(
                              "[&_svg]:size-auto",
                              selected && "text-primary bg-primary-foreground data-[selected=true]:text-primary"
                            )}
                            value={category.name}
                            key={category.name}
                            onSelect={() => {
                              form.setValue("categoryId", category.name)
                            }}
                          >
                            <div className="flex gap-2">
                              <Icon size={18} />
                              {category.label}
                            </div>
                            <DotIcon
                              size={32}
                              className={cn(
                                "ml-auto text-3xl",
                                selected
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                The category of your note.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <SwitchForm label="Public" field={field} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowComment"
          render={({ field }) => (
            <FormItem>
              <SwitchForm label="Allow comment" field={{ ...field, disabled: !form.getValues("isPublic") }} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="text-sm text-destructive">{errorMessage}</div>
        <Button className="w-full font-bold py-4 h-fit" type="submit">Create</Button>
      </form>
    </Form>
  )
}