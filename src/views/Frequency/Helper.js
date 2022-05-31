import { relativeTimeRounding } from "moment";
import NormalDistribution from "normal-distribution";
import Resistance from "views/Resistance/Resistance";

export function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export const handleNormalDistributionData = (data, rowId, distance, depth) => {
  const lateralDeviation =
    depth *
    Math.tan((data?.impactEnergy?.angularDeviation?.[rowId] * Math.PI) / 180);
  const normDist = new NormalDistribution(0, lateralDeviation);
  const positiveNd = normDist.cdf(distance);
  const negativeNd = normDist.cdf(-distance);
  const normalDistribution = round(positiveNd - negativeNd);
  return normDist.probabilityBetween(distance, -distance);
};

//Step A3: Prob of Falling within the RING
export const probabilityOfFallingWithinRing = (
  data,
  rowId,
  distance,
  dist,
  dep,
  distIndex
) =>
  distIndex === 0
    ? handleNormalDistributionData(data, rowId, dist, dep)
    : handleNormalDistributionData(data, rowId, dist, dep) -
      handleNormalDistributionData(data, rowId, distance[distIndex - 1], dep);

//TABLE-B: Probability of hitting the target within the ring (area/AREA)
export const probabilityOfHittingWithinRing = (
  data,
  distance,
  depIndex,
  distIndex,
  rowId
) =>
  distIndex === 0
    ? (data.targetLayout[depIndex][distIndex].value *
        (parseFloat(data.liftManifest.depth[rowId]) +
          parseFloat(data.globalInformation.odOfPipeline))) /
      (Math.PI * Math.pow(distance[distIndex], 2))
    : (data.targetLayout[depIndex][distIndex].value *
        (parseFloat(data.liftManifest.depth[rowId]) +
          parseFloat(data.globalInformation.odOfPipeline))) /
      (Math.PI *
        (Math.pow(distance[distIndex], 2) -
          Math.pow(distance[distIndex - 1], 2)));

//TABLE-C: Probability Of Hitting The Target
export const ProbabilityOfHittingTheTarget = (
  data,
  distance,
  depIndex,
  distIndex,
  rowId
) => probabilityOfHittingWithinRing(data, distance, depIndex, distIndex, rowId);

export const TerminalEnergy = (data, rowId, dep) =>
  dep <= 50
    ? data.impactEnergy.DepthImpactEnergy[rowId]
    : data.impactEnergy.subseaImpactEnergy[rowId];

//TABLE- D: IMPACT Energy
export const ImpactEnergy = (data, rowId, dep, depIndex, distIndex) =>
  data.impactType[depIndex][distIndex].value === "Fully shielded"
    ? 0
    : data.impactType[depIndex][distIndex].value ===
      "Default - Perpendicular Impact"
    ? TerminalEnergy(data, rowId, dep)
    : "";

//TABLE- E: RESIDUAL Energy available to damage pipeline
export const ResidualEnergy = (data, rowId, dep, depIndex, distIndex) =>
  ImpactEnergy(data, rowId, dep, depIndex, distIndex) -
  data.impactProtection[depIndex][distIndex].value;

export const D1DamageProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const d1Probability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].d1
  );
  if (residualEnergy !== 0) debugger;

  let damageProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          damageProbability =
            residualEnergy > element
              ? d1Probability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          damageProbability =
            residualEnergy < element
              ? d1Probability[resistanceImpactCapacity.length - 1 - index]
              : damageProbability;
        }
      });
  }
  return damageProbability;
};

export const D1DamageFrequency = (data, rowId, dep, depIndex, distIndex) => {
  const frequencyOfDropOverTarget =
    parseFloat(data.liftManifest.liftPerYear[rowId]) *
    parseFloat(data.globalInformation.dropFrequency) *
    parseFloat(data.globalInformation.probabilityOfDropOverWater) *
    parseFloat(data.globalInformation.probabilityOfWindDirection);

  return D1DamageProbability(data, rowId, dep, depIndex, distIndex) !==
    undefined
    ? (
        frequencyOfDropOverTarget *
        D1DamageProbability(data, rowId, dep, depIndex, distIndex)
      ).toExponential(2)
    : "";
};

export const D2DamageProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const d2Probability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].d2
  );
  if (residualEnergy !== 0) debugger;

  let damageProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          damageProbability =
            residualEnergy > element
              ? d2Probability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          damageProbability =
            residualEnergy < element
              ? d2Probability[resistanceImpactCapacity.length - 1 - index]
              : damageProbability;
        }
      });
  }
  return damageProbability;
};

export const D2DamageFrequency = (data, rowId, dep, depIndex, distIndex) => {
  const frequencyOfDropOverTarget =
    parseFloat(data.liftManifest.liftPerYear[rowId]) *
    parseFloat(data.globalInformation.dropFrequency) *
    parseFloat(data.globalInformation.probabilityOfDropOverWater) *
    parseFloat(data.globalInformation.probabilityOfWindDirection);

  return D2DamageProbability(data, rowId, dep, depIndex, distIndex) !==
    undefined
    ? (
        frequencyOfDropOverTarget *
        D2DamageProbability(data, rowId, dep, depIndex, distIndex)
      ).toExponential(2)
    : "";
};

