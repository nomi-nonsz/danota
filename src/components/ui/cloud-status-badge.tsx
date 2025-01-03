'use client'

import { CloudStatus } from "@/hooks/use-note-store"
import { Badge } from "@/components/ui/badge";

export const CloudStatusBadge = ({
  status
}: {
  status: CloudStatus
}) => {
  switch (status) {
    case CloudStatus.NOT_SAVED: return <Badge variant="warning">Not saved</Badge>
    case CloudStatus.SAVING: return <Badge variant="warning">Saving</Badge>
    case CloudStatus.SAVED: return <Badge variant="default">Saved</Badge>
  }
}