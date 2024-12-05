export interface RecruitType {
  company_name: string;
  duty_ids: Array<number>;
  end_time: string;
  id: number;
  image_url: string;
  start_time: string;
  title: string;
  view: boolean;
}

export interface RecruitArrType {
  date: Date;
  recruits: Array<RecruitType>;
}

export interface DutyType {
  id: number;
  name: string;
  parent_id: number;
  root_id: number | null;
  checked: boolean;
}
