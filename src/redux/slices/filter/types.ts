export type SortListType = { name: string; sortBy: string; order: string };

export interface IFilteState {
  categories: string[];
  activeCategory: number;
  activeSortOption: SortListType;
  sortList: SortListType[];
}
