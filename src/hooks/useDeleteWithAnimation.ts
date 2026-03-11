import { useState } from "react";

/**
 * Encapsulates the optimistic-delete pattern used across all worship management
 * pages: set deletingId immediately (triggers CSS exit animation), then after
 * 300ms fire the mutation and refetch.
 */
export function useDeleteWithAnimation(
  deleteMutation: (opts: { variables: { id: string } }) => Promise<any>,
  refetch: () => Promise<any>,
) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, onDismissConfirm?: () => void) => {
    try {
      setDeletingId(id);
      onDismissConfirm?.();
      setTimeout(async () => {
        try {
          await deleteMutation({ variables: { id } });
          await refetch();
        } finally {
          setDeletingId(null);
        }
      }, 300);
    } catch {
      setDeletingId(null);
    }
  };

  return { deletingId, handleDelete };
}
