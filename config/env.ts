export const ENV = "dev";

const DEV_BASE_URL = "124";

export const BASE_URL = ENV === "dev" ? DEV_BASE_URL : "";
