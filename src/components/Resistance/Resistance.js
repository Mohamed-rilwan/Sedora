export default function Resistance(globalData, materialType) {
  const capacities = [];
  if (materialType.toLowerCase() === "steel") {
    capacities["minorDamage"] = {
      dentDiameter: [0, 5],
      impactCapacity: [0, energyRequiredSteel(globalData, 5)],
      d1: 1.0,
      d2: 0.0,
      d3: 0.0,
      r0: 1,
      r1: 0,
      r2: 0,
    };
    capacities["majorDamageLeakageAnticipated"] = {
      dentDiameter: [5, 10],
      impactCapacity: [
        energyRequiredSteel(globalData, 5),
        energyRequiredSteel(globalData, 10),
      ],
      d1: 0.1,
      d2: 0.8,
      d3: 0.1,
      r0: 0.9,
      r1: 0.1,
      r2: 0,
    };
    capacities["majorDamageLeakageAnticipated1"] = {
      dentDiameter: [10, 15],
      impactCapacity: [
        energyRequiredSteel(globalData, 10),
        energyRequiredSteel(globalData, 15),
      ],
      d1: 0.0,
      d2: 0.75,
      d3: 0.25,
      r0: 0.75,
      r1: 0.2,
      r2: 0.05,
    };
    capacities["majorDamageLeakageAnticipated2"] = {
      dentDiameter: [15, 20],
      impactCapacity: [
        energyRequiredSteel(globalData, 15),
        energyRequiredSteel(globalData, 20),
      ],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.25,
      r1: 0.5,
      r2: 0.25,
    };
    capacities["rupture"] = {
      dentDiameter: [, ">>20"],
      impactCapacity: [, energyRequiredSteel(globalData, 20)],
      d1: 0.0,
      d2: 0.1,
      d3: 0.9,
      r0: 0.1,
      r1: 0.2,
      r2: 0.7,
    };
    return capacities;
  }

  if (materialType.toLowerCase() === "flexible") {
    capacities["minorDamage"] = {
      base: [, 2.5],
      impactCapacity: [0.0, energyRequiredFlexile(globalData, 2.5)],
      d1: 1.0,
      d2: 0.0,
      d3: 0.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepairPossibleLeakage"] = {
      base: [2.5, 10.0],
      impactCapacity: [
        energyRequiredFlexile(globalData, 2.5),
        energyRequiredFlexile(globalData, 10.0),
      ],
      d1: 0.0,
      d2: 0.5,
      d3: 0.5,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepairRupture"] = {
      base: [10.0, 20.0],
      impactCapacity: [
        energyRequiredFlexile(globalData, 10.0),
        energyRequiredFlexile(globalData, 20.0),
      ],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["rupture"] = {
      base: [, 20.0],
      impactCapacity: [0.0, energyRequiredFlexile(globalData, 20.0)],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    return capacities;
  }

  if (materialType.toLowerCase() === "umbilical") {
    capacities["minorDamage"] = {
      impactCapacity: [0, 2.5],
      d1: 1.0,
      d2: 0.0,
      d3: 0.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepair1"] = {
      impactCapacity: [2.5, 5.0],
      d1: 0.0,
      d2: 0.5,
      d3: 0.5,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepair2"] = {
      impactCapacity: [5.0, 10.0],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["lossOfFunction2"] = {
      impactCapacity: [, 10],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["lossOfFunction2"] = {
      impactCapacity: [, ">10"],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    return capacities;
  }
}

const energyRequiredSteel = (globalData, dentPercentage) => {
  return (
    (16 *
      Math.sqrt((2 * Math.PI) / 9) *
      (0.25 * globalData?.yieldStress * Math.pow(globalData.wallThickness, 2)) *
      Math.sqrt(globalData.odOfPipeline / globalData.wallThickness) *
      Math.pow(dentPercentage, 3 / 2)) /
    1000
  );
};

const energyRequiredFlexile = (globalData, base) => {
  return globalData.pipelineSize < 8
    ? 0.75 * base
    : globalData.pipelineSize > 10
    ? 1.25 * base
    : base;
};
