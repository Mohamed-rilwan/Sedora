/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useState } from "react";
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

export const sampletagert = [
  [
    {
      depth: 10,
      distance: 10,
      value: "Fully shielded",
    },
    {
      depth: 10,
      distance: 20,
      value: "9+5",
    },
    {
      depth: 10,
      distance: 30,
      value: "8",
    },
    {
      depth: 10,
      distance: 40,
      value: "",
    },
    {
      depth: 10,
      distance: 50,
      value: "",
    },
    {
      depth: 10,
      distance: 60,
      value: "",
    },
    {
      depth: 10,
      distance: 70,
      value: "",
    },
    {
      depth: 10,
      distance: 80,
      value: "",
    },
    {
      depth: 10,
      distance: 90,
      value: "",
    },
    {
      depth: 10,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 20,
      distance: 10,
      value: "",
    },
    {
      depth: 20,
      distance: 20,
      value: "",
    },
    {
      depth: 20,
      distance: 30,
      value: "",
    },
    {
      depth: 20,
      distance: 40,
      value: "",
    },
    {
      depth: 20,
      distance: 50,
      value: "",
    },
    {
      depth: 20,
      distance: 60,
      value: "",
    },
    {
      depth: 20,
      distance: 70,
      value: "",
    },
    {
      depth: 20,
      distance: 80,
      value: "",
    },
    {
      depth: 20,
      distance: 90,
      value: "",
    },
    {
      depth: 20,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 30,
      distance: 10,
      value: "",
    },
    {
      depth: 30,
      distance: 20,
      value: "",
    },
    {
      depth: 30,
      distance: 30,
      value: "",
    },
    {
      depth: 30,
      distance: 40,
      value: "",
    },
    {
      depth: 30,
      distance: 50,
      value: "",
    },
    {
      depth: 30,
      distance: 60,
      value: "",
    },
    {
      depth: 30,
      distance: 70,
      value: "",
    },
    {
      depth: 30,
      distance: 80,
      value: "",
    },
    {
      depth: 30,
      distance: 90,
      value: "",
    },
    {
      depth: 30,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 40,
      distance: 10,
      value: "",
    },
    {
      depth: 40,
      distance: 20,
      value: "",
    },
    {
      depth: 40,
      distance: 30,
      value: "",
    },
    {
      depth: 40,
      distance: 40,
      value: "",
    },
    {
      depth: 40,
      distance: 50,
      value: "",
    },
    {
      depth: 40,
      distance: 60,
      value: "",
    },
    {
      depth: 40,
      distance: 70,
      value: "",
    },
    {
      depth: 40,
      distance: 80,
      value: "",
    },
    {
      depth: 40,
      distance: 90,
      value: "",
    },
    {
      depth: 40,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 50,
      distance: 10,
      value: "",
    },
    {
      depth: 50,
      distance: 20,
      value: "",
    },
    {
      depth: 50,
      distance: 30,
      value: "",
    },
    {
      depth: 50,
      distance: 40,
      value: "",
    },
    {
      depth: 50,
      distance: 50,
      value: "",
    },
    {
      depth: 50,
      distance: 60,
      value: "",
    },
    {
      depth: 50,
      distance: 70,
      value: "",
    },
    {
      depth: 50,
      distance: 80,
      value: "",
    },
    {
      depth: 50,
      distance: 90,
      value: "",
    },
    {
      depth: 50,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 60,
      distance: 10,
      value: "",
    },
    {
      depth: 60,
      distance: 20,
      value: "",
    },
    {
      depth: 60,
      distance: 30,
      value: "",
    },
    {
      depth: 60,
      distance: 40,
      value: "",
    },
    {
      depth: 60,
      distance: 50,
      value: "",
    },
    {
      depth: 60,
      distance: 60,
      value: "",
    },
    {
      depth: 60,
      distance: 70,
      value: "",
    },
    {
      depth: 60,
      distance: 80,
      value: "",
    },
    {
      depth: 60,
      distance: 90,
      value: "",
    },
    {
      depth: 60,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 70,
      distance: 10,
      value: "",
    },
    {
      depth: 70,
      distance: 20,
      value: "",
    },
    {
      depth: 70,
      distance: 30,
      value: "",
    },
    {
      depth: 70,
      distance: 40,
      value: "",
    },
    {
      depth: 70,
      distance: 50,
      value: "",
    },
    {
      depth: 70,
      distance: 60,
      value: "",
    },
    {
      depth: 70,
      distance: 70,
      value: "",
    },
    {
      depth: 70,
      distance: 80,
      value: "",
    },
    {
      depth: 70,
      distance: 90,
      value: "",
    },
    {
      depth: 70,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 80,
      distance: 10,
      value: "",
    },
    {
      depth: 80,
      distance: 20,
      value: "",
    },
    {
      depth: 80,
      distance: 30,
      value: "",
    },
    {
      depth: 80,
      distance: 40,
      value: "",
    },
    {
      depth: 80,
      distance: 50,
      value: "",
    },
    {
      depth: 80,
      distance: 60,
      value: "",
    },
    {
      depth: 80,
      distance: 70,
      value: "",
    },
    {
      depth: 80,
      distance: 80,
      value: "",
    },
    {
      depth: 80,
      distance: 90,
      value: "",
    },
    {
      depth: 80,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 90,
      distance: 10,
      value: "",
    },
    {
      depth: 90,
      distance: 20,
      value: "",
    },
    {
      depth: 90,
      distance: 30,
      value: "",
    },
    {
      depth: 90,
      distance: 40,
      value: "",
    },
    {
      depth: 90,
      distance: 50,
      value: "",
    },
    {
      depth: 90,
      distance: 60,
      value: "",
    },
    {
      depth: 90,
      distance: 70,
      value: "",
    },
    {
      depth: 90,
      distance: 80,
      value: "",
    },
    {
      depth: 90,
      distance: 90,
      value: "",
    },
    {
      depth: 90,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 100,
      distance: 10,
      value: "",
    },
    {
      depth: 100,
      distance: 20,
      value: "",
    },
    {
      depth: 100,
      distance: 30,
      value: "",
    },
    {
      depth: 100,
      distance: 40,
      value: "",
    },
    {
      depth: 100,
      distance: 50,
      value: "",
    },
    {
      depth: 100,
      distance: 60,
      value: "",
    },
    {
      depth: 100,
      distance: 70,
      value: "",
    },
    {
      depth: 100,
      distance: 80,
      value: "",
    },
    {
      depth: 100,
      distance: 90,
      value: "",
    },
    {
      depth: 100,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 110,
      distance: 10,
      value: "",
    },
    {
      depth: 110,
      distance: 20,
      value: "",
    },
    {
      depth: 110,
      distance: 30,
      value: "",
    },
    {
      depth: 110,
      distance: 40,
      value: "",
    },
    {
      depth: 110,
      distance: 50,
      value: "",
    },
    {
      depth: 110,
      distance: 60,
      value: "",
    },
    {
      depth: 110,
      distance: 70,
      value: "",
    },
    {
      depth: 110,
      distance: 80,
      value: "",
    },
    {
      depth: 110,
      distance: 90,
      value: "",
    },
    {
      depth: 110,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 120,
      distance: 10,
      value: "",
    },
    {
      depth: 120,
      distance: 20,
      value: "",
    },
    {
      depth: 120,
      distance: 30,
      value: "",
    },
    {
      depth: 120,
      distance: 40,
      value: "",
    },
    {
      depth: 120,
      distance: 50,
      value: "",
    },
    {
      depth: 120,
      distance: 60,
      value: "",
    },
    {
      depth: 120,
      distance: 70,
      value: "",
    },
    {
      depth: 120,
      distance: 80,
      value: "",
    },
    {
      depth: 120,
      distance: 90,
      value: "",
    },
    {
      depth: 120,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 130,
      distance: 10,
      value: "",
    },
    {
      depth: 130,
      distance: 20,
      value: "",
    },
    {
      depth: 130,
      distance: 30,
      value: "",
    },
    {
      depth: 130,
      distance: 40,
      value: "",
    },
    {
      depth: 130,
      distance: 50,
      value: "",
    },
    {
      depth: 130,
      distance: 60,
      value: "",
    },
    {
      depth: 130,
      distance: 70,
      value: "",
    },
    {
      depth: 130,
      distance: 80,
      value: "",
    },
    {
      depth: 130,
      distance: 90,
      value: "",
    },
    {
      depth: 130,
      distance: 100,
      value: "",
    },
  ],
  [
    {
      depth: 136,
      distance: 10,
      value: "",
    },
    {
      depth: 136,
      distance: 20,
      value: "",
    },
    {
      depth: 136,
      distance: 30,
      value: "",
    },
    {
      depth: 136,
      distance: 40,
      value: "",
    },
    {
      depth: 136,
      distance: 50,
      value: "",
    },
    {
      depth: 136,
      distance: 60,
      value: "",
    },
    {
      depth: 136,
      distance: 70,
      value: "",
    },
    {
      depth: 136,
      distance: 80,
      value: "",
    },
    {
      depth: 136,
      distance: 90,
      value: "",
    },
    {
      depth: 136,
      distance: 100,
      value: "",
    },
  ],
];

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

