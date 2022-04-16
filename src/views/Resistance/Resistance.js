export default function Resistance(globalData, typeOfPipeline) {
  const capacities = [];
  if (typeOfPipeline === "Steel Pipeline / Riser") {
    capacities["minorDamage"] = {
      dentDiameter: [0, 5],
      impactCapacity: [0, energyRequiredSteel(globalData.globalInformation, 5)],
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
        energyRequiredSteel(globalData.globalInformation, 5),
        energyRequiredSteel(globalData.globalInformation, 10),
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
        energyRequiredSteel(globalData.globalInformation, 10),
        energyRequiredSteel(globalData.globalInformation, 15),
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
        energyRequiredSteel(globalData.globalInformation, 15),
        energyRequiredSteel(globalData.globalInformation, 20),
      ],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.25,
      r1: 0.5,
      r2: 0.25,
    };
    capacities["rupture"] = {
      dentDiameter: ["", ">>20"],
      impactCapacity: [
        "",
        energyRequiredSteel(globalData.globalInformation, 20),
      ],
      d1: 0.0,
      d2: 0.1,
      d3: 0.9,
      r0: 0.1,
      r1: 0.2,
      r2: 0.7,
    };
    return capacities;
  }
  if (typeOfPipeline === "Flexible Pipeline / Riser") {
    capacities["minorDamage"] = {
      dentDiameter: ["", 2.5],
      impactCapacity: [
        0.0,
        energyRequiredFlexile(globalData.globalInformation, 2.5),
      ],
      d1: 1.0,
      d2: 0.0,
      d3: 0.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepairPossibleLeakage"] = {
      dentDiameter: [2.5, 10.0],
      impactCapacity: [
        energyRequiredFlexile(globalData.globalInformation, 2.5),
        energyRequiredFlexile(globalData.globalInformation, 10.0),
      ],
      d1: 0.0,
      d2: 0.5,
      d3: 0.5,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["damageNeedingRepairRupture"] = {
      dentDiameter: [10.0, 20.0],
      impactCapacity: [
        energyRequiredFlexile(globalData.globalInformation, 10.0),
        energyRequiredFlexile(globalData.globalInformation, 20.0),
      ],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["rupture"] = {
      dentDiameter: ["", 20.0],
      impactCapacity: [
        0.0,
        energyRequiredFlexile(globalData.globalInformation, 20.0),
      ],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    return capacities;
  }

  if (typeOfPipeline === "Umbilical") {
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
      impactCapacity: ["", 10],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    capacities["lossOfFunction2"] = {
      impactCapacity: ["", ">10"],
      d1: 0.0,
      d2: 0.0,
      d3: 1.0,
      r0: 0.0,
      r1: 0.0,
      r2: 0.0,
    };
    return capacities;
  }
  if (typeOfPipeline === "Steel Pipe-in-Pipe / Riser") {
    capacities["minorDamage"] = {
      dentDiameter: [0, 5],
      impactCapacity: [0, energyRequiredPip(globalData.globalInformation, 5)],
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
        energyRequiredPip(globalData.globalInformation, 5),
        energyRequiredPip(globalData.globalInformation, 10),
      ],
      d1: 0.1,
      d2: 0.8,
      d3: 0.1,
      r0: 0.9,
      r1: 0.1,
      r2: 0,
    };
    capacities["majorDamageLeakageAndRupture1"] = {
      dentDiameter: [10, 15],
      impactCapacity: [
        energyRequiredPip(globalData.globalInformation, 10),
        energyRequiredPip(globalData.globalInformation, 15),
      ],
      d1: 0.0,
      d2: 0.75,
      d3: 0.25,
      r0: 0.75,
      r1: 0.2,
      r2: 0.05,
    };
    capacities["majorDamageLeakageAndRupture2"] = {
      dentDiameter: [15, 20],
      impactCapacity: [
        energyRequiredPip(globalData.globalInformation, 15),
        energyRequiredPip(globalData.globalInformation, 20),
      ],
      d1: 0.0,
      d2: 0.25,
      d3: 0.75,
      r0: 0.25,
      r1: 0.5,
      r2: 0.25,
    };
    capacities["rupture"] = {
      dentDiameter: ["", ">>20"],
      impactCapacity: ["", energyRequiredPip(globalData.globalInformation, 20)],
      d1: 0.0,
      d2: 0.1,
      d3: 0.9,
      r0: 0.1,
      r1: 0.2,
      r2: 0.7,
    };
    return capacities;
  }
}

const energyRequiredSteel = (globalData, dentPercentage) => {
  return (
    Math.round(
      ((16 *
        Math.sqrt((2 * 3.14) / 9) *
        (0.25 *
          parseFloat(globalData.yieldStress) *
          Math.pow(parseFloat(globalData.wallThickness), 2)) *
        Math.sqrt(
          parseFloat(globalData.odOfPipeline) /
            parseFloat(globalData.wallThickness)
        ) *
        parseFloat(globalData.odOfPipeline) *
        Math.pow(dentPercentage / 100, 1.5)) /
        1000) *
        100
    ) / 100
  );
};

const energyRequiredFlexile = (globalData, base) => {
  return globalData.pipelineSize < 8
    ? 0.75 * base
    : globalData.pipelineSize > 10
    ? 1.25 * base
    : base;
};

const energyRequiredPip = (globalData, dentPercentage) => {
  const innerDent = (globalData.odOfInnerPipeline * dentPercentage) / 100;
  const a =
    (16 *
      Math.sqrt((2 * Math.PI) / 9) *
      (0.25 *
        parseFloat(globalData.yieldStressOfInnerPipe) *
        Math.pow(parseFloat(globalData.wallThicknessOfInnerPipe), 2)) *
      Math.sqrt(
        parseFloat(globalData.odOfInnerPipeline) /
          parseFloat(globalData.wallThicknessOfInnerPipe)
      ) *
      parseFloat(globalData.odOfInnerPipeline) *
      Math.pow(dentPercentage / 100, 1.5)) /
    1000;

  const innerEnergy =
    (16 *
      Math.sqrt((2 * Math.PI) / 9) *
      (0.25 *
        parseFloat(globalData.yieldStressOfInnerPipe) *
        Math.pow(parseFloat(globalData.wallThicknessOfInnerPipe), 2)) *
      Math.sqrt(
        parseFloat(globalData.odOfInnerPipeline) /
          parseFloat(globalData.wallThicknessOfInnerPipe)
      ) *
      parseFloat(globalData.odOfInnerPipeline) *
      Math.pow(dentPercentage / 100, 1.5)) /
    1000;

  const outerDent = Math.floor(
    (((globalData.odOfPipeline - globalData.odOfInnerPipeline) / 2 +
      innerDent) /
      globalData.odOfPipeline) *
      100
  );

  const outerEnergy =
    (16 *
      Math.sqrt((2 * Math.PI) / 9) *
      (0.25 *
        parseFloat(globalData.yieldStress) *
        Math.pow(parseFloat(globalData.wallThickness), 2)) *
      Math.sqrt(
        parseFloat(globalData.odOfPipeline) /
          parseFloat(globalData.wallThickness)
      ) *
      parseFloat(globalData.odOfPipeline) *
      Math.pow(outerDent / 100, 1.5)) /
    1000;
  return Math.round((innerEnergy + outerEnergy) * 100) / 100;
};
