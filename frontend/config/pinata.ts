export const PINATA_CONFIG = {
  API_KEY: process.env.REACT_APP_PINATA_API_KEY || "20393a306b5c23787edb",
  SECRET_KEY: process.env.REACT_APP_PINATA_API_SECRET || "1a406554ecbc402e6a2d668db650281a949a0534d1b2827511791394ea26a485",
  GATEWAY_URL: process.env.REACT_APP_PUBLIC_PINATA_GATEWAY_URL || "https://pink-absolute-catshark-415.mypinata.cloud/ipfs",
} as const;
