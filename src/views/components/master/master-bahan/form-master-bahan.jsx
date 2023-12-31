import React from "react";
import "antd/dist/antd.css";
import { Form, Row, Col, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterBahan from "../../../../application/selectors/masterbahan";
import {
  addMasterBahan,
  editMasterBahan,
} from "../../../../application/actions/masterbahan";

const maptostate = (state) => {
  if (state.masterbahan.dataEdit.length !== 0) {
    return {
      initialValues: {
        id: state.masterbahan.dataEdit?._id,
        kode_bahan: state.masterbahan.dataEdit?.kode_bahan,
        nama_bahan: state.masterbahan.dataEdit?.nama_bahan,
        kadar: state.masterbahan.dataEdit?.kadar,
      },
    };
  } else {
    return {
      initialValues: {
        id: "",
        kode_bahan: "",
        nama_bahan: "",
        kadar: "",
      },
    };
  }
};

let FormTambahMasterBahan = ({ visible, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isEdit = useSelector(MasterBahan.getIsEditMasterBahan);
  const handleSubmit = () => {
    if (isEdit) {
      dispatch(editMasterBahan);
    } else {
      dispatch(addMasterBahan);
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
            />
          </Col>
          <Col span={12}>
            <Field
              name="kode_bahan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Bahan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Bahan"
              disabled={isEdit}
            />
          </Col>
          <Col span={12}>
            <Field
              name="nama_bahan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Bahan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Bahan"
            />
          </Col>
          <Col span={12}>
            <Field
              name="kadar"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kadar</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kadar"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterBahan = reduxForm({
  form: "FormTambahMasterBahan",
  enableReinitialize: true,
})(FormTambahMasterBahan);
export default connect(maptostate, null)(FormTambahMasterBahan);
