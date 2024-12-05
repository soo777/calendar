import React from "react";
import { Button, message, Modal } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  dutyState,
  modalState,
  recruitState,
} from "service/Common/atoms/CommonAtom";
import { RecruitType } from "type/type";
import { convertDuty } from "util/util";

const DetaillModal = () => {
  const [modalStates, setModalStates] = useRecoilState(modalState);
  const recruitStates = useRecoilValue(recruitState);
  const dutyStates = useRecoilValue(dutyState);

  /*
   * modal 닫기
   */
  const closeModal = () => {
    setModalStates({ ...modalStates, openFlag: false });
  };

  /**
   * 공고 이동
   */
  const handleRecruit = (type: string, prevRecruit: RecruitType | null) => {
    const arr: RecruitType[] = [];
    recruitStates.recruitArr.forEach((item) => {
      item.forEach((item2) => {
        const newArr = [...item2.recruits];
        newArr
          .sort((a: any, b: any) => b.id - a.id)
          .forEach((item3) => {
            arr.push(item3);
          });
      });
    });

    const index = arr.findIndex(
      (obj) =>
        obj.start_time === prevRecruit!.start_time && obj.id === prevRecruit!.id
    );

    if (index === 0 && type === "prev") {
      message.warning("첫번째 공고입니다.");
      return;
    } else if (index + 1 === arr.length && type === "next") {
      message.warning("마지막 공고입니다.");
      return;
    }
    const nextRecruitInfo = type === "next" ? arr[index + 1] : arr[index - 1];

    setModalStates({
      ...modalStates,
      recruitInfo: nextRecruitInfo,
    });
  };

  return (
    <>
      <Modal
        width={750}
        open={modalStates.openFlag}
        onCancel={closeModal}
        footer={false}
      >
        <div className="font-semibold text-base">
          {modalStates.recruitInfo?.company_name}
        </div>
        <div className="font-bold text-[24px] mt-1">
          {modalStates.recruitInfo?.title}
        </div>
        <div className="text-gray-400 mt-1">{`${modalStates.recruitInfo?.start_time} ~ ${modalStates.recruitInfo?.end_time}`}</div>
        <div className="text-orange-600">
          {convertDuty(modalStates.recruitInfo!.duty_ids, dutyStates.duties)}
        </div>

        <div className="flex justify-between mt-3">
          <Button
            className="w-1/2"
            onClick={() => handleRecruit("prev", modalStates.recruitInfo)}
          >
            이전 공고
          </Button>
          <Button
            className="w-1/2 bg-orange-300 ml-1"
            onClick={() => handleRecruit("next", modalStates.recruitInfo)}
          >
            다음 공고
          </Button>
        </div>

        <div className="mt-5">
          <img src={modalStates.recruitInfo?.image_url} />
        </div>
      </Modal>
    </>
  );
};

export default DetaillModal;
