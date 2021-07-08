import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
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
  const [impactType, setImpactType] = useState(() => validateData(props));
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
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Type of impact Expected</CardTitle>
          <p className="card-category">Enter Impact Type at each Depth</p>
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
                          value={impactType[depIndex][distIndex]["value"]}
                          onChange={(e) =>
                            handleData(e, dep, dist, depIndex, distIndex)
                          }
                          style={{ width: "30vh" }}
                        >
                          <option></option>
                          <option>Fully shielded</option>
                          <option>Perpendicular Impact</option>
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
