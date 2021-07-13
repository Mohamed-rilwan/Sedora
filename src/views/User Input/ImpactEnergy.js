import React, { useState } from "react";
// reactstrap components
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

const impactEnergyAddOns = {
  dnslShapeDescription: [],
  weightCategory: [],
  angularDeviationCategoryNumber: [],
  angularDeviation: [],
  volumeOfObject: [],
  projectedArea: [],
  volumeOfWaterDisplaced: [],
  ca: [],
  cd: [],
  addedMass: [],
  subseaTerminalVelocity: [],
  subseaImpactEnergy: [],
  DropInAirVelocity: [],
  DepthImpactEnergy: [],
};
function ImpactEnergy(props) {
  const { data } = props;
  const [impactEnergy, setImpactEnergy] = useState({
    ...props.data?.liftManifest,
    ...impactEnergyAddOns,
  });

  useState(() => {
    const item = { ...props.data?.liftManifest, ...impactEnergyAddOns };
    [
      ...Array(parseInt(data?.globalInformation.numberOfLiftManifest)).keys(),
    ].map((_, index) =>
      Object.keys({
        ...props.data?.liftManifest,
        ...impactEnergyAddOns,
      }).forEach((col) => {
        if (col === "dnslShapeDescription") {
          item[col][index] =
            impactEnergy.length[index] > 3 * impactEnergy.depth[index]
              ? "Flat Long shaped"
              : "Box/round shaped";
        }
        if (col === "weightCategory") {
          item[col][index] =
            item.mass[index] < 2
              ? "<2"
              : item.mass[index] < 8
              ? "2-8"
              : item.mass[index] < 10
              ? ">8"
              : ">>8";
        }

        if (col === "angularDeviationCategoryNumber") {
          item[col][index] =
            item.dnslShapeDescription[index] === "Flat Long shaped" &&
            item.weightCategory[index] === "<2"
              ? "1"
              : item.dnslShapeDescription[index] === "Flat Long shaped" &&
                item.weightCategory[index] === "2-8"
              ? "2"
              : item.dnslShapeDescription[index] === "Flat Long shaped" &&
                item.weightCategory[index] === ">8"
              ? "3"
              : item.dnslShapeDescription[index] === "Flat Long shaped" &&
                item.weightCategory[index] === ">>8"
              ? "3"
              : item.dnslShapeDescription[index] === "Box/round shaped" &&
                item.weightCategory[index] === "<2"
              ? "4"
              : item.dnslShapeDescription[index] === "Box/round shaped" &&
                item.weightCategory[index] === "2-8"
              ? "5"
              : item.dnslShapeDescription[index] === "Box/round shaped" &&
                item.weightCategory[index] === ">8"
              ? "6"
              : item.dnslShapeDescription[index] === "Box/round shaped" &&
                item.weightCategory[index] === ">>8"
              ? "7"
              : "8";
        }
        if (col === "angularDeviation") {
          item[col][index] =
            item["angularDeviationCategoryNumber"][index] === "1"
              ? "15"
              : item["angularDeviationCategoryNumber"][index] === "2"
              ? "9"
              : item["angularDeviationCategoryNumber"][index] === "3"
              ? "5"
              : item["angularDeviationCategoryNumber"][index] === "4"
              ? "10"
              : item["angularDeviationCategoryNumber"][index] === "5"
              ? "5"
              : item["angularDeviationCategoryNumber"][index] === "6"
              ? "3"
              : item["angularDeviationCategoryNumber"][index] === "7"
              ? "2"
              : "check";
        }
        if (col === "volumeOfObject") {
          item[col][index] =
            item["length"][index] *
            item["depth"][index] *
            item["height"][index];
        }
        if (col === "projectedArea") {
          item[col][index] =
            item["angularDeviationCategoryNumber"][index] <= 3
              ? parseFloat(
                  item["length"][index] *
                    item.depth[index] *
                    Math.sin((45 * Math.PI) / 180)
                ).toFixed(4)
              : parseFloat((item.depth[index] * item.height[index]).toFixed(4));
        }
        if (col === "volumeOfWaterDisplaced") {
          item[col][index] = parseFloat(
            ((item.mass[index] * 1000) / 7810).toFixed(4)
          );
        }
        if (col === "ca") {
          item[col][index] =
            parseInt(item.angularDeviationCategoryNumber) < 4 &&
            parseInt(item.angularDeviationCategoryNumber) > 0 &&
            data.globalInformation.massCoefficient === "Lower End Value"
              ? "0.1"
              : parseInt(item.angularDeviationCategoryNumber) < 3 &&
                data.globalInformation.massCoefficient === "Medium Value"
              ? "0.55"
              : parseInt(item.angularDeviationCategoryNumber) < 3 &&
                data.globalInformation.massCoefficient === "Upper End Value"
              ? "1"
              : parseInt(item.angularDeviationCategoryNumber) > 3 &&
                parseInt(item.angularDeviationCategoryNumber) < 8 &&
                data.globalInformation.massCoefficient === "Lower End Value"
              ? "0.6"
              : parseInt(item.angularDeviationCategoryNumber) > 3 &&
                parseInt(item.angularDeviationCategoryNumber) < 8 &&
                data.globalInformation.massCoefficient === "Medium Value"
              ? "1.05"
              : parseInt(item.angularDeviationCategoryNumber) > 3 &&
                parseInt(item.angularDeviationCategoryNumber) < 8 &&
                data.globalInformation.massCoefficient === "Upper End Value"
              ? "1.5"
              : parseInt(item.angularDeviationCategoryNumber) === 8 &&
                data.globalInformation.massCoefficient === "Lower End Value"
              ? "1"
              : parseInt(item.angularDeviationCategoryNumber) === 8 &&
                data.globalInformation.massCoefficient === "Medium Value"
              ? "1.5"
              : parseInt(item.angularDeviationCategoryNumber) === 8 &&
                data.globalInformation.massCoefficient === "Upper End Value"
              ? "2"
              : "ERROR";
        }

        if (col === "cd") {
          item[col][index] =
            parseInt(item.angularDeviationCategoryNumber[index]) < 4 &&
            data.globalInformation.dragCoefficient === "Lower End Value"
              ? "0.7"
              : parseInt(item.angularDeviationCategoryNumber[index]) < 3 &&
                data.globalInformation.dragCoefficient === "Medium Value"
              ? "1.1"
              : parseInt(item.angularDeviationCategoryNumber[index]) < 3 &&
                data.globalInformation.dragCoefficient === "Upper End Value"
              ? "1.5"
              : parseInt(item.angularDeviationCategoryNumber[index]) > 3 &&
                parseInt(item.angularDeviationCategoryNumber[index]) < 8 &&
                data.globalInformation.dragCoefficient === "Lower End Value"
              ? "1.2"
              : parseInt(item.angularDeviationCategoryNumber[index]) > 3 &&
                parseInt(item.angularDeviationCategoryNumber[index]) < 8 &&
                data.globalInformation.dragCoefficient === "Medium Value"
              ? "1.25"
              : parseInt(item.angularDeviationCategoryNumber[index]) > 3 &&
                parseInt(item.angularDeviationCategoryNumber[index]) < 8 &&
                data.globalInformation.dragCoefficient === "Upper End Value"
              ? "1.3"
              : parseInt(item.angularDeviationCategoryNumber[index]) === 8 &&
                data.globalInformation.dragCoefficient === "Lower End Value"
              ? "0.6"
              : parseInt(item.angularDeviationCategoryNumber[index]) === 8 &&
                data.globalInformation.dragCoefficient === "Medium Value"
              ? "1.3"
              : parseInt(item.angularDeviationCategoryNumber[index]) === 8 &&
                data.globalInformation.dragCoefficient === "Upper End Value"
              ? "2"
              : "ERROR";
        }
        if (col === "addedMass") {
          item[col][index] = parseFloat(
            (item.volumeOfWaterDisplaced[index] *
              item.ca[index] *
              parseFloat(data.globalInformation["densityOfWater"])) /
              1000
          ).toFixed(4);
        }
        if (col === "subseaTerminalVelocity") {
          item[col][index] = parseFloat(
            Math.sqrt(
              (2 *
                (item.mass[index] * 1000 -
                  item.volumeOfWaterDisplaced[index] *
                    parseFloat(data.globalInformation.densityOfWater)) *
                9.81) /
                (parseFloat(data.globalInformation.densityOfWater) *
                  item.cd[index] *
                  item.projectedArea)
            ).toFixed(4)
          );
        }
        if (col === "subseaImpactEnergy") {
          item[col][index] = parseFloat(
            (
              0.5 *
              (parseFloat(item.addedMass[index]) +
                parseFloat(item.mass[index])) *
              Math.pow(item.subseaTerminalVelocity[index], 2)
            ).toFixed(4)
          );
        }
        if (col === "DropInAirVelocity") {
          item[col][index] = parseFloat(Math.sqrt(2 * 9.81 * 30).toFixed(4));
        }
        if (col === "DepthImpactEnergy") {
          item[col][index] = parseFloat(
            (
              0.5 *
              item.mass[index] *
              Math.pow(item.DropInAirVelocity[index], 2)
            ).toFixed(4)
          );
        }
        setImpactEnergy(item);
        props.handleData(item, "impactEnergy");
      })
    );
  });

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
              {[
                ...Array(
                  parseInt(data?.globalInformation.numberOfLiftManifest)
                ).keys(),
              ].map((_, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <label>{impactEnergy.liftPerYear[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.description[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.mass[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.length[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.depth[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.height[i]}</label>
                  </td>

                  <td>
                    <label>{impactEnergy.dnslShapeDescription[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.weightCategory[i]}</label>
                  </td>
                  <td>
                    <label>
                      {impactEnergy.angularDeviationCategoryNumber[i]}
                    </label>
                  </td>
                  <td>
                    <label>{impactEnergy.angularDeviation[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.volumeOfObject[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.projectedArea[i]}</label>
                  </td>

                  <td>
                    <label>{impactEnergy.volumeOfWaterDisplaced[i]}</label>
                  </td>

                  <td>
                    <label>{impactEnergy.ca[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.cd[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.addedMass[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.subseaTerminalVelocity[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.subseaImpactEnergy[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.DropInAirVelocity[i]}</label>
                  </td>
                  <td>
                    <label>{impactEnergy.DepthImpactEnergy[i]}</label>
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
