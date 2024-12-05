import { atom } from "recoil";
import { DutyType, RecruitArrType, RecruitType } from "type/type";

interface RecruitAtomType {
  recruitArr: RecruitArrType[][];
}

interface DutyAtomType {
  dutyOriginArr: number[];
  dutyArr: number[];
  duties: DutyType[];
}

interface ModalAtomType {
  openFlag: boolean;
  recruitInfo: RecruitType | null;
}

export const recruitState = atom<RecruitAtomType>({
  key: "recruitState",
  default: {
    recruitArr: [],
  },
});

export const dutyState = atom<DutyAtomType>({
  key: "dutyState",
  default: {
    dutyOriginArr: [],
    dutyArr: [],
    duties: [],
  },
});

export const modalState = atom<ModalAtomType>({
  key: "modalState",
  default: {
    openFlag: false,
    recruitInfo: null,
  },
});
