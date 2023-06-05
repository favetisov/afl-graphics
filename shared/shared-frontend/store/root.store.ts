export type RootStoreHydration = {};

export class RootStore {
  stores: Array<any>;

  constructor() {}

  hydrate(data: RootStoreHydration) {}
}
