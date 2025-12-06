import { type IPlant } from '@/shared/api';

export interface IJournalEntry<DateType = Date> {
  entryId: number;
  plantId: IPlant['id'];
  title: string;
  description: string;
  createdAt: DateType;
}

export type IJournalEntryRaw = IJournalEntry<string>;
