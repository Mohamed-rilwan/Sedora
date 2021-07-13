import parseClip from "components/PasteToTable/parseClip";
import React, { useState } from "react";
import "./style.css";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

const sampleData = {
  liftPerYear: [],
  description: [],
  mass: [],
  length: [],
  depth: [],
  height: [],
};

const ValidateInputData = (liftManifest, numberOfLiftManifest) => {
  const item = liftManifest;
  [...Array(parseInt(numberOfLiftManifest)).keys()].map((_, index) =>
    Object.keys(liftManifest).forEach((col) => {
      if (liftManifest[col][index] === undefined) {
        item[col][index] = "";
      }
    })
  );
  return item;
};

const ClearData = (liftManifest, index) => {
  console.log("before", liftManifest);
  const item = liftManifest;
  if (index === undefined || index === null) {
    [...Array(parseInt(liftManifest.liftPerYear.length)).keys()].map(
      (_, index) =>
        Object.keys(liftManifest).forEach((col) => {
          item[col][index] = "";
        })
    );
    console.log("after", item);
  } else {
    Object.keys(liftManifest).forEach((col) => {
      item[col][index] = "";
    });
  }
  return item;
};

function LiftManifest(props) {
  console.log(props);
  const { data } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [liftManifest, setLiftManifest] = useState(() =>
    ValidateInputData(
      data.liftManifest,
      data?.globalInformation?.numberOfLiftManifest
    )
  );
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleExcelData = ({ target: { value } }) => {
    const parsedData = parseClip(value);
    setExcelData(parsedData);
    const manifestData = sampleData;
    let inValid = false;
    parsedData.forEach((manifest, columnIndex) => {
      // manifest.splice(0, 1);
      manifest.forEach((item, rowIndex) => {
        manifestData[Object.keys(manifestData)[rowIndex]][columnIndex] = item;
      });
    });
    console.log(manifestData);
    setLiftManifest(manifestData);
    props.handleData(manifestData, "liftManifest");
    setModalOpen(inValid);
    if (
      parsedData.length > parseInt(data.globalInformation.numberOfLiftManifest)
    ) {
      const globalData = data.globalInformation;
      globalData.numberOfLiftManifest = parsedData.length;
      props.handleData(globalData, "globalInformation");
      props.handleData(manifestData, "liftManifest");
    }
  };

  const handleData = (event, index) => {
    if (
      regexWithDecimal.test(event.target.value) ||
      event.target.value === "" ||
      event.target.name === "description"
    ) {
      const items = { ...liftManifest };
      items[event.target.name][index] = event.target.value;
      setLiftManifest(items);
      props.handleData(items, "liftManifest");
    }
  };
  return (
    <>
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Invalid Data
        </ModalHeader>
        <ModalBody>
          Invalid data added. Please check the rows and column for valid lift
          manifest data. The data must also include serial number column.s
        </ModalBody>
      </Modal>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Lift Manifest</CardTitle>
          <p className="card-category">Enter Manifest Items</p>
          <Row>
            <Col md="10" xs="10">
              <textarea
                value=""
                placeholder={
                  excelData.length > 0
                    ? "Data Entered from excel"
                    : "Paste your excel form data here..."
                }
                // placeholder="Paste your excel form data here..."
                onChange={handleExcelData}
              />
            </Col>
            <Col md="2" xs="2">
              <Button
                className={"clearButton"}
                aria-label="Cancel"
                onClick={() => {
                  setLiftManifest(
                    ClearData(liftManifest),
                    props.handleData(ClearData(liftManifest), "liftManifest")
                  );
                }}
              >
                Clear All
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            <Table>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>LIFTS PER YEAR</th>
                  <th>ITEM DESCRIPTION</th>
                  <th>MASS (Te)</th>
                  <th>LENGTH (m) (always largest)</th>
                  <th>DEPTH d (m)</th>
                  <th>HEIGHT h (m)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...Array(
                    parseInt(data.globalInformation.numberOfLiftManifest)
                  ).keys(),
                ].map((page, rowIndex) => (
                  <tr>
                    <th scope="row">{rowIndex + 1}</th>
                    <td>
                      <input
                        value={liftManifest.liftPerYear[rowIndex]}
                        name="liftPerYear"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.description[rowIndex]}
                        name="description"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.mass[rowIndex]}
                        name="mass"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.length[rowIndex]}
                        name="length"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.depth[rowIndex]}
                        name="depth"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.height[rowIndex]}
                        name="height"
                        onChange={(e) => handleData(e, rowIndex)}
                      ></input>
                    </td>
                    <td>
                      <Button
                        close
                        aria-label="Cancel"
                        onClick={() => {
                          setLiftManifest(
                            ClearData(liftManifest, rowIndex),
                            props.handleData(
                              ClearData(liftManifest, rowIndex),
                              "liftManifest"
                            )
                          );
                        }}
                      ></Button>
                    </td>
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

export default LiftManifest;
