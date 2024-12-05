import axios from "axios";

export function DutyApi() {
  /**
   * 직무 목록 조회
   */
  const getDutyListApi = async () => {
    const data = await axios.get(
      "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/duties.json"
    );
    return data.data;
  };

  return { getDutyListApi };
}

export default DutyApi;
