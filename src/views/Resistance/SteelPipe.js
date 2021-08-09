import { GlobalContext } from "components/context/GlobalContext";
import React, { useContext, useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import Resistance from "./Resistance";

const steelDamageDescription = [
  { key: "minorDamage", name: "Minor Damage" },
  {
    key: "majorDamageLeakageAnticipated",
    name: "Major Damage- Leakage Anticipated",
  },
  {
    key: "majorDamageLeakageAnticipated1",
    name: "Major Damage- Leakage & Rupture Anticipated",
  },
  {
    key: "majorDamageLeakageAnticipated2",
    name: "Major Damage- Leakage & Rupture Anticipated",
  },
  { key: "rupture", name: "Rupture" },
];
const flexibleDamageDescription = [
  "Minor Damage – no ingress of seawater",
  "Damage needing repair – possible leakage",
  "Damage needing repair – leakage or rupture",
  "Rupture",
];
const umbilicalDamageDescription = [
  "Minor Damage – no ingress of seawater",
  "Damage needing repair – possible loss of function",
  "Damage needing repair – possible loss of function",
  "loss of function",
];
const pipDamageDescription = [
  "Minor Damage",
  "Major Damage- Leakage Anticipated",
  "Major Damage- Leakage & Rupture Anticipated",
  "Major Damage- Leakage & Rupture Anticipated",
  "Rupture",
];

function SteelPipe(props) {
  const { data, setData } = useContext(GlobalContext);
  console.log(Resistance(data, "Steel Pipeline / Riser"));

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
                <th>Steel Pipeline Capacities</th>
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
              {[...Array(parseInt(steelDamageDescription.length)).keys()].map(
                (_, i) => (
                  <tr>
                    <th scope="row">{steelDamageDescription[i].name}</th>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].dentDiameter.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].impactCapacity.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].d1.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].d2.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].d3.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].r0.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].r1.toString()}
                      </label>
                    </td>
                    <td>
                      <label>
                        {Resistance(data, "Steel Pipeline / Riser")[
                          steelDamageDescription[i].key
                        ].r2.toString()}
                      </label>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
}

export default SteelPipe;
