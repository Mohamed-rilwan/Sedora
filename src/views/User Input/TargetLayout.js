import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Tooltip,
  UncontrolledTooltip,
} from "reactstrap";
import targetRep from "../../assets/img/TargetLayout.png";

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
function TargetLayout(props) {
  const { depth, distance, data } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [targetLayout, setTargetLayout] = useState(() => validateData(props));
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleData = (event, depth, distance, depIndex, distIndex) => {
    const items = [...targetLayout];
    if (regexWithDecimal.test(event.target.value) || event.target.value === "")
      items[depIndex][distIndex] = {
        distance: distance,
        depth: depth,
        value: event.target.value,
      };

    setTargetLayout(items);
    props.handleData(items, "targetLayout");
  };
  return (
    <>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Target Layout</CardTitle>
          <p className="card-category">
            Enter the length of target within the ring.
            <span style={{ padding: "0.5% 0 0 0.5%" }}>
              <i
                id={"TooltipExample"}
                className={"nc-icon nc-alert-circle-i"}
              />
              <Tooltip
                style={{
                  backgroundColor: "#dddddd",
                }}
                placement="right"
                isOpen={tooltipOpen}
                target="TooltipExample"
                toggle={toggle}
              >
                <img
                  src={targetRep}
                  style={{ width: "500vw", height: "500vh" }}
                  alt="targetLayout"
                />
              </Tooltip>
            </span>
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
                          value={targetLayout[depIndex][distIndex]["value"]}
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

export default TargetLayout;
