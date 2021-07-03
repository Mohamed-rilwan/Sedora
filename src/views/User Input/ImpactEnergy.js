import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

function ImpactEnergy(props) {
  const [liftManifest, setLiftManifest] = useState(props.data?.liftManifest);
  const [impactEnergy, setImpactEnergy] = useState(props.data);

  const handleImpactCalculation = (col, index) => {
    if (col === "DNVGL Shape Description") {
      return liftManifest.length[index] > 3 * liftManifest.depth[index]
        ? "Flat Long shaped"
        : "Box/round shaped";
    }
    if (col === "Weight Category") {
      return liftManifest.mass[index] < 2
        ? "<2"
        : liftManifest.mass[index] < 8
        ? "2-8"
        : liftManifest.mass[index] < 10
        ? ">8"
        : ">>8";
    }
    if (col === "Angular Deviation Category Number") {
      //return liftManifest.mass[index]< 2? "<2" : liftManifest.mass[index]< 8 ? "2-8" :liftManifest.mass[index]< 10 ? ">8" : ">>8"
    }
    if (col === "Angular Deviation (Deg)") {
      // return liftManifest.mass[index]< 2? "<2" : liftManifest.mass[index]< 8 ? "2-8" :liftManifest.mass[index]< 10 ? ">8" : ">>8"
    }
    if (col === "Volume  of Object (m3)") {
      return (
        liftManifest.length[index] *
        liftManifest.depth[index] *
        liftManifest.height[index]
      );
    }
    if (col === "Projected Area (m2)") {
      // return (
      //   liftManifest.length[index] *
      //   liftManifest.depth[index] *
      //   liftManifest.height[index]
      // );
    }
    if (col === "Volume of Water Displaced (m3)") {
      return (liftManifest.mass[index] * 1000) / 7810;
    }
    if (col === "Ca") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === "Cd") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === "Added Mass (Ma) (Te)") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === "Subsea Terminal Velocity (m/s)") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === "Subsea Impact Energy (KJ)") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === " 30m drop in air velocity (m/s)") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
    if (col === "< 50m depth Impact Energy (KJ)") {
      // return (
      //   liftManifest.mass[index] * 1000/7810
      // );
    }
  };

  return (
    <>
      <Card style={{ overflowX: "auto" }}>
        <CardHeader>
          <CardTitle tag="h5">Impact Energy</CardTitle>
        </CardHeader>
        <CardBody>
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

                <th>DNVGL Shape Description</th>
                <th>Weight Category</th>
                <th>Angular Deviation Category Number</th>
                <th>Angular Deviation (Deg)</th>
                <th>Volume of Object (m3)</th>

                <th>Projected Area (m2)</th>
                <th>Volume of Water Displaced (m3)</th>
                <th>Ca</th>
                <th>Cd</th>
                <th>Added Mass (Ma) (Te)</th>
                <th>Subsea Terminal Velocity (m/s)</th>
                <th>Subsea Impact Energy (KJ)</th>
                <th>30m drop in air velocity (m/s)</th>
                <th>{`< 50m depth Impact Energy (KJ)`}</th>

                <br />
              </tr>
            </thead>
            <tbody>
              {[...Array(props.numberOfItem)].map((page, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <label>{liftManifest.liftPerYear[i]}</label>
                  </td>
                  <td>
                    <label>{liftManifest.description[i]}</label>
                  </td>
                  <td>
                    <label>{liftManifest.mass[i]}</label>
                  </td>
                  <td>
                    <label>{liftManifest.length[i]}</label>
                  </td>
                  <td>
                    <label>{liftManifest.depth[i]}</label>
                  </td>
                  <td>
                    <label>{liftManifest.height[i]}</label>
                  </td>

                  <td>
                    <label>
                      {handleImpactCalculation("DNVGL Shape Description", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Weight Category", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation(
                        "Angular Deviation Category Number",
                        i
                      )}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Angular Deviation (Deg)", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Volume  of Object (m3)", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Volume  of Object (m3)", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation(
                        "Volume of Water Displaced (m3)",
                        i
                      )}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Weight Category", i)}
                    </label>
                  </td>

                  <td>
                    <label>{handleImpactCalculation("Ca", i)}</label>
                  </td>
                  <td>
                    <label>{handleImpactCalculation("Cd", i)}</label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Added Mass (Ma) (Te)", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation(
                        "Subsea Terminal Velocity (m/s)",
                        i
                      )}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation("Subsea Impact Energy (KJ)", i)}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation(
                        "30m drop in air velocity (m/s)",
                        i
                      )}
                    </label>
                  </td>
                  <td>
                    <label>
                      {handleImpactCalculation(
                        "< 50m depth Impact Energy (KJ)",
                        i
                      )}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default ImpactEnergy;
