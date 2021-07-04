import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Table,
} from "reactstrap";

function ImpactProtection(props) {
  const [globalInfo, setGlobalInfo] = useState([]);
  const { depth, distance } = props;

  const handleData = (event) => {
    const items = { ...globalInfo };
    items[event.target.name] = event.target.value;
    setGlobalInfo(items);
  };
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Impact Protection</CardTitle>
          <p className="card-category">Enter Impact Protection</p>
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
                        <Input style={{ width: "100%" }} />
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

export default ImpactProtection;
