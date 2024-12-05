import axios from "axios";

export function RecruitApi() {
  /**
   * 채용 공고 목록 조회
   */
  const getRecruitListApi = async () => {
    const data = await axios.get(
      "https://d1kh1cvi0j04lg.cloudfront.net/api/v1/recruits.json"
    );
    return data.data;
  };

  return { getRecruitListApi };
}

export default RecruitApi;
