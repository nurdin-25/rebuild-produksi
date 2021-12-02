import React from "react";
import "antd/dist/antd.css";
import { Form, Button, Row, Col, Select, Modal } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import MasterJenisBahan from "../../../../application/selectors/masterjenisbahan";
import MasterWarna from "../../../../application/selectors/masterwarna";

const { Option } = Select;

const maptostate = (state) => {
  if (state.masterjenisbahan.dataEdit !== undefined) {
    return {
      initialValues: {
        kode_jenis_bahan: state.masterjenisbahan.dataEdit[0]?.kode_jenis_bahan,
        nama_jenis_bahan: state.masterjenisbahan.dataEdit[0]?.nama_jenis_bahan,
        kode_warna: state.masterjenisbahan.dataEdit[0]?.kode_warna,
        kadar: state.masterjenisbahan.dataEdit[0]?.kadar,
      },
    };
  } else {
    return {
      initialValues: {
        kode_jenis_bahan: "",
        nama_jenis_bahan: "",
        kode_warna: "",
        kadar: "",
      },
    };
  }
};

let FormTambahMasterJenisBahan = ({ visible, onCreate, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const dataMasterWarna = useSelector(MasterWarna.getAllMasterWarna);

  const isEdit = useSelector(MasterJenisBahan.getIsEditMasterJenisBahan);
  const dataEdit = useSelector(MasterJenisBahan.getDataEditMasterJenisBahan);

  return (
    <Modal
      visible={visible}
      title={isEdit ? "Edit Master Jenis Bahan" : "Tambah Master Jenis Bahan"}
      okText={isEdit ? "Simpan" : "Tambah"}
      cancelText="Batal"
      confirmLoading={btnLoading}
      onCancel={onCancel}
      onOk={() => {}}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          kode_jenis_bahan: isEdit ? dataEdit[0]?.kode_jenis_bahan : "",
          nama_jenis_bahan: isEdit ? dataEdit[0]?.nama_jenis_bahan : "",
          warna_jenis_bahan: isEdit
            ? dataEdit[0]?.kode_warna
            : dataMasterWarna[0]?.kode_warna,
          kadar: isEdit ? dataEdit[0]?.kadar : "",
        }}
      >
        <Row>
          <Col offset={1}>
            <Field
              name="kode_jenis_bahan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Jenis Bahan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Jenis Bahan"
              disabled={isEdit ? true : false}
            />
          </Col>
          <Col offset={1}>
            <Field
              name="nama_jenis_bahan"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Jenis Bahan</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Jenis Bahan"
            />
          </Col>
          <Col offset={1}>
            <Field
              name="warna_jenis_bahan"
              type="select"
              label={<span style={{ fontSize: "13px" }}>Warna</span>}
              style={{ width: 250 }}
              component={styleAntd.ASelect}
              placeholder="Pilih Warna"
              onBlur={(e) => e.preventDefault()}
              selectedValue={
                isEdit
                  ? dataEdit[0]?.kode_warna
                  : dataMasterWarna[0]?.kode_warna
              }
            >
              {dataMasterWarna.map((element) => {
                return (
                  <Option value={element.kode_warna} key={element.kode_warna}>
                    <span style={{ fontSize: "13px" }}>
                      {element.nama_warna}
                    </span>
                  </Option>
                );
              })}
            </Field>
          </Col>
          <Col offset={1}>
            <Field
              name="kadar"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kadar</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kadar Jenis Bahan"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahMasterJenisBahan = reduxForm({
  form: "FormTambahMasterJenisBahan",
  enableReinitialize: true,
})(FormTambahMasterJenisBahan);
export default connect(maptostate, null)(FormTambahMasterJenisBahan);
