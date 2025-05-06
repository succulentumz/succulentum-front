import { useIsFetching } from '@tanstack/react-query';

export const useIsLoading = (...args: Parameters<typeof useIsFetching>) =>
  useIsFetching(...args) > 0;
