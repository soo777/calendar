import { message } from "antd";
import RecruitApi from "../api/RecruitApi";
import { RecruitType } from "type/type";

export function RecruitStore() {
  const { getRecruitListApi } = RecruitApi();

  /**
   * 채용 공고 목록 조회
   */
  const getRecruitList = async () => {
    try {
      const data = await getRecruitListApi();
      const arr: RecruitType[] = [];
      data.forEach((item: RecruitType) => {
        arr.push({ ...item, view: false });
      });
      return arr;
    } catch (e: any) {
      message.error(e.message);
      return;
    }
  };

  return { getRecruitList };
}

export default RecruitStore;
