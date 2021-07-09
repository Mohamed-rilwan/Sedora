import parseClip from "components/PasteToTable/parseClip";
import { invalid } from "moment";
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
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

const ValidateInputData = (data) => {
  const item = data.liftManifest;
  [...Array(parseInt(data.globalInformation.numberOfLiftManifest)).keys()].map(
    (_, index) =>
      Object.keys(data.liftManifest).forEach((col) => {
        if (data.liftManifest[col][index] === undefined) {
          item[col][index] = "";
        }
      })
  );
  return item;
};

function LiftManifest(props) {
  const { data } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [liftManifest, setLiftManifest] = useState(() =>
    ValidateInputData(data)
  );
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleExcelData = ({ target: { value } }) => {
    const parsedData = parseClip(value);
    setExcelData(parsedData);
    const manifestData = sampleData;
    let inValid = false;
    parsedData.forEach((manifest, columnIndex) => {
      manifest.splice(0, 1);
      manifest.forEach((item, rowIndex) => {
        manifestData[Object.keys(manifestData)[rowIndex]][columnIndex] = item;
      });
    });
    console.log(manifestData);
    setLiftManifest(manifestData);
    setModalOpen(inValid);
    if (
      parsedData.length !==
      parseInt(data.globalInformation.numberOfLiftManifest)
    ) {
      const globalData = data.globalInformation;
      globalData.numberOfItem = parsedData.length;
      props.handleData(globalData, "globalInformation");
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
          <textarea
            value={""}
            placeholder="Paste your excel form data here..."
            onChange={handleExcelData}
          />
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
                ].map((page, i) => (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <input
                        value={liftManifest.liftPerYear[i]}
                        name="liftPerYear"
                        onChange={(e) => handleData(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.description[i]}
                        name="description"
                        onChange={(e) => handleData(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.mass[i]}
                        name="mass"
                        onChange={(e) => handleData(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.length[i]}
                        name="length"
                        onChange={(e) => handleData(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.depth[i]}
                        name="depth"
                        onChange={(e) => handleData(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={liftManifest.height[i]}
                        name="height"
                        onChange={(e) => handleData(e, i)}
                      ></input>
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
