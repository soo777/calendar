import React, { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import RecruitStore from "service/Recruit/store/RecruitStore";
import { diffDate, getWeekArr } from "util/util";
import { RecruitArrType, RecruitType } from "type/type";
import DutyBox from "components/DutyBox";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dutyState,
  modalState,
  recruitState,
} from "service/Common/atoms/CommonAtom";
import DetaillModal from "components/DetialModal";

const Calendar = () => {
  const dayArr = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [weekArr, setWeekArr] = useState<Date[][]>([]);
  const [recruits, setRecruits] = useState<RecruitType[]>([]);
  const [recruitStates, setRecuritStates] = useRecoilState(recruitState);
  const dutyStates = useRecoilValue(dutyState);
  const [modalStates, setModalStates] = useRecoilState(modalState);
  const { getRecruitList } = RecruitStore();

  useEffect(() => {
    const weekArr = getWeekArr(currentDate);
    setWeekArr(weekArr);
    getRecruits(weekArr);
  }, []);

  /**
   * 공고 조회
   */
  const getRecruits = async (weekArr: Date[][]) => {
    const recruits = await getRecruitList();
    makeMonthlyRecruits(weekArr, recruits!);
    setRecruits(recruits!);
  };

  /**
   * 월 공고 리스트 만들기
   */
  const makeMonthlyRecruits = (weekArr: Date[][], recruits: RecruitType[]) => {
    const recruitsArr: RecruitArrType[][] = [];
    let tmpWeekArr: RecruitArrType[] = [];
    weekArr.forEach((week) => {
      week.forEach((day) => {
        const recruit = recruits.filter(
          (recruit: RecruitType) =>
            diffDate(day, recruit.start_time) || diffDate(day, recruit.end_time)
        );
        tmpWeekArr.push({ date: day, recruits: recruit });
      });
      recruitsArr.push(tmpWeekArr);
      tmpWeekArr = [];
    });
    setRecuritStates({ recruitArr: recruitsArr });
  };

  /**
   * 월 이동(달력)
   */
  const handleMonth = (typr: string) => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      typr === "next" ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(new Date(nextMonth));
    const weekArr = getWeekArr(nextMonth);
    setWeekArr(weekArr);
    makeMonthlyRecruits(weekArr, recruits);
  };

  return (
    <>
      {modalStates.openFlag && <DetaillModal />}

      <div className="justify-items-center">
        <DutyBox />
        <div className="w-full justify-items-center">
          <div className="mt-5 mb-5">
            <LeftOutlined
              className="cursor-pointer mr-3"
              onClick={() => {
                handleMonth("prev");
              }}
            />
            <span className="text-xl font-bold text-orange-600 ">
              {`${currentDate.getFullYear()}. ${currentDate.getMonth() + 1}`}
            </span>
            <RightOutlined
              className="cursor-pointer ml-3"
              onClick={() => {
                handleMonth("next");
              }}
            />
          </div>
          <div className="flex w-full justify-around text-center bg-gray-100 border-solid border-t-2">
            {dayArr.map((day, index) => {
              return <div key={index}>{day}</div>;
            })}
          </div>
          {recruitStates.recruitArr.length > 0 &&
            recruitStates.recruitArr.map((week, index) => {
              return (
                <div
                  className="flex w-full justify-around text-center"
                  key={index}
                >
                  {week.map((data, index) => {
                    return (
                      <div key={index} className="w-[15%]">
                        <div className="border-solid border-t-2 border-r-2 border-b-[3px]">
                          {data.date.getDate()}
                        </div>
                        <div className="border-r-2 h-full">
                          {data.recruits
                            .filter((item) =>
                              dutyStates.dutyArr.some((text) =>
                                item.duty_ids.includes(text)
                              )
                            )
                            .sort((a, b) => b.id - a.id)
                            .map((item: RecruitType) => {
                              return (
                                <div
                                  className={`text-left cursor-pointer ${item.view ? "opacity-50" : "opacity-100"}`}
                                  key={item.id}
                                  onClick={() => {
                                    const newRecruits = recruits.map((item2) =>
                                      item.id === item2.id
                                        ? { ...item2, view: true }
                                        : item2
                                    );
                                    makeMonthlyRecruits(weekArr, newRecruits);
                                    setRecruits(newRecruits);
                                    setModalStates({
                                      openFlag: true,
                                      recruitInfo: item,
                                    });
                                  }}
                                >
                                  <span
                                    className={`${diffDate(data.date, item.start_time) && "text-orange-500"}`}
                                  >
                                    {diffDate(data.date, item.start_time)
                                      ? "[시]"
                                      : "[끝]"}
                                  </span>
                                  <span>{item.company_name}</span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
