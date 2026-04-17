import * as migration_20251212_030408_add_transfer_id_to_plants from './20251212_030408_add_transfer_id_to_plants';
import * as migration_20260417_152007 from './20260417_152007';

export const migrations = [
  {
    up: migration_20251212_030408_add_transfer_id_to_plants.up,
    down: migration_20251212_030408_add_transfer_id_to_plants.down,
    name: '20251212_030408_add_transfer_id_to_plants',
  },
  {
    up: migration_20260417_152007.up,
    down: migration_20260417_152007.down,
    name: '20260417_152007'
  },
];
