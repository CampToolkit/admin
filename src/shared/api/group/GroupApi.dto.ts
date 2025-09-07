export interface CreateGroupDto {
  campId: number;
  name: string;
  parentId: number | null;
}

export interface UpdateGroupDto {
  name?: string;
  parentId?: number | null;
}

export interface CreateGroupBulkDto {
  items: CreateGroupDto[];
}
