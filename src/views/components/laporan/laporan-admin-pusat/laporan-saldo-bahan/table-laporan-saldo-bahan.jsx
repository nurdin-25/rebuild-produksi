import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import laporansaldobahan from "../../../../../application/selectors/laporansaldobahanpusat";

const TableLaporanSaldoBahan = () => {
  const dataLaporanSaldoBahan = useSelector(
    laporansaldobahan.getAllLaporanSaldoBahanPusat
  );

  const columns = [
    {
      title: "Nama Bahan",
      dataIndex: "nama_bahan",
      key: "nama_bahan",
      align: "center",
    },
    {
      title: "Saldo Awal",
      dataIndex: "saldo_awal",
      key: "saldo_awal",
      align: "right",
      render: (text) => {
        return text.toFixed(3);
      },
    },
    {
      title: "Mutasi In",
      dataIndex: "mutasi_in",
      key: "mutasi_in",
      align: "right",
      render: (text) => {
        return text.toFixed(3);
      },
    },
    {
      title: "Mutasi Out",
      dataIndex: "mutasi_out",
      key: "mutasi_out",
      align: "right",
      render: (text) => {
        return text.toFixed(3);
      },
    },
    {
      title: "Saldo Akhir",
      key: "saldo_akhir",
      align: "right",
      render: (text) => {
        const saldo_akhir =
          parseFloat(text.saldo_awal) +
          parseFloat(text.mutasi_in) -
          parseFloat(text.mutasi_out);
        return saldo_akhir.toFixed(3);
      },
    },
    {
      title: "Kadar",
      dataIndex: "kadar",
      key: "kadar",
      align: "right",
    },
    {
      title: "24K",
      key: "24k",
      align: "right",
      render: (text) => {
        const saldo_akhir =
          parseFloat(text.saldo_awal) +
          parseFloat(text.mutasi_in) -
          parseFloat(text.mutasi_out);
        const kadarkali = parseFloat(text.kadar) / 100;
        let karat24 = 0;
        karat24 = saldo_akhir * kadarkali;
        return karat24.toFixed(3);
      },
    },
  ];

  let saldo_akhir = 0;
  dataLaporanSaldoBahan.map((text) => {
    return (saldo_akhir =
      saldo_akhir +
      (parseFloat(text.saldo_awal || 0) +
        parseFloat(text.mutasi_in || 0) -
        parseFloat(text.mutasi_out || 0)));
  });

  return (
    <Table
      dataSource={dataLaporanSaldoBahan}
      columns={columns}
      scroll={{ x: 1500, y: 1000 }}
      summary={(row) => {
        console.log(row);
        let karat24 = 0;
        dataLaporanSaldoBahan.forEach((el) => {
          const saldoakhir = el.saldo_awal + el.mutasi_in - el.mutasi_out;
          const kadarkali = el.kadar / 100;
          karat24 += saldoakhir * kadarkali;
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} align="right">
                Total
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                {dataLaporanSaldoBahan
                  .reduce((a, b) => a + parseFloat(b.saldo_awal), 0)
                  .toFixed(3)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                {dataLaporanSaldoBahan
                  .reduce((a, b) => a + parseFloat(b.mutasi_in), 0)
                  .toFixed(3)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                {dataLaporanSaldoBahan
                  .reduce((a, b) => a + parseFloat(b.mutasi_out), 0)
                  .toFixed(3)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                {saldo_akhir.toFixed(3)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} align="right"></Table.Summary.Cell>
              <Table.Summary.Cell index={5} align="right">
                {karat24.toFixed(3)}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default TableLaporanSaldoBahan;
