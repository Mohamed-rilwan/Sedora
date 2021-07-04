import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

function TargetLayout(props) {
  console.log(props);
  const { depth, distance } = props;
  var inputArray = [];
  // for (var dep = 0; dep < depth; dep++) {
  //   for (var dist = 0; dist < distance; dist++) {
  //     inputArray[dep][dist] = {
  //       distance: distance[dist],
  //       depth: depth[dep],
  //       value: "",
  //     };
  //   }
  // }
  console.log(inputArray);
  const [targetLayout, setTargetLayout] = useState(inputArray);

  const handleData = (event, depth, distance, depIndex, distIndex) => {
    const items = targetLayout;
    console.log(depIndex, distIndex, items);
    items[(depIndex, distIndex)] = {
      distance: distance,
      depth: depth,
      value: event.target.value,
    };
    setTargetLayout(items);
    console.log(items);
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
                {depth.map((dep, depIndex) => (
                  <tr>
                    <th>{dep}</th>
                    {distance.map((dist, distIndex) => (
                      <td>
                        <input
                          onChange={(e) =>
                            handleData(e, dep, dist, depIndex, distIndex)
                          }
                          style={{ width: "100%" }}
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

export default TargetLayout;
