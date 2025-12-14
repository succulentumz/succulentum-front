import { type IPlant } from '@/shared/api';

interface ICommonPlantFilter<DateType = Date>
  extends Omit<
    IPlant,
    'id' | 'ownerId' | 'createdAt' | 'updatedAt' | 'deathDate' | 'birthDate' | 'price'
  > {
  // deathDateFrom: DateType;
  // deathDateTo: DateType;
  // birthDateFrom: DateType;
  // birthDateTo: DateType;
}

export type IPlantFilter = Partial<ICommonPlantFilter<IPlant>>;
