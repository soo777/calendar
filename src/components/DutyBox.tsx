import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import DutyStore from "service/Duty/store/DutyStore";
import { dutyState } from "service/Common/atoms/CommonAtom";
import { DutyType } from "type/type";

const DutyBox = () => {
  const { getDutyList } = DutyStore();
  const [selectFlag, setSelectFlag] = useState<boolean>(false);
  const [duties, setDuties] = useState<DutyType[]>([]);
  const [firstDuties, setFirstDuties] = useState<DutyType[]>([]);
  const [secondDuties, setSecondDuties] = useState<DutyType[]>([]);
  const [thridDuties, setThirdDuties] = useState<DutyType[]>([]);
  const [dutyStates, setDutyStates] = useRecoilState(dutyState);

  useEffect(() => {
    getDuties();
  }, []);

  /**
   * 직무 조회
   */
  const getDuties = async () => {
    const data = await getDutyList();
    const dutyArr: DutyType[] = [];
    const dutyIdArr: number[] = [];
    data.forEach((item: DutyType) => {
      dutyArr.push({ ...item, checked: false, root_id: null });
      dutyIdArr.push(item.id);
    });

    setDuties(dutyArr);
    setFirstDuties(dutyArr.filter((item: DutyType) => !item.parent_id));
    setSecondDuties(dutyArr.filter((item: DutyType) => item.parent_id === 1));
    setDutyStates({
      dutyArr: dutyIdArr,
      dutyOriginArr: dutyIdArr,
      duties: data,
    });
  };

  /**
   * 직무 핸들링(1 depth) 체크박스(전체)
   */
  const handleFirstDutyAll = (duty: DutyType, checkedAll: boolean) => {
    const newDuties = duties.map((item: DutyType) =>
      item.id === duty.id || item.parent_id === duty.id
        ? { ...item, checked: checkedAll ? true : false }
        : item
    );
    filterRecruits(newDuties);
    setDuties(newDuties);

    setFirstDuties(
      duties
        .filter((item: DutyType) => !item.parent_id)
        .map((item: DutyType) =>
          item.id === duty.id
            ? { ...item, checked: checkedAll ? true : false }
            : item
        )
    );
    setSecondDuties(
      duties
        .filter((item: DutyType) => item.parent_id === duty.id)
        .map((item: DutyType) =>
          item.parent_id === duty.id
            ? { ...item, checked: checkedAll ? true : false }
            : item
        )
    );
    setThirdDuties([]);
  };

  /**
   * 직무 핸들링(1 depth)
   */
  const handleFirstDuty = (duty: DutyType) => {
    setSecondDuties(
      duties.filter((item: DutyType) => item.parent_id === duty.id)
    );
    setThirdDuties([]);
  };

  /**
   * 직무 핸들링(2 depth) 체크박스(전체)
   */
  const handleSeocndDutyAll = (duty: DutyType, checkedAll: boolean) => {
    const newDuties = duties.map((item: DutyType) =>
      item.id === duty.id || item.parent_id === duty.id
        ? { ...item, checked: checkedAll ? true : false }
        : item
    );
    filterRecruits(newDuties);
    setDuties(newDuties);

    const arr = newDuties.filter(
      (item: DutyType) => item.parent_id === duty.parent_id
    );
    if (!duty.checked) {
      let falseCount = 0;
      arr.forEach((item: DutyType) => {
        if (!item.checked) falseCount++;
      });
      if (falseCount === 0) {
        setFirstDuties(
          firstDuties.map((item: DutyType) =>
            item.id === duty.parent_id ? { ...item, checked: true } : item
          )
        );
      }
    } else {
      setFirstDuties(
        firstDuties.map((item: DutyType) =>
          item.id === duty.parent_id ? { ...item, checked: false } : item
        )
      );
    }

    setSecondDuties(
      duties
        .filter((item: DutyType) => item.parent_id === duty.parent_id)
        .map((item: DutyType) =>
          item.id === duty.id
            ? { ...item, checked: checkedAll ? true : false }
            : item
        )
    );
    setThirdDuties(
      duties
        .filter((item: DutyType) => item.parent_id === duty.id)
        .map((item: DutyType) =>
          item ? { ...item, checked: checkedAll ? true : false } : item
        )
    );
  };

  /**
   * 직무 핸들링(2 depth) 개별
   */
  const handleSeocndDuty = (duty: DutyType) => {
    const thridDuties = duties.filter(
      (item: DutyType) => item.parent_id === duty.id
    );

    if (thridDuties.length > 0) {
      setThirdDuties(thridDuties);
    } else {
      setDuties(
        duties.map((item: DutyType) =>
          item.id === duty.id ? { ...item, checked: !duty.checked } : item
        )
      );
      setSecondDuties(
        duties
          .filter((item: DutyType) => item.parent_id === duty.parent_id)
          .map((item: DutyType) =>
            item.id === duty.id ? { ...item, checked: !duty.checked } : item
          )
      );
    }
  };

  /**
   * 직무 핸들링(3 depth)
   */
  const handleThirdDuty = (duty: DutyType) => {
    const newDuties = duties.map((item: DutyType) =>
      item.id === duty.id ? { ...item, checked: !item.checked } : item
    );
    setDuties(newDuties);
    filterRecruits(newDuties);

    const arr = newDuties.filter(
      (item: DutyType) => item.parent_id === duty.parent_id
    );
    if (!duty.checked) {
      let falseCount = 0;
      arr.forEach((item: DutyType) => {
        if (!item.checked) falseCount++;
      });
      if (falseCount === 0) {
        setSecondDuties(
          secondDuties.map((item: DutyType) =>
            item.id === duty.parent_id ? { ...item, checked: true } : item
          )
        );
      }
    } else {
      setSecondDuties(
        secondDuties.map((item: DutyType) =>
          item.id === duty.parent_id ? { ...item, checked: false } : item
        )
      );
    }

    setThirdDuties(
      thridDuties.map((item: DutyType) =>
        item.id === duty.id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  /**
   * 공고 필터링
   */
  const filterRecruits = (duties: DutyType[]) => {
    const dutyArr: any = [];
    duties
      .filter((item: DutyType) => item.checked)
      .forEach((item: DutyType) => {
        dutyArr.push(item.id);
      });
    setDutyStates({
      ...dutyStates,
      dutyArr: dutyArr.length === 0 ? dutyStates.dutyOriginArr : dutyArr,
    });
  };

  /**
   * 직무 검색 초기화
   */
  const resetFilter = () => {
    const dutyArr: DutyType[] = [];
    duties.forEach((item: DutyType) => {
      dutyArr.push({ ...item, checked: false, root_id: null });
    });
    setFirstDuties(dutyArr.filter((item: DutyType) => !item.parent_id));
    setSecondDuties(dutyArr.filter((item: DutyType) => item.parent_id === 1));
    setThirdDuties([]);
    filterRecruits(dutyArr);
    setSelectFlag(false);
  };

  return (
    <>
      <div className="pl-[20px] pt-[20px] pr-[20px] w-[100vw]">
        <Input
          readOnly
          placeholder="직무를 선택하세요."
          onClick={() => {
            setSelectFlag(true);
          }}
        />
      </div>
      <Modal
        open={selectFlag}
        onCancel={() => setSelectFlag(false)}
        footer={[
          <Button type="primary" className="w-[100px]" onClick={resetFilter}>
            초기화
          </Button>,
        ]}
        className="absolute left-[20px] top-[55px]"
        width={"100vw"}
      >
        <div className={`flex ${selectFlag ? "block" : "hidden"}`}>
          <div className="w-[200px]">
            {firstDuties.map((item: DutyType) => {
              return (
                <div key={item.id}>
                  <Checkbox
                    value={item}
                    onChange={(e) => {
                      handleFirstDutyAll(e.target.value, !item.checked);
                    }}
                    checked={item.checked}
                  />
                  <span
                    className="cursor-pointer text-sm ml-2"
                    onClick={() => {
                      handleFirstDuty(item);
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-[200px]">
            {secondDuties.map((item: DutyType) => {
              return (
                <div key={item.id}>
                  <Checkbox
                    value={item}
                    onChange={(e) => {
                      handleSeocndDutyAll(e.target.value, !item.checked);
                    }}
                    checked={item.checked}
                  />
                  <span
                    className="cursor-pointer text-sm ml-2"
                    onClick={() => {
                      handleSeocndDuty(item);
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            {thridDuties.map((item: DutyType) => {
              return (
                <div key={item.id}>
                  <Checkbox
                    value={item}
                    onChange={(e) => {
                      handleThirdDuty(e.target.value);
                    }}
                    checked={item.checked}
                  >
                    {item.name}
                  </Checkbox>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DutyBox;
