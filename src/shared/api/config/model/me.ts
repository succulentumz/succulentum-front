export interface IMe<DateType = Date> {
  id: number;
  username: string;
  email: string;
  createdAt: DateType;
  updatedAt: DateType;
}

export type IMeRaw = IMe<string>;
