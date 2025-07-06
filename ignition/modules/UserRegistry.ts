import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("UserRegistry", (m) => {
  const userRegistry = m.contract("UserRegistry");

  return { userRegistry };
});
