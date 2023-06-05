export interface FilterInterface {
  title: string;
  key: string;
  options: Array<{
    label: string;
    key: string;
    condition: (item: any) => boolean;
    selected: boolean;
  }>;
}

export const getActiveFilterConditions = (filters: FilterInterface[]): Array<(a: any) => boolean> =>
  filters.reduce((c, f) => [...c, f.options.find(o => o.selected)?.condition], []);
