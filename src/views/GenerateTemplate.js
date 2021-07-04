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
import React, { useState } from "react";
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
import generateTemplate from "service/droppedObject.service";
import GlobalInformation from "./User Input/GlobalInformation";
import ImpactEnergy from "./User Input/ImpactEnergy";
import ImpactProtection from "./User Input/ImpactProtection";
import ImpactType from "./User Input/ImpactType";
import LiftManifest from "./User Input/LiftManifest";
import TargetLayout from "./User Input/TargetLayout";

const sampleData = {
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
  let impact = Array.from({ length: value > 10 ? value / 10 : 1 }, (_, i) =>
    value > 10 ? (i + 1) * 10 : value
  );
  return value % 10 !== 0 && value > 10
    ? [...impact, impact[impact.length - 1] + (value % 10)]
    : impact;
};

function GenerateTemplate() {
  const [currentPage, setCurrentPage] = useState(0);
  const [validInfo, setValidInfo] = useState(false);
  const [showImpactEnergy, setShowImpactEnergy] = useState(false);
  const [data, setData] = useState(sampleData);

  const pagesCount = 6;

  const disableShowImpactEnergy = (step, item) => {
    console.log(step, item);
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
      console.log("reche", item);
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
    disableShowImpactEnergy("globalInformation", item);
    setData(info);
  };

  const handleLiftManifestData = (item) => {
    const info = { ...data };
    disableShowImpactEnergy("liftManifest", item);
    info.liftManifest = item;
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
                handleData={handleGlobalData}
              />
            )}
            {currentPage === 1 && (
              <LiftManifest
                data={data.liftManifest ?? null}
                handleData={handleLiftManifestData}
                numberOfItem={parseInt(
                  data.globalInformation["numberOfLiftManifest"]
                )}
              />
            )}
            {currentPage === 2 && (
              <TargetLayout
                depth={impactProp(
                  parseInt(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseInt(data.globalInformation["maxDistanceFomDropPoint"])
                )}
              />
            )}
            {currentPage === 3 && (
              <ImpactType
                depth={impactProp(
                  parseInt(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseInt(data.globalInformation["maxDistanceFomDropPoint"])
                )}
              />
            )}
            {currentPage === 4 && (
              <ImpactProtection
                depth={impactProp(
                  parseInt(data.globalInformation["maxWaterDepth"])
                )}
                distance={impactProp(
                  parseInt(data.globalInformation["maxDistanceFomDropPoint"])
                )}
              />
            )}
            {currentPage === 5 && (
              <ImpactEnergy
                data={data ?? null}
                handleData={handleLiftManifestData}
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
          onClick={() => generateTemplate(data)}
        >
          Generate Template
        </Button>
      </div>
    </>
  );
}

export default GenerateTemplate;
