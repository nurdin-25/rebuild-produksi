import React from "react";
import "antd/dist/antd.css";
import { Form, Row, Col, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterJenis from "../../../../application/selectors/masterjenis";
import {
  addMasterJenis,
  editMasterJenis,
} from "../../../../application/actions/masterjenis";

const maptostate = (state) => {
  if (state.masterjenis.isEdit) {
    return {
      initialValues: {
        _id: state.masterjenis.dataEdit._id,
        kode_jenis: state.masterjenis.dataEdit.kode_jenis,
        nama_jenis: state.masterjenis.dataEdit.nama_jenis,
      },
    };
  } else {
    return {
      initialValues: {
        _id: "",
        kode_jenis: "",
        nama_jenis: "",
      },
    };
  }
};

let FormTambahMasterJenis = ({ visible, onCreate, onCancel, onEdit }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isEdit = useSelector(MasterJenis.getIsEditMasterJenis);
  const handleSubmit = () => {
    if (isEdit) {
      dispatch(editMasterJenis);
    } else {
      dispatch(addMasterJenis);
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
              name="kode_jenis"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Jenis</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Jenis"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col span={12}>
            <Field
              name="nama_jenis"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Jenis</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Jenis"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterJenis = reduxForm({
  form: "FormTambahMasterJenis",
  enableReinitialize: true,
})(FormTambahMasterJenis);
export default connect(maptostate, null)(FormTambahMasterJenis);
