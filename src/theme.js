import {
  H1_COLOR,
  H1_COLOR_OP,
  BODY1_COLOR,
  DISABLED_COLOR,
  HOVER_COLOR,
  PAPER_COLOR1,
  TITLE1_COLOR,
  LABEL_COLOR,
  LABEL_FOCUS_COLOR,
  SECOND_COLOR,
  BORDER_COLOR,
  SUBTITLE1_COLOR,
} from "./../utils/constant";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      // '"Georgia"',
      // '"Comic Sans MS"',
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiTableCell: {
      head: {
        color: H1_COLOR,
      },
      body: {
        color: BODY1_COLOR,
      },
    },
    MuiTablePagination: {
      caption: {
        color: H1_COLOR,
      },
      select: {
        color: H1_COLOR,
      },
      selectIcon: {
        color: H1_COLOR,
      },
      menuItem: {
        color: H1_COLOR_OP,
      },
    },
    MuiIconButton: {
      root: {
        color: H1_COLOR,
        "&$disabled": {
          color: DISABLED_COLOR,
        },
        "&:hover": {
          backgroundColor: HOVER_COLOR,
        },
      },
    },
    MuiPaper: {
      root: {
        color: H1_COLOR,
        backgroundColor: PAPER_COLOR1,
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: TITLE1_COLOR,
        "&$selected": {
          color: H1_COLOR,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: LABEL_COLOR,
        "&.Mui-focused": {
          color: LABEL_FOCUS_COLOR,
        },
        "&.Mui-disabled": {
          color: DISABLED_COLOR,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: SECOND_COLOR,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: HOVER_COLOR,
        },
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: DISABLED_COLOR,
        },
      },
      notchedOutline: {
        borderColor: BORDER_COLOR,
      },
    },
    MuiSwitch: {
      track: {
        backgroundColor: "#fff",
      },
    },
    MuiInputBase: {
      root: {
        color: H1_COLOR,
        "&.Mui-disabled": {
          color: DISABLED_COLOR,
        },
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid ${TITLE1_COLOR}`,
        },
        "&:after": {
          borderBottom: `1px solid ${SECOND_COLOR}`,
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: `1px solid ${H1_COLOR}`,
        },
      },
    },
    MuiSelect: {
      icon: {
        color: H1_COLOR,
      },
    },
    MuiListItem: {
      root: {
        color: H1_COLOR,
        width: "auto",
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: SUBTITLE1_COLOR,
      },
    },
    MuiListItemIcon: {
      root: {
        color: TITLE1_COLOR,
      },
    },
    MuiSkeleton: {
      root: {
        backgroundColor: H1_COLOR_OP,
      },
    },
    MuiPaginationItem: {
      root: {
        color: LABEL_COLOR,
      },
      outlined: {
        border: `1px solid ${LABEL_COLOR}`,
      },
    },
    MuiFormHelperText: {
      root: {
        color: SECOND_COLOR,
      },
    },
    MuiDialog: {
      paperFullScreen: {
        overflow: "hidden",
      },
    },
  },
});

export default theme;
