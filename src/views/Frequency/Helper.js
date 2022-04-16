import NormalDistribution from "normal-distribution";

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
