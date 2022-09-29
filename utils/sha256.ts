import { createHash } from "crypto";

const sha256 = (str: string): string => {
  return createHash("sha256").update(str).digest("hex");
};

export default sha256;