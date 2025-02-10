'use client'

import { useParams, useRouter } from "next/navigation";
import { useAction } from "./use-action"
import { useToast } from "./use-toast";

export const useCollectionGlobalCRUD = () => {
  const { toast } = useToast();
  const action = useAction();
  const { collectionId } = useParams();
  const { refresh } = useRouter();

  const removeNote = async (noteId: string | number) => {
    if (!collectionId) return;

    try {
      await action.remove(`/api/notes/${noteId}/collection/${collectionId}`, {
        success: {
          title: "Note removed from the collection"
        }
      });
      refresh();
    }
    catch (err) {
      toast({
        title: "Failed to remove note from the collection",
        variant: "destructive"
      })
    }
  }

  return {
    removeNote
  }
}