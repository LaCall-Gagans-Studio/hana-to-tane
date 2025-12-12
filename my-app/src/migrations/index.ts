import * as migration_20251212_030408_add_transfer_id_to_plants from './20251212_030408_add_transfer_id_to_plants';

export const migrations = [
  {
    up: migration_20251212_030408_add_transfer_id_to_plants.up,
    down: migration_20251212_030408_add_transfer_id_to_plants.down,
    name: '20251212_030408_add_transfer_id_to_plants'
  },
];
