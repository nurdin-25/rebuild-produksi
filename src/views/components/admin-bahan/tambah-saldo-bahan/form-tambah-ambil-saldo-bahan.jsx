import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "antd/dist/antd.css";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import SaldoMurni from "../../../../application/selectors/saldomurni";
import {
  addAmbilSaldoBahan,
  addTambahSaldoBahan,
} from "../../../../application/actions/saldomurni";

const maptostate = (state) => {
  if (state.saldomurni.dataSaldo !== undefined) {
    return {
      initialValues: {
        kode_bahan: state.saldomurni.dataSaldo[0]?.nama_bahan,
        berat: 0,
        keterangan: "",
      },
    };
  } else {
    return {
      initialValues: {
        kode_bahan: "",
        berat: 0,
        keterangan: "",
      },
    };
  }
};

let FormTambahAmbilSaldoMurni = ({ visible, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isAdd = useSelector(SaldoMurni.getIsAddSaldoMurni);
  const handleSubmit = () => {
    if (isAdd) {
      dispatch(addTambahSaldoBahan);
    } else {
      dispatch(addAmbilSaldoBahan);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isAdd ? "Tambah Saldo Murni" : "Ambil Saldo Murni"}
      okText="Simpan"
      cancelText="Batal"
      confirmLoading={btnLoading}
      onCancel={onCancel}
      onOk={() => {
        handleSubmit();
      }}
    >
      <Form layout="vertical" form={form}>
        <Row>
          <Col offset={1}>
            <Field
              name="kode_bahan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Bahan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Batu"
              disabled
            />
          </Col>
          <Col offset={1}>
            <Field
              name="berat"
              type="number"
              label={
                <span style={{ fontSize: "13px" }}>
                  Berat {isAdd ? "Tambah" : "Ambil"}
                </span>
              }
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Berat"
            />
          </Col>
          <Col offset={1}>
            <Field
              name="keterangan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Keterangan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Keterangan"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahAmbilSaldoMurni = reduxForm({
  form: "FormTambahAmbilSaldoMurni",
  enableReinitialize: true,
})(FormTambahAmbilSaldoMurni);
export default connect(maptostate, null)(FormTambahAmbilSaldoMurni);
