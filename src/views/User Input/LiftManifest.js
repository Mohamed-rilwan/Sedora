import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

const data = {
  liftPerYear: [],
  description: [],
  mass: [],
  length: [],
  depth: [],
  height: [],
};
function LiftManifest(props) {
  console.log(props);
  const [liftManifest, setLiftManifest] = useState(data);

  const handleChange = (event, index) => {
    const items = { ...liftManifest };
    items[event.target.name][index] = event.target.value;
    setLiftManifest(items);
    props.handleChange(items);
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
                      <input
                        name="liftPerYear"
                        onChange={(e) => handleChange(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        name="description"
                        onChange={(e) => handleChange(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        name="mass"
                        onChange={(e) => handleChange(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        name="length"
                        onChange={(e) => handleChange(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        name="depth"
                        onChange={(e) => handleChange(e, i)}
                      ></input>
                    </td>
                    <td>
                      <input
                        name="height"
                        onChange={(e) => handleChange(e, i)}
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
