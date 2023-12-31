import React, { useState } from "react";
import { Button } from "antd";
import FormGabungJO from "./form-gabung-jo";
import getLocal from "../../../../infrastructure/services/local/get-local";

const ModalGabungJO = () => {
  const [visible, setVisible] = useState(false);

  const dataGabung = getLocal("gabung_jo_head") || [];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        disabled={dataGabung.length >= 5 ? true : false}
      >
        + Data JO
      </Button>
      <FormGabungJO
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ModalGabungJO;
