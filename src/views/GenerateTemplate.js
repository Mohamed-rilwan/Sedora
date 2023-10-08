
import React, { useContext, useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import GlobalInformation from "./User Input/GlobalInformation";
import ImpactEnergy from "./User Input/ImpactEnergy";
import ImpactProtection from "./User Input/ImpactProtection";
import ImpactType from "./User Input/ImpactType";
import LiftManifest from "./User Input/LiftManifest";
import TargetLayout from "./User Input/TargetLayout";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import GenerateReport from "./User Input/GenerateReport";
import { GlobalContext } from "components/context/GlobalContext";
import { impactProp } from "components/Common/helpers";
import {
  steelDamageDescription,
  flexibleDamageDescription,
  pipDamageDescription,
  UmbilicalDamageDescription,
} from "./Resistance/Helper";

export const sampleData = {
  globalInformation: {
    maxWaterDepth: "",
    dropFrequency: "",
    densityOfWater: "",
    probabilityOfDropOverWater: "",
    probabilityOfWindDirection: "",
    maxDistanceFomDropPoint: "",
    numberOfLiftManifest: "",
    typeOfPipeline: "",
    pipelineSize: "",
    innerPipeSize: "",
    odOfPipeline: "",
    odOfInnerPipeline: "",
    wallThickness: "",
    wallThicknessOfInnerPipe: "",
    materialOfConstruction: "",
    materialOfInnerPipeline: "",
    yieldStress: "",
    yieldStressOfInnerPipe: "",
    dragCoefficient: "",
    massCoefficient: "",
  },
  liftManifest: {
    liftPerYear: [],
    description: [],
    mass: [],
    length: [],
    depth: [],
    height: [],
  },
  targetLayout: [[]],
  impactProtection: [[]],
  impactType: [[]],
  impactEnergy: [[]],
};

const stepName = (step) => {
  if (step === 0) return "Global Information";
  if (step === 1) return "Lift Manifest";
  if (step === 2) return "Target Layout";
  if (step === 3) return "Impact Type";
  if (step === 4) return "Impact Protection";
  if (step === 5) return "Calculated Impact Energy";
};


function GenerateTemplate() {
  const { data, setData } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [showImpactEnergy, setShowImpactEnergy] = useState(
    data.impactEnergy.length > 1
  );
  // const [data, setData] = useState(sampleData);
  const pagesCount = 6;

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

  const disableShowImpactEnergy = (step, item) => {
    let emptyArray = false;
    if (step === "liftManifest") {
      for (let i = 0; i < data.globalInformation["numberOfLiftManifest"]; i++) {
        item.depth[i] === undefined ||
        item.depth[i] === "" ||
        item.length[i] === undefined ||
        item.length[i] === "" ||
        item.height[i] === undefined ||
        item.height[i] === "" ||
        item.mass[i] === undefined ||
        item.mass[i] === "" ||
        item.description[i] === undefined ||
        item.description[i] === "" ||
        item.liftPerYear[i] === undefined ||
        item.liftPerYear[i] === "" ||
        data.globalInformation.massCoefficient === "" ||
        data.globalInformation.massCoefficient === undefined ||
        data.globalInformation.dragCoefficient === "" ||
        data.globalInformation.dragCoefficient === undefined ||
        data.globalInformation.densityOfWater === ""
          ? (emptyArray = true)
          : (emptyArray = false);
      }
    } else if (step === "globalInformation") {
      for (let i = 0; i < data.globalInformation["numberOfLiftManifest"]; i++) {
        data.liftManifest.depth[i] === undefined ||
        data.liftManifest.depth[i] === "" ||
        data.liftManifest.length[i] === undefined ||
        data.liftManifest.length[i] === "" ||
        data.liftManifest.height[i] === undefined ||
        data.liftManifest.height[i] === "" ||
        data.liftManifest.mass[i] === undefined ||
        data.liftManifest.mass[i] === "" ||
        data.liftManifest.description[i] === undefined ||
        data.liftManifest.description[i] === "" ||
        data.liftManifest.liftPerYear[i] === undefined ||
        data.liftManifest.liftPerYear[i] === "" ||
        item.massCoefficient === "" ||
        item.massCoefficient === undefined ||
        item.dragCoefficient === "" ||
        item.dragCoefficient === undefined ||
        item.densityOfWater === ""
          ? (emptyArray = true)
          : (emptyArray = false);
      }
    }
    setShowImpactEnergy(!emptyArray);
  };

  const handleLiftManifestData = (item) => {
    const info = { ...data };
    disableShowImpactEnergy("liftManifest", item);
    info.liftManifest = item;
    setData(info);
  };
  const handleInputData = (item, step) => {
    const info = { ...data };
    info[step] = item;
    disableShowImpactEnergy(step, item);
    if (item.typeOfPipeline !== "") {
      switch (item.typeOfPipeline) {
        case "Steel Pipeline / Riser":
          info.damageDescription = steelDamageDescription;
          break;
        case "Flexible Pipeline / Riser":
          info.damageDescription = flexibleDamageDescription;
          break;
        case "Umbilical":
          info.damageDescription = UmbilicalDamageDescription;
          break;
        case "Steel Pipe-in-Pipe / Riser":
          info.damageDescription = pipDamageDescription;
          break;
        default:
          break;
      }
    }
    setData(info);
  };

  const handleImpactProtection = (item) => {
    const info = { ...data };
    info.impactProtection = item;
    setData(info);
  };

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const disableNavigation = (step) => {
    switch (step) {
      case 1:
        return !data.globalInformation["numberOfLiftManifest"];
      case 2:
      case 3:
      case 4:
        return (
          data.globalInformation["maxWaterDepth"] === "" ||
          data.globalInformation["maxDistanceFomDropPoint"] === ""
        );
      case 5:
        return !showImpactEnergy;
      default:
        break;
    }
  };

  return (
    <>
      <div className="content">
        <Pagination
          style={{ marginLeft: "25%" }}
          size="md"
          aria-label="Page navigation example"
        >
          <PaginationItem
            disabled={currentPage === 0 || disableNavigation(currentPage - 1)}
          >
            <PaginationLink
              previous
              href="#"
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)
              }
            />
          </PaginationItem>
          {[...Array(pagesCount)].map((page, i) => (
            <PaginationItem
              disabled={disableNavigation(i)}
              active={i === currentPage}
              key={i}
            >
              <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
                {stepName(i)}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            disabled={currentPage === 5 || disableNavigation(currentPage + 1)}
          >
            <PaginationLink
              next
              href="#"
              onClick={() =>
                setCurrentPage(currentPage < 6 ? currentPage + 1 : 5)
              }
            />
          </PaginationItem>
        </Pagination>

        <Row>
          <Col md="12">
            {currentPage === 0 && (
              <GlobalInformation
                data={data.globalInformation ?? null}
                handleData={handleInputData}
              />
            )}
            {currentPage === 1 && (
              <LiftManifest
                data={data ?? null}
                handleData={handleInputData}
                numberOfItem={parseInt(
                  data.globalInformation["numberOfLiftManifest"]
                )}
              />
            )}
            {currentPage === 2 && (
              <TargetLayout
                data={data.targetLayout ?? [[]]}
                depth={impactProp(
                  parseFloat(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseFloat(data.globalInformation["maxDistanceFomDropPoint"])
                )}
                handleData={handleInputData}
              />
            )}
            {currentPage === 3 && (
              <ImpactType
                data={data.impactType}
                depth={impactProp(
                  parseInt(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseInt(data.globalInformation["maxDistanceFomDropPoint"])
                )}
                handleData={handleInputData}
              />
            )}
            {currentPage === 4 && (
              <ImpactProtection
                data={data.impactProtection}
                depth={impactProp(
                  parseInt(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseInt(data.globalInformation["maxDistanceFomDropPoint"])
                )}
                handleData={handleInputData}
              />
            )}
            {currentPage === 5 && (
              <ImpactEnergy
                handleData={handleInputData}
                data={data ?? null}
                numberOfItem={parseInt(
                  data.globalInformation["numberOfLiftManifest"]
                )}
              />
            )}
          </Col>
        </Row>

        <Button
          style={{ marginLeft: "2%" }}
          className="btn-round"
          color="primary"
          type="submit"
          onClick={(e) => exportToCSV(data.liftManifest, "file")}
        >
          Download Report
        </Button>
      </div>
    </>
  );
}

export default GenerateTemplate;
