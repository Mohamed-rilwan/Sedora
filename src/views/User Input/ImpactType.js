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

function ImpactType(props) {
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
          <CardTitle tag="h5">Impact Type</CardTitle>
          <p className="card-category">Enter Impact Type at each depth</p>
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
                        <Input
                          type="select"
                          name="TypeOfPipeline"
                          id="typesOfPipe"
                          onChange={handleData}
                        >
                          <option></option>
                          <option>Fully shielded</option>
                          <option> Perpendicular Impact</option>
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
