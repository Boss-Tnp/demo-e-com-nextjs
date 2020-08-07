export const H1_COLOR = "#f6f6f6";
export const H1_COLOR_OP = "#1e1d1d";
// export const H2_COLOR = "#f6f6f6";
// export const H3_COLOR = "#f6f6f6";
export const TITLE1_COLOR = "rgba(183, 183, 183, 0.82)";
// export const TITLE2_COLOR = "#f6f6f6";
// export const TITLE3_COLOR = "#f6f6f6";
export const SUBTITLE1_COLOR = "rgba(225, 227, 232, 0.71)";
// export const SUBTITLE2_COLOR = "#f6f6f6";
// export const SUBTITLE3_COLOR = "#f6f6f6";
export const BODY1_COLOR = "#b6b4b4";
// export const BODY2_COLOR = "#f6f6f6";
// export const BODY3_COLOR = "#f6f6f6";
export const LABEL_COLOR = "#e8e8e89e";
export const LABEL_FOCUS_COLOR = "#ede7e9c7";
export const DISABLED_COLOR = "#909090";
export const HOVER_COLOR = "#e3e4ea21";
export const PAPER_COLOR1 = "#131931";
export const PAPER_COLOR2 = "#131931";
export const SECOND_COLOR = "#f50057";
export const SUCCESS_COLOR = "#cbf4c9";
export const BORDER_COLOR = "rgba(85, 104, 178, 0.63)";
export const ACTIVE_COLOR = "#19ec19";
export const INACTIVE_COLOR = "#e80c0c";
export const ACTIVE_LINK = "#37655a70";

// export const RESTAPI_ENDPOINT = "http://localhost:8080";
export const RESTAPI_ENDPOINT =
  process.env.NEXT_PUBLIC_REACT_APP_RESTAPI_ENDPOINT;
export const GRAPHQLAPI_ENDPOINT =
  process.env.NEXT_PUBLIC_REACT_APP_GRAPHQLAPI_ENDPOINT;

export const API_HEADER = {
  "content-type": "application/json",
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
