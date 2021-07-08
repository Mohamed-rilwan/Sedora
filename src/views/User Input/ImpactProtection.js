import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

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
function ImpactProtection(props) {
  const { depth, distance, data } = props;

  const [impactProtection, setImpactProtection] = useState(() =>
    validateData(props)
  );
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleData = (event, depth, distance, depIndex, distIndex) => {
    const items = [...impactProtection];
    if (
      regexWithDecimal.test(event.target.value) ||
      event.target.value === ""
    ) {
      items[depIndex][distIndex] = {
        distance: distance,
        depth: depth,
        value: event.target.value,
      };
    }

    setImpactProtection(items);
    props.handleData(items, "impactProtection");
  };
  return (
    <>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">"Impact Protection Available (kJ)</CardTitle>
          <p className="card-category">
            Enter Impact Protection Available at each Depth
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
                        <input
                          value={impactProtection[depIndex][distIndex]["value"]}
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

export default ImpactProtection;
