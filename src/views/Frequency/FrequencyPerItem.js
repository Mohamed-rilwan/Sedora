
import { impactProp } from "components/Common/helpers";
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
import TargetLayout from "views/User Input/TargetLayout";
import FrequencyTarget from "./FrequencyTarget";

const stepName = (step) => {
  if (step === 0) return "Resistance (St.Pipeline)";
  if (step === 1) return "Resistance (St.FlexiPipeline)";
  if (step === 2) return "Resistance (Umbilicals)";
  if (step === 3) return "Resistance (PIP)";
};

function FrequencyPerItem() {
  const { data, setData } = useContext(GlobalContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [validInfo, setValidInfo] = useState(false);
  const [showImpactEnergy, setShowImpactEnergy] = useState(false);
  // const [data, setData] = useState();

  const pagesCount = data.globalInformation["numberOfLiftManifest"];

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

  const chunks = (arrLength, chunkSize) => {
    var a = Array.from({ length: arrLength }, (_, index) => index + 1);
    var arrays = [],
      size = chunkSize;
    while (a.length > 0) arrays.push(a.splice(0, size));
    return arrays;
  };

  return (
    <>
      <div className="content">
        <Pagination
          style={{ marginLeft: "12%" }}
          size="md"
          aria-label="Page navigation example"
        >
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink
              previous
              href="#"
              onClick={() => setCurrentPage(currentPage ? currentPage : 0)}
            />
          </PaginationItem>
          {chunks(
            parseInt(data.globalInformation["numberOfLiftManifest"]) || 0,
            2
          ).map((pages, index) => (
            <PaginationItem active={pages === currentPage} key={pages}>
              <li style={{ display: "contents" }}>
                {pages.map((page, i) => (
                  <PaginationLink
                    onClick={(e) => handlePageClick(e, page)}
                    href="#"
                  >
                    {page}
                  </PaginationLink>
                ))}
              </li>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink
              next
              href="#"
              disabled={
                currentPage ===
                parseInt(data.globalInformation["numberOfLiftManifest"]) - 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage <
                    parseInt(data.globalInformation["numberOfLiftManifest"])
                    ? currentPage + 1
                    : parseInt(data.globalInformation["numberOfLiftManifest"])
                )
              }
            />
          </PaginationItem>
        </Pagination>

        <Row>
          <Col md="12">
            <FrequencyTarget
              data={data.targetLayout ?? [[]]}
              rowId={currentPage}
              depth={impactProp(
                parseFloat(data.globalInformation["maxWaterDepth"])
              )}
              distance={impactProp(
                parseFloat(data.globalInformation["maxDistanceFomDropPoint"])
              )}
            />
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

export default FrequencyPerItem;
