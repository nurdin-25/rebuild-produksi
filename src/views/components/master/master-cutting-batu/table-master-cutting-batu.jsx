import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Space, Table, Button } from "antd";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
import MasterCuttingBatu from "../../../../application/selectors/mastercuttingbatu";
import { destroy } from "redux-form";
import {
  deleteMasterCuttingBatu,
  getMasterCuttingBatuByID,
  setEditFormMasterCuttingBatu,
} from "../../../../application/actions/mastercuttingbatu";
import FormTambahMasterCuttingBatu from "./form-master-cutting-batu";
import Swal from "sweetalert2";

const TableMasterCuttingBatu = () => {
  const dispatch = useDispatch();
  const dataMasterCuttingBatu = useSelector(
    MasterCuttingBatu.getAllMasterCuttingBatu
  );
  const visible = useSelector(MasterCuttingBatu.getIsVisibleMasterCuttingBatu);

  const [dataSource, setDataSource] = useState(dataMasterCuttingBatu);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState(false);
  const onDelete = (kode, nama) => {
    Swal.fire({
      title: nama,
      text: "Apakah Anda Yakin Akan Mengahapus Data Ini ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMasterCuttingBatu({ id: kode }));
      }
    });
  };

  const SearchBar = (
    <Input
      placeholder="Search Bar"
      value={value}
      style={{ width: "20%" }}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = dataMasterCuttingBatu.filter(
          (entry) =>
            entry.kode_cutting_batu.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.nama_cutting_batu.toUpperCase().includes(currValue.toUpperCase())
        );
        setDataSource(filteredData);
        setSearch(true);
      }}
    />
  );

  const columns = [
    {
      title: SearchBar,
      align: "right",
      children: [
        {
          title: "Kode Cutting Batu",
          dataIndex: "kode_cutting_batu",
          key: "kode_cutting_batu",
          align: "center",
        },
        {
          title: "Nama Cutting Batu",
          dataIndex: "nama_cutting_batu",
          key: "nama_cutting_batu",
          align: "center",
        },
        {
          title: "Action",
          key: "act",
          align: "center",
          render: (text) => {
            return (
              <>
                <Space>
                  <Button
                    className="ant-btn-warning"
                    htmltype="button"
                    danger
                    onClick={() => {
                      dispatch(
                        getMasterCuttingBatuByID({
                          dataID: text._id,
                        })
                      );
                    }}
                  >
                    EDIT
                  </Button>
                  <Button
                    type="primary"
                    htmltype="button"
                    danger
                    onClick={() => {
                      onDelete(text._id, text.nama_cutting_batu);
                    }}
                  >
                    DELETE
                  </Button>
                </Space>
              </>
            );
          },
        },
      ],
    },
  ];

  const dataTable =
    dataSource.length === 0
      ? search
        ? dataSource
        : dataMasterCuttingBatu
      : dataSource;

  return (
    <>
      <Table
        dataSource={dataTable}
        columns={columns}
        scroll={{ x: 500, y: 1500 }}
      />
      <FormTambahMasterCuttingBatu
        visible={visible}
        onCreate={() => {
          console.log("test");
        }}
        onCancel={() => {
          dispatch(destroy("FormTambahMasterCuttingBatu"));
          dispatch(setEditFormMasterCuttingBatu(false));
        }}
      />
    </>
  );
};

export default TableMasterCuttingBatu;
