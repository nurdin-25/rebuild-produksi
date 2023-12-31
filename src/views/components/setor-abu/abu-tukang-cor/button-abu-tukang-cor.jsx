import React from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
import { getAllSetorOutstandCasting } from "../../../../application/actions/abutukangcor";
import ui from "../../../../application/selectors/ui";

const ButtonAbuTukangCOR = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const isLoading = useSelector(ui.getBtnLoading);
  return (
    <div>
      <Button
        type="primary"
        loading={isLoading}
        onClick={() => {
          dispatch(getAllSetorOutstandCasting);
        }}
        className="ant-btn-success"
      >
        + Lihat Data
      </Button>
    </div>
  );
};

export default ButtonAbuTukangCOR;
