import React from "react";
import { connect } from "react-redux";
import { Form, Row, Col, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import "antd/dist/antd.css";
import styleAntd from "../../../../infrastructure/shared/styleAntd";
import ui from "../../../../application/selectors/ui";
import TambahAmbilBatu from "../../../../application/selectors/tambahambilbatu";
import {
  addAmbilBatu,
  addTambahBatu,
  countBeratTambahAmbilBatu,
  setJumlahBatu,
} from "../../../../application/actions/tambahambilbatu";
import ValidasiTambahAmbilBatu from "../../../../infrastructure/validate/TambahAmbilBatuValidate";

const maptostate = (state) => {
  if (state.tambahambilbatu.dataBatu.length !== 0) {
    if (state.tambahambilbatu.isAdd) {
      return {
        initialValues: {
          kode_batu: state.tambahambilbatu.dataBatu[0]?.kode_batu,
          nama_batu: state.tambahambilbatu.dataBatu[0]?.nama_batu,
          konversi_berat: state.tambahambilbatu.konversiBerat,
          jumlah: state.tambahambilbatu.jumlah,
          berat: state.tambahambilbatu.berat,
          keterangan: "",
          kategori: "Tambah",
        },
      };
    } else {
      return {
        initialValues: {
          kode_batu: state.tambahambilbatu.dataBatu[0]?.kode_batu,
          nama_batu: state.tambahambilbatu.dataBatu[0]?.nama_batu,
          konversi_berat: state.tambahambilbatu.konversiBerat,
          jumlah: state.tambahambilbatu.jumlah,
          berat: state.tambahambilbatu.berat,
          keterangan: "",
          kategori: "Ambil",
        },
      };
    }
  } else {
    return {
      initialValues: {
        kode_batu: "",
        nama_batu: "",
        konversi_berat: "",
        jumlah: state.tambahambilbatu.jumlah,
        berat: state.tambahambilbatu.berat,
        keterangan: "",
        kategori: "",
      },
    };
  }
};

let FormTambahAmbilBatu = ({ visible, onCancel }, prop) => {
  const btnLoading = useSelector(ui.getBtnLoading);
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isAdd = useSelector(TambahAmbilBatu.getIsAddTambahAmbilBatu);
  const dataBatu = useSelector(TambahAmbilBatu.getDataBatu);
  const isSintetis = dataBatu[0]?.status_sintetis;

  const handleSubmit = () => {
    if (isAdd) {
      dispatch(addTambahBatu);
    } else {
      dispatch(addAmbilBatu);
    }
  };

  return (
    <Modal
      visible={visible}
      title={isAdd ? "Tambah Saldo Batu" : "Ambil Saldo Batu"}
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
              name="kode_batu"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kode Batu</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kode Batu"
              disabled
            />
          </Col>
          <Col offset={1}>
            <Field
              name="nama_batu"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Nama Batu</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Nama Batu"
              disabled
            />
          </Col>
          <Col offset={1} style={{ display: "none" }}>
            <Field
              name="berat_batu"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Berat Batu</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Berat Batu"
              disabled
            />
          </Col>
          <Col offset={1}>
            <Field
              name="jumlah"
              type="number"
              label={
                <span style={{ fontSize: "13px" }}>
                  Jumlah {isAdd ? "Tambah" : "Ambil"}
                </span>
              }
              component={styleAntd.AInput}
              className="form-item-group"
              onBlur={(e) => e.preventDefault()}
              onChange={(e) => dispatch(setJumlahBatu(e.target.value))}
              placeholder={
                isAdd ? "Masukkan Jumlah Tambah" : "Masukkan Jumlah Ambil"
              }
            />
          </Col>
          <Col offset={1}>
            <Field
              name="berat"
              type="number"
              label={
                <span style={{ fontSize: "13px" }}>
                  {isSintetis ? "Berat" : "Carat"}
                </span>
              }
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Berat"
              onBlur={(e) => e.preventDefault()}
              onChange={(e) =>
                dispatch(countBeratTambahAmbilBatu({ berat: e.target.value }))
              }
              disabled={false}
            />
          </Col>
          <Col offset={1} className={isSintetis ? "d-none" : ""}>
            <Field
              name="konversi_berat"
              type="number"
              label={<span style={{ fontSize: "13px" }}>Berat (Gram)</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Gram"
              disabled={true}
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
          <Col offset={1} style={{ display: "none" }}>
            <Field
              name="kategori"
              type="text"
              label={<span style={{ fontSize: "13px" }}>Kategori</span>}
              component={styleAntd.AInput}
              className="form-item-group"
              placeholder="Masukkan Kategori"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

FormTambahAmbilBatu = reduxForm({
  form: "FormTambahAmbilBatu",
  enableReinitialize: true,
  validate: ValidasiTambahAmbilBatu,
})(FormTambahAmbilBatu);
export default connect(maptostate, null)(FormTambahAmbilBatu);
