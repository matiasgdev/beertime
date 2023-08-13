import {Measurement} from '../models/Beer';

export const getVolumeUnit = (volume: Measurement) =>
  `${volume.value}${volume.unit.at(0)?.toUpperCase()}`;
