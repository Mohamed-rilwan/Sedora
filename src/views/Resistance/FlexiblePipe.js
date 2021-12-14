import { GlobalContext } from "components/context/GlobalContext";
import React, { useContext, useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import Resistance from "./Resistance";

const flexibleDamageDescription = [
  { key: "minorDamage", name: "Minor Damage – no ingress of seawater" },
  {
    key: "damageNeedingRepairPossibleLeakage",
    name: "Damage needing repair – possible leakage",
  },
  {
    key: "damageNeedingRepairRupture",
    name: "Damage needing repair – leakage or rupture",
  },

  { key: "rupture", name: "Rupture" },
];

function FlexiblePipe(props) {
  const { data, setData } = useContext(GlobalContext);
  console.log(Resistance(data, "Flexible Pipeline / Riser"));

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
                <th>Flexible Pipeline Capacities</th>
              </tr>
              <tr>
                <th>Damage Description</th>
                <th>Dent/Diameter</th>
                <th>Impact Capacity (kJ)</th>
                <th>"D1" Prob</th>
                <th>"D2" Prob</th>
                <th>"D3" Prob</th>
                <th>"R0" Prob</th>
                <th>"R1" Prob</th>
                <th>"R2" Prob</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...Array(parseInt(flexibleDamageDescription.length)).keys(),
              ].map((_, i) => (
                <tr>
                  <th scope="row">{flexibleDamageDescription[i].name}</th>
                  <td>
                    <label>
                      <tr>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Flexible Pipeline / Riser")[
                              flexibleDamageDescription[i].key
                            ].dentDiameter[0]
                          }
                        </td>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Flexible Pipeline / Riser")[
                              flexibleDamageDescription[i].key
                            ].dentDiameter[1]
                          }
                        </td>
                      </tr>
                    </label>
                  </td>
                  <td>
                    <label>
                      <tr>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Flexible Pipeline / Riser")[
                              flexibleDamageDescription[i].key
                            ].impactCapacity[0]
                          }
                        </td>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Flexible Pipeline / Riser")[
                              flexibleDamageDescription[i].key
                            ].impactCapacity[1]
                          }
                        </td>
                      </tr>
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].d1.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].d2.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].d3.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].r0.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].r1.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Flexible Pipeline / Riser")[
                        flexibleDamageDescription[i].key
                      ].r2.toString()}
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

export default FlexiblePipe;
