import { useIsMutating } from '@tanstack/react-query';

export const useIsUpdating = (...args: Parameters<typeof useIsMutating>) =>
  useIsMutating(...args) > 0;
