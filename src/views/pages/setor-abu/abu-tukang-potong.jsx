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
import ButtonAbuTukangPotong from "../../components/setor-abu/abu-tukang-potong/button-abu-tukang-potong";
import TableAbuTukangPotong from "../../components/setor-abu/abu-tukang-potong/table-abu-tukang-potong";
import FormAbuTukangPotong from "../../components/setor-abu/abu-tukang-potong/form-abu-tukang-potong.jsx";
import { addAbuPotong } from "../../../application/actions/abutukangpotong.jsx";
import { getAllMasterBahan } from "../../../application/actions/masterbahan.jsx";

const AbuTukangPotong = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pageLoadedLogin);
    dispatch(getAllMasterBatu);
    dispatch(getAllMasterBahan);
    document.title = "Abu Tukang Potong";
  }, [dispatch]);

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/setor-abu/abu-tukang-potong">Setor Abu</Link>
        </li>
        <li className="breadcrumb-item active">Abu Tukang Potong</li>
      </ol>
      <h1 className="page-header">
        Setor Abu <small>Abu Tukang Potong</small>
      </h1>
      <Panel>
        <PanelHeader>Abu Tukang Potong</PanelHeader>
        <PanelBody>
          <Card bordered={false}>
            <div className="row" style={{ marginLeft: "40%" }}>
              <div className="col-12">
                <ButtonAbuTukangPotong />
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
                  Tabel Abu Tukang Potong
                </Divider>
              </div>
              <div className="col-12">
                <TableAbuTukangPotong />
              </div>
              <div className="col-12" style={{ marginTop: "10px" }}>
                <FormAbuTukangPotong />
              </div>
              <div className="col-12" style={{ marginTop: "10px" }}>
                <div className="row">
                  <div className="col-1">
                    <Button
                      type="primary"
                      onClick={() => dispatch(addAbuPotong)}
                    >
                      Simpan
                    </Button>
                  </div>
                  <div className="col-1">
                    <Button
                      type="danger"
                      onClick={() => {
                        localStorage.removeItem("data_select_potong");
                        window.location.reload();
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default AbuTukangPotong;
