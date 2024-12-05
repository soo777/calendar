import { message } from "antd";
import RecruitApi from "../api/DutyApi";

export function DutyStore() {
  const { getDutyListApi } = RecruitApi();

  /**
   * 채용 공고 목록 조회
   */
  const getDutyList = async () => {
    try {
      const data = await getDutyListApi();
      return data;
    } catch (e: any) {
      message.error(e.message);
      return;
    }
  };

  return { getDutyList };
}

export default DutyStore;
