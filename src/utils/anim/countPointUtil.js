// 已知三角形的两点坐标,和三个边长,求第三点的坐标
export const calculateTriangleThirdPoint = (vA = {}, vB = {}, a, b, c) => {
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  if (cosA > 1.0 || cosA < -1.0) {
    return { x: 0, y: 0 };
  }
  const angleA = Math.acos(cosA);
  const sinA = Math.sin(angleA);
  // 判定sinA值正负
  // TODO

  // AB的向量
  const vAB = { x: vA.x - vB.x, y: vA.y - vB.y };
  // 对向量AB旋转A的角度,即得到AC的向量
  const vAC = {};
  vAC.x = cosA * vAB.x + sinA * vAB.y;
  vAC.y = -sinA * vAB.x + cosA * vAB.y;
  const vC = { x: vA.x - vAC.x, y: vA.y - vAC.y };
  console.log(vA, vB, vC, a, b, c);
  return vC;
};