export const D3DamageProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const d3Probability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].d3
  );
  if (residualEnergy !== 0) debugger;

  let damageProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          damageProbability =
            residualEnergy > element
              ? d3Probability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          damageProbability =
            residualEnergy < element
              ? d3Probability[resistanceImpactCapacity.length - 1 - index]
              : damageProbability;
        }
      });
  }
  return damageProbability;
};

export const D3DamageFrequency = (
  data,
  rowId,
  dep,
  dist,
  depIndex,
  distIndex,
  distance
) => {
  const frequencyOfDropOverTarget =
    parseFloat(data.liftManifest.liftPerYear[rowId]) *
    parseFloat(data.globalInformation.dropFrequency) *
    parseFloat(data.globalInformation.probabilityOfDropOverWater) *
    parseFloat(data.globalInformation.probabilityOfWindDirection);

  const probabilityWithTarget =
    probabilityOfFallingWithinRing(
      data,
      rowId,
      distance,
      dist,
      dep,
      distIndex
    ) *
      probabilityOfHittingWithinRing(
        data,
        distance,
        depIndex,
        distIndex,
        rowId
      ) ===
    0
      ? 0
      : probabilityOfFallingWithinRing(
          data,
          rowId,
          distance,
          dist,
          dep,
          distIndex
        ) *
        probabilityOfHittingWithinRing(
          data,
          distance,
          depIndex,
          distIndex,
          rowId
        );

  return D3DamageProbability(data, rowId, dep, depIndex, distIndex) !==
    undefined
    ? (
        frequencyOfDropOverTarget *
        D3DamageProbability(data, rowId, dep, depIndex, distIndex) *
        probabilityWithTarget
      ).toExponential(2)
    : "";
};

export const R0ReleaseProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const r0Probability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].r0
  );
  if (residualEnergy !== 0) debugger;

  let releaseProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          releaseProbability =
            residualEnergy > element
              ? r0Probability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          releaseProbability =
            residualEnergy < element
              ? r0Probability[resistanceImpactCapacity.length - 1 - index]
              : releaseProbability;
        }
      });
  }
  return releaseProbability;
};

export const R0ReleaseFrequency = (
  data,
  rowId,
  distance,
  dep,
  dist,
  depIndex,
  distIndex
) => {
  return D3DamageFrequency(
    data,
    rowId,
    dep,
    dist,
    depIndex,
    distIndex,
    distance
  ) !== undefined ||
    D3DamageFrequency(data, rowId, dep, dist, depIndex, distIndex, distance) !==
      ""
    ? R0ReleaseProbability(data, rowId, dep, depIndex, distIndex) *
        D3DamageFrequency(data, rowId, dep, dist, depIndex, distIndex, distance)
    : "";
};

export const R1ReleaseProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const r1Probability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].r1
  );
  if (residualEnergy !== 0) debugger;

  let releaseProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          releaseProbability =
            residualEnergy > element
              ? r1Probability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          releaseProbability =
            residualEnergy < element
              ? r1Probability[resistanceImpactCapacity.length - 1 - index]
              : releaseProbability;
        }
      });
  }
  return releaseProbability;
};

export const R1ReleaseFrequency = (
  data,
  rowId,
  distance,
  dep,
  dist,
  depIndex,
  distIndex
) => {
  return D3DamageFrequency(
    data,
    rowId,
    dep,
    dist,
    depIndex,
    distIndex,
    distance
  ) !== undefined
    ? R1ReleaseProbability(data, rowId, dep, depIndex, distIndex) *
        D3DamageFrequency(data, rowId, dep, dist, depIndex, distIndex, distance)
    : "";
};

export const R2ReleaseProbability = (data, rowId, dep, depIndex, distIndex) => {
  const residualEnergy = ResidualEnergy(data, rowId, dep, depIndex, distIndex);

  const resistanceImpactCapacity = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].impactCapacity[1]
  );

  const rProbability = data.damageDescription.map(
    (item, index) =>
      Resistance(data, data.globalInformation.typeOfPipeline)[
        data.damageDescription[index].key
      ].r2
  );
  if (residualEnergy !== 0) debugger;

  let releaseProbability = 0;
  if (residualEnergy === 0) return;
  else {
    resistanceImpactCapacity
      .slice(0)
      .reverse()
      .forEach((element, index) => {
        if (index === 0) {
          releaseProbability =
            residualEnergy > element
              ? rProbability[resistanceImpactCapacity.length - 1 - index]
              : "Error";
        } else {
          releaseProbability =
            residualEnergy < element
              ? rProbability[resistanceImpactCapacity.length - 1 - index]
              : releaseProbability;
        }
      });
  }
  return releaseProbability;
};

export const R2ReleaseFrequency = (
  data,
  rowId,
  distance,
  dep,
  dist,
  depIndex,
  distIndex
) => {
  return D3DamageFrequency(
    data,
    rowId,
    dep,
    dist,
    depIndex,
    distIndex,
    distance
  ) !== undefined ||
    D3DamageFrequency(data, rowId, dep, dist, depIndex, distIndex, distance) !==
      ""
    ? R2ReleaseProbability(data, rowId, dep, depIndex, distIndex) *
        D3DamageFrequency(data, rowId, dep, dist, depIndex, distIndex, distance)
    : "";
};
