import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import laporanterimajo from "../../../../../application/selectors/laporanterimajoadmin";

const TableLaporanTerimaJo = () => {
  const columns = [
    {
      title: "No Terima",
      dataIndex: "no_terima",
      key: "no_terima",
      align: "center",
    },
    {
      title: "Tgl Terima",
      dataIndex: "tgl_terima",
      key: "tgl_terima",
      align: "center",
    },
    {
      title: "Divisi Terima",
      dataIndex: "tujuan_divisi",
      key: "tujuan_divisi",
      align: "center",
    },
    {
      title: "Jenis Bahan",
      dataIndex: "kode_jenis_bahan",
      key: "kode_jenis_bahan",
      align: "center",
    },
    {
      title: "Kode Barang",
      dataIndex: "kode_barang",
      key: "kode_barang",
      align: "center",
    },
    {
      title: "No SPK",
      dataIndex: "no_job_order",
      key: "no_job_order",
      align: "center",
    },
    {
      title: "Jumlah Terima",
      dataIndex: "stock_in",
      key: "stock_in",
      align: "right",
    },
    {
      title: "Berat Terima",
      dataIndex: "berat_in",
      key: "berat_in",
      align: "right",
    },
    {
      title: "Nama Tukang",
      dataIndex: "kode_staff",
      key: "kode_staff",
      align: "center",
    },
  ];

  const dataLaporanTerimaJo = useSelector(
    laporanterimajo.getAllLaporanTerimaJoAdmin
  );

  return (
    <Table
      dataSource={dataLaporanTerimaJo}
      columns={columns}
      scroll={{ x: 1500, y: 1000 }}
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={6} align="right">
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1} align="right">
              {dataLaporanTerimaJo.reduce(
                (a, b) => a + parseFloat(b.stock_in),
                0
              )}
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} align="right">
              {dataLaporanTerimaJo
                .reduce((a, b) => a + parseFloat(b.berat_in), 0)
                .toFixed(3)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  );
};

export default TableLaporanTerimaJo;
