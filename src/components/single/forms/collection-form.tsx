'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRefreshAlert } from "@/hooks/use-refresh-alert";
import { useAction } from "@/hooks/use-action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const { post, patch, errorMessage, pending } = useAction();
  const collectionModal = useCollectionModal();

  const form = useForm<z.infer<typeof collectionSchema>>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collectionModal.data?.name ?? '',
      description: collectionModal.data?.description ?? ''
    },
  })

  useRefreshAlert(form.formState.isDirty);
 
  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    try {
      if (!!collectionModal.data) {
        await patch(`/api/collections/${collectionModal.data.id}`, values, {
          success: {
            title: "New collection created!",
          },
          refresh: true
        })
      }
      else {
        await post("/api/collections", values, {
          success: {
            title: "New collection created!",
          },
          refresh: true
        })
      }
      collectionModal.onClose();
    }
    catch (err) {
      console.error(err);
    }
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
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Max 150 characters</FormDescription>
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
          {collectionModal.data ? "Save" : "Create"}
        </Button>
      </form>
    </Form>
  )
}