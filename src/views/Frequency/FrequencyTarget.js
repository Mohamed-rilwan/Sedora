import { GlobalContext } from "components/context/GlobalContext";
import parseClip from "components/PasteToTable/parseClip";
import React, { useContext, useState } from "react";
import NormalDistribution from "normal-distribution";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import GlobalInformation from "views/User Input/GlobalInformation";
import {
  handleNormalDistributionData,
  probabilityOfFallingWithinRing,
  probabilityOfHittingWithinRing,
} from "./Helper";

const validateData = (props) => {
  var item = Array.from({ length: props.depth.length }, () =>
    Array.from({ length: props.distance.length }, () => {})
  );
  for (let dep = 0; dep < props.depth.length; dep++) {
    for (let dist = 0; dist < props.distance.length; dist++) {
      if (props.data === null || props.data === undefined) {
        item[dep][dist] = {
          depth: props.depth[dep],
          distance: props.distance[dep],
          value: {
            depth: props.depth[dep],
            distance: props.distance[dist],
            value: "",
          },
        };
      } else {
        item[dep][dist] =
          props.data?.[dep]?.[dist] === undefined
            ? {
                depth: props.depth[dep],
                distance: props.distance[dist],
                value: "",
              }
            : props.data[dep][dist];
      }
    }
  }
  return item;
};

function FrequencyTarget(props) {
  const { data, setData } = useContext(GlobalContext);
  const { depth, distance, rowId = false } = props;
  console.log(data);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  let invalidDistance = [];
  let invalidDepth = [];
  const [modalOpen, setModalOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [targetLayout, setTargetLayout] = useState(() => validateData(props));
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleExcelData = ({ target: { value } }) => {
    const parsedData = parseClip(value);
    setExcelData(parsedData);
    const targetData = JSON.parse(JSON.stringify(targetLayout));
    let inValid = false;
    if (
      parsedData.length !== depth.length + 1 ||
      parsedData[0].length !== distance.length + 1
    )
      inValid = true;

    if (!inValid) {
      parsedData.forEach((manifest, rowIndex) => {
        rowIndex === 0 && manifest.splice(0, 1);
        manifest.forEach((item, columnIndex) => {
          if (rowIndex === 0 && parseFloat(item) !== distance[columnIndex]) {
            invalidDistance.push(parseFloat(item));
            inValid = true;
          }
          if (
            rowIndex > 0 &&
            columnIndex === 0 &&
            parseFloat(item) !== depth[rowIndex - 1]
          ) {
            invalidDepth.push(parseFloat(item));
            inValid = true;
          }
          if (!inValid && columnIndex > 0 && rowIndex > 0) {
            targetData[rowIndex - 1][columnIndex - 1] = {
              distance: distance[columnIndex - 1],
              depth: depth[rowIndex - 1],
              value: isNaN(parseFloat(item)) ? "" : parseFloat(item),
            };
          }
        });
      });
    }
    if (!inValid) {
      setTargetLayout(targetData);
      props.handleData(targetData, "targetLayout");
    }
    setModalOpen(inValid);
  };

  const calculateLateralDeviation = (depth) => {
    const lateralDeviation =
      depth *
      Math.tan((data?.impactEnergy?.angularDeviation?.[rowId] * Math.PI) / 180);
    const roundedLd =
      Math.round((lateralDeviation + Number.EPSILON) * 100) / 100;
    return roundedLd;
  };

  const cdfNormaldistribution = (distance, depth) => {
    if (depth > 10) {
      debugger;
    }
    const lateralDeviation =
      depth *
      Math.tan((data?.impactEnergy?.angularDeviation?.[rowId] * Math.PI) / 180);
    const normDist = new NormalDistribution(0, lateralDeviation);
    return normDist.probabilityBetween(distance, -distance).toExponential(2);
  };

  const normalDistributionByFormula = (distance, depth) => {
    const ld = calculateLateralDeviation(depth);
    const nd =
      (1 / (ld * Math.sqrt(2 * Math.PI))) *
      Math.exp((-0.5 * Math.pow(distance, 2)) / Math.pow(ld, 2));
    debugger;
    return nd.toExponential(2);
  };

  const handleData = (event, depth, distance, depIndex, distIndex) => {
    const items = [...targetLayout];
    if (regexWithDecimal.test(event.target.value) || event.target.value === "")
      items[depIndex][distIndex] = {
        distance: distance,
        depth: depth,
        value: event.target.value,
      };

    setTargetLayout(items);
    props.handleData(items, "targetLayout");
  };
  return (
    <>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Invalid Data
        </ModalHeader>
        <ModalBody>
          Invalid data added. Please check the rows and column for valid target
          layout data. The data must also include header column.
        </ModalBody>
      </Modal>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">
            Manifest Item : {data.liftManifest.description[rowId]}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
                <th>Lateral Deviation</th>
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                    <td>{calculateLateralDeviation(dep)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">
            Step A1& A2: Prob of Falling within the Radius{" "}
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span>
                          {handleNormalDistributionData(
                            data,
                            rowId,
                            dist,
                            dep
                          ).toExponential(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">
            Step A3: Prob of Falling within the RING
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span>
                          {probabilityOfFallingWithinRing(
                            data,
                            rowId,
                            distance,
                            dist,
                            dep,
                            distIndex
                          ) === 0
                            ? ""
                            : probabilityOfFallingWithinRing(
                                data,
                                rowId,
                                distance,
                                dist,
                                dep,
                                distIndex
                              ).toExponential(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">
            TABLE-B: Probability of hitting the target within the ring
            (area/AREA)
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span>
                          {probabilityOfHittingWithinRing(
                            data,
                            distance,
                            depIndex,
                            distIndex,
                            rowId
                          ) === 0
                            ? ""
                            : probabilityOfHittingWithinRing(
                                data,
                                distance,
                                depIndex,
                                distIndex,
                                rowId
                              ).toExponential(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">
            TABLE-C: Probability of hitting the target
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
                <th>Terminal Energy</th>
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span>
                          {probabilityOfFallingWithinRing(
                            data,
                            rowId,
                            distance,
                            dist,
                            dep,
                            distIndex
                          ) *
                            probabilityOfHittingWithinRing(
                              data,
                              distance,
                              depIndex,
                              distIndex,
                              rowId
                            ) ===
                          0
                            ? ""
                            : (
                                probabilityOfFallingWithinRing(
                                  data,
                                  rowId,
                                  distance,
                                  dist,
                                  dep,
                                  distIndex
                                ) *
                                probabilityOfHittingWithinRing(
                                  data,
                                  distance,
                                  depIndex,
                                  distIndex,
                                  rowId
                                )
                              ).toExponential(2)}
                        </span>
                      </td>
                    ))}

                    <td>{`ADD TERMINAL ENERGY`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- D: IMPACT Energy</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">
            TABLE- E: RESIDUAL Energy available to damage pipeline
          </p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- F: D1 Damage Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">D1 Damage Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- G: D2 Damage Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">D2 Damage Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- H: D3 Damage Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">D3 Damage Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- I: R0 Release Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">No (R0) Release Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- J: R1 Release Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">Small (R1) Release Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">TABLE- K: R2 Release Probability</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <p className="card-category">Major (R2) Release Frequency</p>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <th>Depth</th>
                {distance.map((item, index) => (
                  <th>{item}</th>
                ))}
              </thead>
              <tbody>
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <span> {targetLayout[depIndex][distIndex].value}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default FrequencyTarget;
