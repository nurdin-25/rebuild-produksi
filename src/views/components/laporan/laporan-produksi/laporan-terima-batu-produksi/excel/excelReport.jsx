import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class ExcelReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        return result;
      }, {});
    };

    const dataGroup = groupBy(this.props.dataExel, "no_terima");
    const dataGroupArr = Object.values(dataGroup);

    return (
      <>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="ant-btn ant-btn-primary ant-btn-block ant-btn-success"
          table="table-to-xls"
          filename={`LAPORAN TERIMA BATU PRODUKSI(${this.props.dataHead?.nama_divisi})`}
          sheet={`LAPORAN TERIMA BATU PRODUKSI(${this.props.dataHead?.nama_divisi})`}
          buttonText="Export Excel"
        />
        <table id="table-to-xls" style={{ display: "none" }}>
          <thead>
            <tr>
              <td
                style={{
                  color: "#000",
                  textAlign: "center",
                }}
                colSpan="5"
              >
                LAPORAN TERIMA BATU PRODUKSI ({this.props.dataHead?.nama_divisi}
                )
              </td>
            </tr>
            <tr>
              <td
                style={{
                  color: "#000",
                  textAlign: "center",
                }}
                colSpan="5"
              >
                TANGGAL{" "}
                {this.props.dataHead?.tgl_awal +
                  " s/d " +
                  this.props.dataHead?.tgl_akhir}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  backgroundColor: "#99CCFF",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                TGL TERIMA
              </td>
              <td
                style={{
                  backgroundColor: "#99CCFF",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                JOB ORDER
              </td>
              <td
                style={{
                  backgroundColor: "#99CCFF",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                KODE BATU
              </td>
              <td
                style={{
                  backgroundColor: "#99CCFF",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                JUMLAH
              </td>
              <td
                style={{
                  backgroundColor: "#99CCFF",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                BERAT
              </td>
            </tr>
          </thead>
          <tbody>
            {dataGroupArr.map((item) => {
              return (
                <>
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        backgroundColor: "#bbbbbb",
                        textAlign: "left",
                      }}
                    >
                      {" "}
                      NO TERIMA : {item[0].no_terima}
                    </td>
                  </tr>
                  {item.map((element) => {
                    return (
                      <tr>
                        <td>{element.tanggal_terima}</td>
                        <td>{element.no_job_order}</td>
                        <td>{element.kode_batu}</td>
                        <td style={{ textAlign: "right" }}>
                          {element.stock_in}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {element.berat_in}
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3} style={{ textAlign: "right" }}>
                      Sub Total :
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {item.reduce((a, b) => a + parseFloat(b.stock_in), 0)}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {item
                        .reduce((a, b) => a + parseFloat(b.berat_in), 0)
                        .toFixed(3)}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign: "right" }}>
                Grand Total :
              </td>
              <td style={{ textAlign: "right" }}>
                {this.props.dataExel.reduce(
                  (a, b) => a + parseFloat(b.stock_in),
                  0
                )}
              </td>
              <td style={{ textAlign: "right" }}>
                {this.props.dataExel
                  .reduce((a, b) => a + parseFloat(b.berat_in), 0)
                  .toFixed(3)}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
export default ExcelReport;
