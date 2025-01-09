import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateNoteOrder (sort?: string, order?: string) {
  let trueSort = 'updatedAt';
  let trueOrder = 'desc';

  if (!sort || !order) return { [trueSort]: trueOrder }

  switch (sort) {
    case 'title': trueSort = 'title'; break;
    case 'date': trueSort = 'updatedAt'; break;
    default: trueSort = 'updatedAt';
  }

  trueOrder = order;

  if (!["desc", "order"].includes(order)) {
    trueOrder = 'desc';
  }

  return { [trueSort]: trueOrder }
}