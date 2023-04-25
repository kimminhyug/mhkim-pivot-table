import { IPivotColDefs } from '../../types/pivot.types';

export interface IPivotCardProps<T = any> {
  groupKey?: string;
  items?: T[];
  selectedColumns?: string[];
  collapseKeys?: string[];
  marginLeft?: number;
  collapseIndex?: number;
  colDefs?: IPivotColDefs[];
  theme: 'light' | 'dark';
}
