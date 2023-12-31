import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { destroy } from "redux-form";
import { Input, Space, Table, Button } from "antd";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
import MasterTukang from "../../../../application/selectors/mastertukang";
import FormTambahMasterTukang from "./form-master-tukang";
import {
  deleteMasterTukang,
  getMasterTukangByID,
  setEditFormMasterTukang,
} from "../../../../application/actions/mastertukang";
import Swal from "sweetalert2";

const TableMasterTukang = () => {
  const dispatch = useDispatch();
  const dataMasterTukang = useSelector(MasterTukang.getAllMasterTukang);
  const visible = useSelector(MasterTukang.getIsVisibleMasterTukang);

  const [dataSource, setDataSource] = useState(dataMasterTukang);
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
        dispatch(deleteMasterTukang({ id: kode }));
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
        const filteredData = dataMasterTukang.filter(
          (entry) =>
            entry.kode_tukang.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.nama_tukang.toUpperCase().includes(currValue.toUpperCase()) ||
            entry.no_hp.includes(currValue.toUpperCase()) ||
            entry.email.toUpperCase().includes(currValue.toUpperCase())
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
          title: "Kode Tukang",
          dataIndex: "kode_tukang",
          key: "kode_tukang",
          align: "center",
        },
        {
          title: "Nama Tukang",
          dataIndex: "nama_tukang",
          key: "nama_tukang",
          align: "center",
        },
        {
          title: "No HP",
          dataIndex: "no_hp",
          key: "no_hp",
          align: "center",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          align: "center",
        },
        {
          title: "Divisi",
          dataIndex: "divisi",
          key: "divisi",
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
                        getMasterTukangByID({
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
                      onDelete(text._id, text.nama_tukang);
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
        : dataMasterTukang
      : dataSource;

  return (
    <>
      <Table
        dataSource={dataTable}
        columns={columns}
        scroll={{ x: 500, y: 1500 }}
      />
      <FormTambahMasterTukang
        visible={visible}
        onCreate={() => {
          console.log("test");
        }}
        onCancel={() => {
          dispatch(destroy("FormTambahMasterTukang"));
          dispatch(setEditFormMasterTukang(false));
        }}
      />
    </>
  );
};

export default TableMasterTukang;
