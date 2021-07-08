import parseClip from "components/PasteToTable/parseClip";
import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

const ValidateInputData = (data, numberOfItem) => {
  const item = data;
  [...Array(parseInt(numberOfItem)).keys()].map((_, index) =>
    Object.keys(data).forEach((col) => {
      if (data[col][index] === undefined) {
        item[col][index] = "";
      }
    })
  );
  return item;
};

function LiftManifest(props) {
  const [liftManifest, setLiftManifest] = useState(() =>
    ValidateInputData(props.data, props.numberOfItem)
  );
  var regexWithDecimal = /^-?\d+\.?\d*$/;

  const handleChange = ({ target: { value } }) => {
    console.log(parseClip(value));
    // setState({
    //   rawStr: value,
    //   data: parseClip(value),
    // });
  };

  const handleData = (event, index) => {
    if (
      regexWithDecimal.test(event.target.value) ||
      event.target.value === "" ||
      event.target.name === "description"
    ) {
      const items = { ...liftManifest };
      items[event.target.name][index] = event.target.value;
      setLiftManifest(items);
      props.handleData(items);
    }
  };
  return (
    <>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Lift Manifest</CardTitle>
          <p className="card-category">Enter Manifest Items</p>
          <textarea
            placeholder="Paste your excel form data here..."
            // onPaste={this.handlePaste}
            onChange={handleChange}
            // value={state.rawStr}
          />
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
                {[...Array(parseInt(props.numberOfItem)).keys()].map(
                  (page, i) => (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <input
                          value={props.data["liftPerYear"][i]}
                          name="liftPerYear"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                      <td>
                        <input
                          value={liftManifest.description[i]}
                          name="description"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                      <td>
                        <input
                          value={liftManifest["mass"][i]}
                          name="mass"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                      <td>
                        <input
                          value={liftManifest["length"][i]}
                          name="length"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                      <td>
                        <input
                          value={liftManifest["depth"][i]}
                          name="depth"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                      <td>
                        <input
                          value={liftManifest["height"][i]}
                          name="height"
                          onChange={(e) => handleData(e, i)}
                        ></input>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default LiftManifest;
