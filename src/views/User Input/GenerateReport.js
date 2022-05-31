import * as FileSaver from "file-saver";
import React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import * as XLSX from "xlsx";
import PasteFromExcel from "../../components/PasteToTable/index";
const GenerateReport = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Card style={{ overflowX: "auto" }}>
      <CardHeader>
        <CardTitle tag="h5">"Impact Protection Available (kJ)</CardTitle>
        <p className="card-category">
          Enter Impact Protection Available at each Depth
        </p>
        <Button onClick={exportToCSV}>Export</Button>
      </CardHeader>
      <CardBody>
        <PasteFromExcel />
      </CardBody>
    </Card>
  );
};

export default GenerateReport;
