import { CSSProperties } from 'react';

export interface IPivotColDefs {
  key: string;
  text: string;
  style?: CSSProperties;
  order?: number;
  orderBy?: 'ASC' | 'DESC';
  showTotal?: boolean;
  total?: (def: IPivotColDefs, value: any) => string | number;
  formatter?: (value: any) => any;
  sort?: (def: IPivotColDefs, items: any, order: 'asc' | 'desc') => any;
}

export interface IPivotProps<T> {
  theme?: 'light' | 'dark';
  defaultGroupKeys?: string[];
  defaultSelectedColumns?: string[];
  groupKeys: string[];
  colDefs: IPivotColDefs[];
  pivotItem: T[];
  showConfig: boolean;
  maxGroupCount?: number;
  onChangeSelectedColumns?: (list: string[]) => void;
  onChangeGroupColumns?: (list: string[]) => void;
}
