import { GlobalContext } from "components/context/GlobalContext";
import React, { useContext, useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";
import Resistance from "./Resistance";

const UmbilicalDamageDescription = [
  { key: "minorDamage", name: "Minor Damage – no ingress of seawater" },
  {
    key: "damageNeedingRepair1",
    name: "Damage needing repair – possible loss of function",
  },
  {
    key: "damageNeedingRepair2",
    name: "Damage needing repair – possible loss of function",
  },

  { key: "lossOfFunction2", name: "loss of function" },
];

function UmbilicalPipe(props) {
  const { data, setData } = useContext(GlobalContext);
  console.log(Resistance(data, "Umbilical"));

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
                <th>Umbilical Pipeline Capacities</th>
              </tr>
              <tr>
                <th>Damage Description</th>
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
                ...Array(parseInt(UmbilicalDamageDescription.length)).keys(),
              ].map((_, i) => (
                <tr>
                  <th scope="row">{UmbilicalDamageDescription[i].name}</th>

                  <td>
                    <label>
                      <tr>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Umbilical")[
                              UmbilicalDamageDescription[i].key
                            ].impactCapacity[0]
                          }
                        </td>
                        <td style={{ borderTop: "0" }}>
                          {
                            Resistance(data, "Umbilical")[
                              UmbilicalDamageDescription[i].key
                            ].impactCapacity[1]
                          }
                        </td>
                      </tr>
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
                      ].d1.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
                      ].d2.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
                      ].d3.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
                      ].r0.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
                      ].r1.toString()}
                    </label>
                  </td>
                  <td>
                    <label>
                      {Resistance(data, "Umbilical")[
                        UmbilicalDamageDescription[i].key
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

export default UmbilicalPipe;
