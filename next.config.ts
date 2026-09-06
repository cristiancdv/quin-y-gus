import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverActions: {
    // The photo wall accepts images up to 8 MB; multipart metadata needs a
    // little additional room beyond the validated file size.
    bodySizeLimit: "9mb",
  },
};

export default nextConfig;
