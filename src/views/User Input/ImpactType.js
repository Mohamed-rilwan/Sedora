import parseClip from "components/PasteToTable/parseClip";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";

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
function ImpactType(props) {
  const { depth, distance, data } = props;
  console.log(data);
  const [impactType, setImpactType] = useState(() => validateData(props));
  let invalidDistance = [];
  let invalidDepth = [];
  const [modalOpen, setModalOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);

  const handleExcelData = ({ target: { value } }) => {
    const parsedData = parseClip(value);
    console.log(parsedData);
    setExcelData(parsedData);
    const impactData = JSON.parse(JSON.stringify(impactType));
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
          if (rowIndex === 0 && parseInt(item) !== distance[columnIndex]) {
            invalidDistance.push(parseInt(item));
            inValid = true;
          }
          if (
            rowIndex > 0 &&
            columnIndex === 0 &&
            parseInt(item) !== depth[rowIndex - 1]
          ) {
            invalidDepth.push(parseInt(item));
            inValid = true;
          }
          if (!inValid && columnIndex > 0 && rowIndex > 0) {
            impactData[rowIndex - 1][columnIndex - 1] = {
              distance: distance[columnIndex - 1],
              depth: depth[rowIndex - 1],
              value: item,
            };
          }
        });
      });
    }
    if (!inValid) {
      console.log(impactData);
      setImpactType(impactData);
      props.handleData(impactData, "impactType");
    }
    setModalOpen(inValid);
  };

  const handleData = (event, depth, distance, depIndex, distIndex) => {
    const items = [...impactType];
    items[depIndex][distIndex] = {
      distance: distance,
      depth: depth,
      value: event.target.value,
    };
    setImpactType(items);
    props.handleData(items, "impactType");
  };
  return (
    <>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Invalid Data
        </ModalHeader>
        <ModalBody>
          Invalid data added. Please check the rows and column for valid Impact
          Type data. The data must also include header column.
        </ModalBody>
      </Modal>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Type of impact Expected</CardTitle>
          <p className="card-category">Enter Impact Type at each Depth</p>
          <textarea
            value=""
            placeholder={
              excelData.length > 0
                ? "Data Entered from excel"
                : "Paste your excel form data here..."
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
                        <Input
                          type="select"
                          name="impactType"
                          id="impactType"
                          value={impactType[depIndex][distIndex].value}
                          onChange={(e) =>
                            handleData(e, dep, dist, depIndex, distIndex)
                          }
                          style={{ width: "30vh" }}
                        >
                          <option></option>
                          <option>Fully shielded</option>
                          <option>Default - Perpendicular Impact</option>
                        </Input>
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

export default ImpactType;
