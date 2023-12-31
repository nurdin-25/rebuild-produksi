import React from "react";
import "antd/dist/antd.css";
import { Form, Row, Col, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterCuttingBatu from "../../../../application/selectors/mastercuttingbatu";
import {
  addMasterCuttingBatu,
  editMasterCuttingBatu,
} from "../../../../application/actions/mastercuttingbatu";

const maptostate = (state) => {
  if (state.mastercuttingbatu.dataEdit.length !== 0) {
    return {
      initialValues: {
        id: state.mastercuttingbatu.dataEdit?._id,
        kode_cutting_batu: state.mastercuttingbatu.dataEdit?.kode_cutting_batu,
        nama_cutting_batu: state.mastercuttingbatu.dataEdit?.nama_cutting_batu,
      },
    };
  } else {
    return {
      initialValues: {
        id: "",
        kode_cutting_batu: "",
        nama_cutting_batu: "",
      },
    };
  }
};

let FormTambahMasterCuttingBatu = ({ visible, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isEdit = useSelector(MasterCuttingBatu.getIsEditMasterCuttingBatu);
  const handleSubmit = () => {
    if (isEdit) {
      dispatch(editMasterCuttingBatu);
    } else {
      dispatch(addMasterCuttingBatu);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Master Cutting Batu" : "Tambah Master Cutting Batu"}
      okText={isEdit ? "Simpan" : "Tambah"}
      cancelText="Batal"
      confirmLoading={btnLoading}
      onCancel={onCancel}
      onOk={() => {
        handleSubmit();
      }}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={[8, 8]}>
          <Col span={12} style={{ display: "none" }}>
            <Field
              name="id"
              type="text"
              label={<span style={{ fontSize: "13px" }}>ID</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan ID"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col span={12}>
            <Field
              name="kode_cutting_batu"
              type="text"
              label={
                <span style={{ fontSize: "13px" }}>Kode Cutting Batu</span>
              }
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Cutting Batu"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col span={12}>
            <Field
              name="nama_cutting_batu"
              type="text"
              label={
                <span style={{ fontSize: "13px" }}>Nama Cutting Batu</span>
              }
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Cutting Batu"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterCuttingBatu = reduxForm({
  form: "FormTambahMasterCuttingBatu",
  enableReinitialize: true,
})(FormTambahMasterCuttingBatu);
export default connect(maptostate, null)(FormTambahMasterCuttingBatu);
