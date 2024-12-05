import { DutyType } from "type/type";

/**
 * 해당 월 달력 만들기
 */
export const getWeekArr = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1 - firstDayOfMonth.getDay());

  const lastDayOfMonth = new Date(year, month + 1, 0);
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  const weekArr = makeWeekArr(startDay, endDay);
  return weekArr;
};

/**
 *  날짜를 주 단위로 만들기
 */
const makeWeekArr = (startDay: Date, endDay: Date) => {
  const weeks = [];
  let currentWeek = [];
  const currentDate = new Date(startDay);

  while (currentDate <= endDay) {
    currentWeek.push(new Date(currentDate));
    if (currentWeek.length === 7 || currentDate.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
};

/**
 * 날짜 비교
 */
export const diffDate = (date: any, recruitDay: any) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + `${date.getMonth() + 1}`
      : date.getMonth() + 1;
  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

  const convertDate = `${year}-${month}-${day}`;
  return convertDate === recruitDay.substring(0, 10) ? true : false;
};

/**
 * 직무 한글 변환
 */
export const convertDuty = (dutyArr: number[], duties: DutyType[]) => {
  const arr: DutyType[][] = [];
  dutyArr.forEach((item) => {
    arr.push(duties.filter((duty) => duty.id === item));
  });

  let str = "";
  arr.forEach((item) => {
    str = str + `${item[0].name} `;
  });
  return str;
};
