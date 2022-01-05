import { jsPDF } from "jspdf";
import "jspdf-autotable";

const pdfReport = (data = "") => {
  const doc = new jsPDF("l", "mm", [297, 210]);
  const datahead = JSON.parse(localStorage.getItem("laporan_terima_jo_admin"));
  let tableRows = [];
  let tableColumn = [];

  let finalY = 30;
  doc.text("Laporan Terima Job Order Admin", 14, 15);
  doc.setFontSize(20);
  doc.text("PRODUKSI", 200, 15);

  doc.setFontSize(10);
  doc.setProperties({
    title: "Terima Job Order Admin",
  });
  doc.text(`PERIODE : ${datahead.tgl_awal} s/d ${datahead.tgl_akhir}`, 14, 25);

  tableColumn = [
    [
      {
        content: `NO TERIMA`,
      },
      {
        content: `TGL TERIMA`,
      },
      {
        content: `DIVISI TERIMA`,
      },
      {
        content: `JENIS BAHAN`,
      },
      {
        content: `KODE BARANG`,
      },
      {
        content: `NO SPK`,
      },
      {
        content: `JUMLAH TERIMA`,
      },
      {
        content: `BERAT TERIMA`,
      },
      {
        content: `NAMA TUKANG`,
      },
    ],
  ];

  data.forEach((element) => {
    const row = [
      {
        content: element.no_terima,
      },
      {
        content: element.tgl_terima,
      },
      {
        content: element.tujuan_divisi,
      },
      {
        content: element.kode_jenis_bahan,
      },
      {
        content: element.kode_barang,
      },
      {
        content: element.no_job_order,
      },
      {
        content: element.stock_in,
        styles: {
          halign: "right",
        },
      },
      {
        content: element.berat_in,
        styles: {
          halign: "right",
        },
      },
      {
        content: element.kode_staff,
      },
    ];
    tableRows.push(row);
  });

  const footer = [
    {
      content: "Total",
      styles: {
        halign: "right",
      },
      colSpan: 6,
    },
    {
      content: data.reduce((a, b) => a + parseFloat(b.stock_in), 0),
      styles: {
        halign: "right",
      },
    },
    {
      content: data.reduce((a, b) => a + parseFloat(b.berat_in), 0).toFixed(3),
      styles: {
        halign: "right",
      },
    },
    {
      content: "",
      styles: {
        halign: "right",
      },
    },
  ];
  tableRows.push(footer);

  const printed = [
    {
      content: `Printed By Admin`,
      colSpan: 12,
      styles: {
        fontStyle: "italic",
        textColor: "#000",
        halign: "left",
      },
    },
  ];
  tableRows.push(printed);

  doc.autoTable({
    head: tableColumn,
    body: tableRows,
    startY: finalY,
    theme: "plain",
    margin: { top: 10 },
    bodyStyles: {
      fontSize: 8,
      halign: "center",
    },
    headStyles: {
      fontSize: 8,
      fillColor: "#E8E5E5",
      textColor: "#000",
      valign: "middle",
      halign: "center",
    },
    tableLineColor: [255, 255, 255],
    tableLineWidth: 1,
  });
  tableRows = [];
  tableColumn = [];
  finalY = doc.autoTableEndPosY() + 20;

  const pages = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  for (let j = 1; j < pages + 1; j += 1) {
    const horizontalPos = pageWidth / 2;
    const verticalPos = pageHeight - 10;
    doc.setPage(j);
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: "center",
    });
  }
  const string = doc.output("bloburl");
  const x = window.open();
  x.document.open();
  x.document.write(
    `<html>
    <head>
    <title>Terima Job Order Admin</title>
    </head>
    <body style='margin:0 !important'>
    <embed width='100%' height='100%'src='${string}'></embed>
    </body>
    </html>`
  );
};

export default pdfReport;
