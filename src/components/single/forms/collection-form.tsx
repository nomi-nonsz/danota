'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRefreshAlert } from "@/hooks/use-refresh-alert";
import { useAction } from "@/hooks/use-action";

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
import { Textarea } from "@/components/ui/textarea";
import { collectionSchema } from "@/schemas/note-schema";
import { useCollectionModal } from "@/hooks/disclosures/use-collection-modal";

export const CollectionCreationForm = () => {
  const { post, errorMessage, pending } = useAction();
  const collectionModal = useCollectionModal();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: '',
      description: ''
    },
  })

  useRefreshAlert(form.formState.isDirty);
 
  function onSubmit(values: z.infer<typeof collectionSchema>) {
    post("/api/collections", values, {
      success: {
        title: "New collection created!",
      },
      refresh: true
    }).then(() => {
      collectionModal.onClose();
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection title</FormLabel>
              <FormControl>
                <Input placeholder="Resume collection..." {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="(Max 150 characters)" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="text-sm text-destructive">{errorMessage}</div>
        <Button
          className="w-full text-base font-bold py-4 h-fit"
          type="submit"
          isLoading={pending}
        >
          Create
        </Button>
      </form>
    </Form>
  )
}