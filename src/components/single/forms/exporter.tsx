'use client'

import { useEffect, useState } from "react";
import axios from "axios";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ExportType, getExportTypeValue } from "@/types/enums";
import type { NoteClient } from "@/types/prisma";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  DownloadIcon,
  FileTextIcon,
  LoaderCircleIcon
} from "lucide-react";
// import { DocumentPreview } from "@/components/ui/document-preview";

const exporterSchema = z.object({
  name: z.string(),
  exportType: z.enum(['pdf', 'docx', 'html'])
})

const ExporterInput = ({
  name, value, field
}: {
  name: string,
  value: ExportType,
  field: {
    value: typeof exporterSchema._type.exportType,
    onChange: (type: typeof exporterSchema._type.exportType) => void
  }
}) => {
  return <Button
    type="button"
    variant={"outline-2"}
    className={cn('px-8', field.value === value && 'bg-foreground text-background hover:bg-foreground/40')}
    onClick={() => field.onChange(value)}
  >
    {name}
  </Button>
}

export const Exporter = ({
  noteId, onModalClose
}: {
  noteId: string | number,
  onModalClose?: () => void,
}) => {
  const { toast } = useToast();
  const [note, setNote] = useState<NoteClient | null>(null);

  const [exportPending, setExportPending] = useState<boolean>(false);
  
  const form = useForm<z.infer<typeof exporterSchema>>({
    resolver: zodResolver(exporterSchema),
    defaultValues: {
      exportType: ExportType.PDF
    },
  })
 
  async function onSubmit(values: z.infer<typeof exporterSchema>) {
    try {
      setExportPending(true);
      const res = await axios.get(`/api/notes/${noteId}/export`, {
        params: {
          filename: values.name,
          type: values.exportType
        },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${values.name}.${values.exportType}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to export the file, please try again later',
        variant: 'destructive'
      });
    }
    finally {
      setExportPending(false);
    }
  }

  const onExportClick = (type: ExportType) => {
    form.setValue('exportType', type);
  }

  const fetchNote = async () => {
    try {
      const res = await axios.get<{ data: NoteClient | null }>(`/api/notes/${noteId}`);
      const { data } = res.data;
      setNote(data);
      form.setValue('name', data?.title ?? form.getValues('name'));
    }
    catch (err) {
      onModalClose?.();
      toast({
        title: 'Error',
        description: 'Failed to get the note data, try again later',
        variant: 'destructive'
      });
    }
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <ExporterInput name="PDF" value={ExportType.PDF} field={field}/>
                  <ExporterInput name="DOCX" value={ExportType.DOCX} field={field} />
                  <ExporterInput name="HTML" value={ExportType.HTML} field={field} />
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
          isLoading={exportPending}
        >
          <DownloadIcon />
          Download
        </Button>
      </form>
    </Form>
  )
}