const impactProp = (value) => {
  const initialValue = value;
  let impact = Array.from({ length: value > 10 ? value / 10 : 1 }, (_, i) =>
    value > 10 ? (i + 1) * 10 : value
  );
  return value % 10 !== 0 && value > 10 ? [...impact, value] : impact;
};

function GenerateTemplate() {
  const { data, setData } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [showImpactEnergy, setShowImpactEnergy] = useState(false);
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
    let emptyArray = true;
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
    }
    if (step === "globalInformation") {
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

  const handleGlobalData = (item) => {
    const info = { ...data };
    info.globalInformation = item;
    // if (
    //   item.maxWaterDepth !== data.globalInformation.maxWaterDepth ||
    //   item.maxDistanceFomDropPoint !==
    //     data.globalInformation.maxDistanceFomDropPoint
    // ) {
    //   info.targetLayout = sampleData.targetLayout;
    //   info.impactProtection = sampleData.impactProtection;
    //   info.impactType = sampleData.impactType;
    // }
    disableShowImpactEnergy("globalInformation", item);
    setData(info);
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
                data={data ?? null}
                handleData={handleInputData}
                numberOfItem={parseInt(
                  data.globalInformation["numberOfLiftManifest"]
                )}
              />
            )}
          </Col>
        </Row>

        <Button
          style={{ marginLeft: "30%" }}
          className="btn-round"
          color="primary"
          type="submit"
          onClick={() => {
            setCurrentPage(5);
          }}
          disabled={!showImpactEnergy}
        >
          Calculate Impact Energy
        </Button>

        <Button
          style={{ marginLeft: "2%" }}
          className="btn-round"
          color="primary"
          type="submit"
        >
          Generate Template
        </Button>
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
