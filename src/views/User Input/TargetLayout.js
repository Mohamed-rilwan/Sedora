import { parse } from "@babel/core";
import parseClip from "components/PasteToTable/parseClip";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import targetRep from "../../assets/img/TargetLayout.png";

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
  console.log(item);
  return item;
};
function TargetLayout(props) {
  const { depth, distance, data } = props;
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
            console.log("Reaf");
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
    console.log(targetData);
    setModalOpen(inValid);
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
          <CardTitle tag="h5">Target Layout</CardTitle>
          <p className="card-category">
            Enter the length of target within the ring.
            <span style={{ padding: "0.5% 0 0 0.5%" }}>
              <i
                id={"TooltipExample"}
                className={"nc-icon nc-alert-circle-i"}
              />
              <Tooltip
                style={{
                  backgroundColor: "#dddddd",
                }}
                placement="right"
                isOpen={tooltipOpen}
                target="TooltipExample"
                toggle={toggle}
              >
                <img
                  src={targetRep}
                  style={{ width: "500vw", height: "500vh" }}
                  alt="targetLayout"
                />
              </Tooltip>
            </span>
          </p>
          <textarea
            value=""
            placeholder={
              excelData.length > 0
                ? "Data Entered from excel"
                : "Paste your excel form data here... [Include x-axis and y axis values]"
            }
            onChange={handleExcelData}
          />
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
                        <input
                          value={targetLayout[depIndex][distIndex].value}
                          onChange={(e) =>
                            handleData(e, dep, dist, depIndex, distIndex)
                          }
                          style={{ width: "30vh" }}
                        ></input>
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

export default TargetLayout;
