export interface ICollection<DateType = Date> {
  id: number;
  ownerId: number;
  name: string;
  description?: string;
  isShared: boolean;
  sharedLink?: string;
  createdAt: DateType;
}

export type ICollectionRaw = ICollection<string>;
