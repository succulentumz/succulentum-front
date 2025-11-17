import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { parseISO } from 'date-fns';

import { type IPlant, type IPlantRaw } from '../model';

export const mapperPlant = (plant: IPlantRaw): IPlant => ({
  ...plant,
  birthDate: isNotEmpty(plant.birthDate) ? parseISO(plant.birthDate) : undefined,
  deathDate: isNotEmpty(plant.deathDate) ? parseISO(plant.deathDate) : undefined,
  createdAt: parseISO(plant.createdAt),
  updatedAt: parseISO(plant.updatedAt),
});
