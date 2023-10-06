
import { GlobalContext } from "components/context/GlobalContext";
import React, { useContext, useState } from "react";
// reactstrap components
import {
  Button,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import FlexiblePipe from "./FlexiblePipe";
import PipeInPipe from "./PipeInPipe";
import SteelPipe from "./SteelPipe";
import UmbilicalPipe from "./UmbilicalPipe";

const stepName = (step) => {
  if (step === 0) return "Resistance (St.Pipeline)";
  if (step === 1) return "Resistance (St.FlexiPipeline)";
  if (step === 2) return "Resistance (Umbilicals)";
  if (step === 3) return "Resistance (PIP)";
};

const getCurrentStep = (step) => {
  switch (step) {
    case "Steel Pipeline / Riser":
      return 0;
    case "Flexible Pipeline / Riser":
      return 1;
    case "Umbilical":
      return 2;
    case "Steel Pipe-in-Pipe / Riser":
      return 3;
    default: return;
  }
};

function CalculateResistance() {
  const { data, setData } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(
    getCurrentStep(data.globalInformation["typeOfPipeline"])
  );
  const [validInfo, setValidInfo] = useState(false);
  const [showImpactEnergy, setShowImpactEnergy] = useState(false);
  // const [data, setData] = useState();

  const pagesCount = 4;

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
      case 0:
        return (
          data.globalInformation["typeOfPipeline"] !== "Steel Pipeline / Riser"
        );
      case 1:
        return (
          data.globalInformation["typeOfPipeline"] !==
          "Flexible Pipeline / Riser"
        );
      case 2:
        return data.globalInformation["typeOfPipeline"] !== "Umbilical";
      case 3:
        return (
          data.globalInformation["typeOfPipeline"] !==
          "Steel Pipe-in-Pipe / Riser"
        );

      case 4:
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
          ></PaginationItem>
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
          ></PaginationItem>
        </Pagination>

        <Row>
          <Col md="12">
            {currentPage === 0 && <SteelPipe />}
            {currentPage === 1 && <FlexiblePipe />}
            {currentPage === 2 && <UmbilicalPipe />}
            {currentPage === 3 && <PipeInPipe />}
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
        >
          Download Report
        </Button>
      </div>
    </>
  );
}

export default CalculateResistance;
