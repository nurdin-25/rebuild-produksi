import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "./../../components/panel/panel.jsx";
import { Card, Divider, Button } from "antd";
import { pageLoadedLogin } from "../../../application/actions/ui";
import { getAllMasterBatu } from "../../../application/actions/masterbatu";
import FormKirimBatuProduksi from "../../components/admin-berlian/kirim-batu-produksi/button-add-kirim-batu-produksi";
import TableKirimBatuProduksi from "../../components/admin-berlian/kirim-batu-produksi/table-kirim-batu-produksi";
import TableHistoryKirimBatuProduksi from "../../components/admin-berlian/kirim-batu-produksi/table-history-kirim-batu-produksi";
import { addDataKirimBatuPost } from "../../../application/actions/kirimbatuproduksi.jsx";
import getLocal from "../../../infrastructure/services/local/get-local.jsx";

const KirimBatuProduksi = () => {
  const dispatch = useDispatch();
  const dataKirim = getLocal("data_kirim_batu_produksi") || [];
  console.log(dataKirim);
  useEffect(() => {
    dispatch(pageLoadedLogin);
    dispatch(getAllMasterBatu);
    document.title = "Kirim Batu Produksi";
  }, [dispatch]);

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/admin-berlian/kirim-batu-produksi">Admin Berlian</Link>
        </li>
        <li className="breadcrumb-item active">Jenis Batu</li>
      </ol>
      <h1 className="page-header">
        Admin Berlian <small>Kirim Batu Produksi</small>
      </h1>
      <Panel>
        <PanelHeader>Kirim Batu Produksi</PanelHeader>
        <PanelBody>
          <Card bordered={false}>
            <div className="row">
              <div className="col-12">
                <FormKirimBatuProduksi />
              </div>
            </div>
            <div
              className="row"
              style={{
                marginTop: 10,
              }}
            >
              <div className="col-12">
                <Divider orientation="left" style={{ fontSize: "14px" }}>
                  Tabel Kirim Batu Produksi
                </Divider>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-12">
                    No Job Order : {dataKirim[0]?.no_job_order}
                  </div>
                  <div className="col-lg-12">
                    Kode Barang : {dataKirim[0]?.kode_barang}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <TableKirimBatuProduksi />
              </div>
              <div className="col-12" style={{ marginTop: "10px" }}>
                <div className="row">
                  <div className="col-1">
                    <Button
                      type="primary"
                      disabled={dataKirim.length === 0 ? true : false}
                      onClick={() => {
                        dispatch(addDataKirimBatuPost);
                      }}
                    >
                      Simpan
                    </Button>
                  </div>
                  <div className="col-1">
                    <Button
                      type="danger"
                      onClick={() => {
                        localStorage.removeItem("data_kirim_batu_produksi");
                        localStorage.removeItem("data_detail_kirim_batu");
                        localStorage.removeItem(
                          "data_history_kirim_batu_produksi"
                        );
                        window.location.reload();
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <Divider orientation="left" style={{ fontSize: "14px" }}>
                  Tabel History Kirim Batu Produksi
                </Divider>
              </div>
              <div className="col-12">
                <TableHistoryKirimBatuProduksi />
              </div>
            </div>
          </Card>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default KirimBatuProduksi;
