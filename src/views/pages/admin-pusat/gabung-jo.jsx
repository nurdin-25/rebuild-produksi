import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
} from "./../../components/panel/panel.jsx";
import { Button, Card } from "antd";
import { pageLoadedLogin } from "../../../application/actions/ui";
import FormGabungJO from "../../components/admin-pusat/gabung-jo/button-gabung-jo";
import { useLocation } from "react-router";
import TableGabungJO from "../../components/admin-pusat/gabung-jo/table-gabung-jo.jsx";
import {
  addGabungJO,
  getNoIndukJobOrder,
} from "../../../application/actions/gabungjo.jsx";

const GabungJO = () => {
  const dispatch = useDispatch();
  let locationLink = useLocation();

  useEffect(() => {
    dispatch(pageLoadedLogin);
    dispatch(getNoIndukJobOrder);
    document.title = "Gabung JO";
  }, [dispatch]);

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item">
          <Link to="/dashboard">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={locationLink}>Admin Pusat</Link>
        </li>
        <li className="breadcrumb-item active">Gabung JO</li>
      </ol>
      <h1 className="page-header">
        Admin Pusat <small>Gabung JO</small>
      </h1>
      <Panel>
        <PanelHeader>Gabung JO</PanelHeader>
        <PanelBody>
          <Card bordered={false}>
            <div className="row">
              <div className="col-12">
                <FormGabungJO />
              </div>
              <div className="col-12" style={{ paddingTop: 10 }}>
                <TableGabungJO />
              </div>
            </div>
          </Card>
        </PanelBody>
        <PanelFooter>
          <div className="row">
            <div className="col-1">
              <Button
                type="primary"
                onClick={() => {
                  dispatch(addGabungJO);
                }}
              >
                Simpan
              </Button>
            </div>
            <div className="col-1">
              <Button
                type="danger"
                onClick={() => {
                  localStorage.removeItem("gabung_jo_head");
                  window.location.reload();
                }}
              >
                Batal
              </Button>
            </div>
          </div>
        </PanelFooter>
      </Panel>
    </div>
  );
};

export default GabungJO;
