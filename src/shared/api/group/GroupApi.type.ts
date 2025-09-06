export interface Group {
  id: number;
  campId: number;
  name: string;
  parent: null | Group;
  children: Group[];
}
