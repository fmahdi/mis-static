
import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function ExportButtons({ data, filename }) {
  const toExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  const toPDF = () => {
    const input = document.getElementById('dashboard');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
      pdf.save(`${filename}.pdf`);
    });
  };

  return (
    <div className="export-buttons">
      <CSVLink data={data} filename={`${filename}.csv`}>
        <button>Download CSV</button>
      </CSVLink>
      <button onClick={toExcel}>Download Excel</button>
      <button onClick={toPDF}>Download PDF</button>
    </div>
  );
}
