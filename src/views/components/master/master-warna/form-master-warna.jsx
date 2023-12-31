import React from "react";
import "antd/dist/antd.css";
import { Form, Row, Col, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterWarna from "../../../../application/selectors/masterwarna";
import {
  addMasterWarna,
  editMasterWarna,
} from "../../../../application/actions/masterwarna";

const maptostate = (state) => {
  if (state.masterwarna.dataEdit !== undefined) {
    return {
      initialValues: {
        id: state.masterwarna.dataEdit?._id,
        kode_warna: state.masterwarna.dataEdit?.kode_warna,
        nama_warna: state.masterwarna.dataEdit?.nama_warna,
      },
    };
  } else {
    return {
      initialValues: {
        id: "",
        kode_warna: "",
        nama_warna: "",
      },
    };
  }
};

let FormTambahMasterWarna = ({ visible, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isEdit = useSelector(MasterWarna.getIsEditMasterWarna);
  const dataEdit = useSelector(MasterWarna.getDataEditMasterWarna);
  const handleSubmit = () => {
    if (isEdit) {
      dispatch(editMasterWarna);
    } else {
      dispatch(addMasterWarna);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Master Jenis" : "Tambah Master Jenis"}
      okText={isEdit ? "Simpan" : "Tambah"}
      cancelText="Batal"
      confirmLoading={btnLoading}
      onCancel={onCancel}
      onOk={() => {
        handleSubmit();
      }}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          kode_warna: isEdit ? dataEdit[0]?.kode_warna : "",
          nama_warna: isEdit ? dataEdit[0]?.nama_warna : "",
        }}
      >
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
              name="kode_warna"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Warna</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Warna"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col span={12}>
            <Field
              name="nama_warna"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Warna</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Warna"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterWarna = reduxForm({
  form: "FormTambahMasterWarna",
  enableReinitialize: true,
})(FormTambahMasterWarna);
export default connect(maptostate, null)(FormTambahMasterWarna);
