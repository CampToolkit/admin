export interface CreateActivityTypeDto {
  name: string;
}

// eslint-disable-next-line
export interface UpdateActivityTypeDto extends Partial<CreateActivityTypeDto> {}

export interface UpdateActivityTypeBulkDto {
  items: CreateActivityTypeDto[];
}
