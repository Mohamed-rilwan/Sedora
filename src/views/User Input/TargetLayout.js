import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

function TargetLayout(props) {
  const [globalInfo, setGlobalInfo] = useState([]);
  const { depth, distance } = props;

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
          <CardTitle tag="h5">Target Layout</CardTitle>
          <p className="card-category">Enter Target Layout</p>
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
                {depth.map((depth, i) => (
                  <tr>
                    <th>{depth}</th>
                    {distance.map((item, index) => (
                      <td>
                        <input style={{ width: "100%" }}></input>
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
