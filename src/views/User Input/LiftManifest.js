import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

function LiftManifest(props) {
  console.log(props);
  const [globalInfo, setGlobalInfo] = useState([]);

  const handleData = (event) => {
    const items = { ...globalInfo };
    items[event.target.name] = event.target.value;
    console.log(items);
    setGlobalInfo(items);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Lift Manifest</CardTitle>
          <p className="card-category">Enter Manifest Items</p>
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
                {[...Array(props.numberOfItem)].map((page, i) => (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <input name="liftPerYear"></input>
                    </td>
                    <td>
                      <input name="description"></input>
                    </td>
                    <td>
                      <input name="mass"></input>
                    </td>
                    <td>
                      <input name="length"></input>
                    </td>
                    <td>
                      <input name="depth"></input>
                    </td>
                    <td>
                      <input name="height"></input>
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
