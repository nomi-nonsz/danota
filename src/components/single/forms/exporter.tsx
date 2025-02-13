'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { ExportType, getExportTypeValue } from "@/types/enums";
import { cn } from "@/lib/utils";
import type { NoteClient } from "@/types/prisma";
import axios from "axios";
import { DownloadIcon, FileTextIcon, LoaderCircleIcon } from "lucide-react";
import { DocumentPreview } from "@/components/ui/document-preview";

const exporterSchema = z.object({
  name: z.string(),
  exportType: z.enum(['pdf', 'docx'])
})

// neeed to refactor
const ExporterInput = ({
  name, selected, onClick
}: {
  name: string,
  selected?: boolean
  onClick?: () => any
}) => {
  return <Button
    type="button"
    variant={"outline-2"}
    className={cn('px-8', selected && 'bg-foreground text-background hover:bg-foreground/40')}
    onClick={onClick}
  >
    {name}
  </Button>
}

export const Exporter = ({
  noteId
}: {
  noteId: string | number
}) => {
  const [note, setNote] = useState<NoteClient | null>(null);
  
  const form = useForm<z.infer<typeof exporterSchema>>({
    resolver: zodResolver(exporterSchema),
    defaultValues: {
      exportType: ExportType.PDF
    },
  })
 
  async function onSubmit(values: z.infer<typeof exporterSchema>) {
    
  }

  const onExportClick = (type: ExportType) => {
    form.setValue('exportType', type);
  }

  const fetchNote = async () => {
    const res = await axios.get<{ data: NoteClient | null }>(`/api/notes/${noteId}`);
    const { data } = res.data;
    setNote(data);
    form.setValue('name', data?.title ?? form.getValues('name'));
  }

  useEffect(() => {
    fetchNote();
  }, []);

  if (!note) {
    return (
      <div className="m-auto">
        <LoaderCircleIcon className="loading-icon animate-spin" />
      </div>
    )
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>
              <div className="flex gap-2">
                <FormControl className="flex">
                  <Input placeholder="document" {...field} />
                </FormControl>
                <div className="flex items-center px-3 border gap-2 rounded-md">
                  {`.${form.watch('exportType')}`}
                  <FileTextIcon size={18} strokeWidth={1.7} />
                </div>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exportType"
          render={() => (
            <FormItem>
              <FormLabel>Format</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <ExporterInput name="PDF" onClick={() => onExportClick(ExportType.PDF)} selected={form.getValues('exportType') === ExportType.PDF} />
                  <ExporterInput name="DOCX" onClick={() => onExportClick(ExportType.DOCX)} selected={form.getValues('exportType') === ExportType.DOCX} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <FormItem>
          <FormLabel>Preview</FormLabel>
          <FormControl>
            <DocumentPreview content={note.content} />
          </FormControl>
        </FormItem> */}
        <Button
          className="w-full text-base font-bold py-4 h-fit"
          type="submit"
        >
          <DownloadIcon />
          Download
        </Button>
      </form>
    </Form>
  )
}