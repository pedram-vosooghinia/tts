export interface UpdateProfileDto {
  first_name: string;
  last_name: string;
  mobile: string;
}

export type ProfileFormValues = UpdateProfileDto;
