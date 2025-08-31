export interface CreateGroupDto {
  campId: number;
  name: string;
  parentId?: number;
}

export interface UpdateGroupDto {
  name?: string;
  parentId?: number;
}
