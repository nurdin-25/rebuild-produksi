import React from "react";
import "antd/dist/antd.css";
import { Form, Row, Col, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterJenisBatu from "../../../../application/selectors/masterjenisbatu";

const maptostate = (state) => {
  if (state.masterjenisbatu.dataEdit !== undefined) {
    return {
      initialValues: {
        kode_jenis_batu: state.masterjenisbatu.dataEdit[0]?.kode_jenis_batu,
        nama_jenis_batu: state.masterjenisbatu.dataEdit[0]?.nama_jenis_batu,
      },
    };
  } else {
    return {
      initialValues: {
        kode_jenis_batu: "",
        nama_jenis_batu: "",
      },
    };
  }
};

let FormTambahMasterJenisBatu = ({ visible, onCreate, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isEdit = useSelector(MasterJenisBatu.getIsEditMasterJenisBatu);

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Master Jenis Batu" : "Tambah Master Jenis Batu"}
      okText={isEdit ? "Simpan" : "Tambah"}
      cancelText="Batal"
      confirmLoading={btnLoading}
      onCancel={onCancel}
      onOk={() => {}}
    >
      <Form layout="vertical" form={form}>
        <Row>
          <Col offset={1}>
            <Field
              name="kode_jenis_batu"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Jenis Batu</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Jenis Batu"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col offset={1}>
            <Field
              name="nama_jenis_batu"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Jenis Batu</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Jenis Batu"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterJenisBatu = reduxForm({
  form: "FormTambahMasterJenisBatu",
  enableReinitialize: true,
})(FormTambahMasterJenisBatu);
export default connect(maptostate, null)(FormTambahMasterJenisBatu);
