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

  let depth = Array.from(
    { length: props.maxWaterDepth / 10 },
    (_, i) => (i + 1) * 10
  );
  depth =
    props.maxWaterDept % 10 !== 0
      ? [...depth, depth[depth.length - 1] + (props.maxWaterDepth % 10)]
      : depth;

  let distance = Array.from(
    { length: props.maxDistanceFomDropPoint / 10 },
    (_, i) => (i + 1) * 10
  );

  distance =
    props.maxDistanceFomDropPoint % 10 !== 0
      ? [
          ...distance,
          distance[distance.length - 1] + (props.maxDistanceFomDropPoint % 10),
        ]
      : distance;

  console.log(props, depth, distance);

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
