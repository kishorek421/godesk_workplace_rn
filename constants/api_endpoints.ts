// (auth)
export const LOGIN = "/login/user_login";
export const VALIDATE_TOKEN = "/login/validate";
export const REFRESH_TOKEN = "/login/refresh_token";

// configurations
export const GET_CONFIGURATIONS_BY_CATEGORY =
  "/configurations/getConfigurationsForDropdown";

// customer lead
export const GET_CUSTOMER_LEAD_DETAILS = "/customers/leads/view";

// customer
export const CREATE_CUSTOMER = "/customers/create";
export const GET_CUSTOMER_DETAILS = "/customers/view";

// geolocations
export const GET_PINCODES = "/geolocations/pincodes/getAllPincodesForDropdown";
export const GET_AREAS = "/geolocations/areas/getAllAreasForDropdown";
export const GET_CITIES = "/geolocations/cities/getAllCitiesForDropdown";
export const GET_STATES = "/geolocations/states/getAllStatesForDropdown";
export const GET_COUNTRIES =
  "/geolocations/countries/getAllCountriesForDropdown";

// tickets
export const RAISE_TICKET = "tickets/raiseTicket";
export const GET_TICKET_DETAILS = "tickets/view";
export const GET_TICKETS_BY_STATUS_KEY =
  "tickets/customers/getTicketsByStatusKey";

export const GET_ASSETS_IN_USE =
  "/assets/assetsInUse/getCustomerAssetsInUseListBySerialNoSearch";
export const GET_ISSUE_TYPES = "/assets/assetIssueType/getIssueTypesList";
