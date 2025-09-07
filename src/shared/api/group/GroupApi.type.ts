export interface Group {
  id: number;
  campId: number;
  name: string;
  parentId: number;
  children?: Group[];
}
