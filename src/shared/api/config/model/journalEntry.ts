import { type IPlant } from '@/shared/api';

export const JournalEntryType = {
  WATERING: 'WATERING',
  REPOTTING: 'REPOTTING',
  FERTILIZING: 'FERTILIZING',
  TREATMENT: 'TREATMENT',
  PRUNING: 'PRUNING',
  DISEASE: 'DISEASE',
} as const;

export type IJournalEntryType = (typeof JournalEntryType)[keyof typeof JournalEntryType];

export const journalEntryTypeValues = Object.values(JournalEntryType);

export const journalEntryTypeVocabulary = new Map<IJournalEntryType, string>([
  ['WATERING', 'Поливка'],
  [`REPOTTING`, 'Пересадка'],
  [`FERTILIZING`, 'Удабривание'],
  [`TREATMENT`, 'Лечение'],
  [`PRUNING`, 'Стрижка'],
  [`DISEASE`, 'Гибель'],
]);

export interface IJournalEntry<DateType = Date> {
  id: number;
  plantId: IPlant['id'];
  title: string;
  description: string;
  createdAt: DateType;
  noteType: IJournalEntryType;
}

export type IJournalEntryRaw = IJournalEntry<string>;
