'use client'

import { CloudStatus } from "@/hooks/use-note-store"
import { Badge } from "@/components/ui/badge";

export const CloudStatusBadge = ({
  status
}: {
  status: CloudStatus
}) => {
  switch (status) {
    case CloudStatus.NOT_SAVED: return <Badge variant="warning" className="transition-none">Not saved</Badge>
    case CloudStatus.SAVING: return <Badge variant="warning" className="transition-none">Saving</Badge>
    case CloudStatus.SAVED: return <Badge variant="default" className="transition-none">Saved</Badge>
  }
}