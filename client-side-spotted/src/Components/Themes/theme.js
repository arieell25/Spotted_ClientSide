import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ffffff",
    },
    textSecondary: {
      color: "#ffffff",
    },
    text: {
      disabled: "#c5e0e361",
    },
  },
  typography: {
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 400,
      fontSize: 16,
      color: "white",
    },
    body2: {
      fontFamily: "'Montserrat', sans-serif",
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        fontFamily: "'Montserrat', sans-serif",
        color: "white",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "30px",
        padding: "5px 30px",
        fonrSize: "15px",
      },
      label: {
        color: "white",
        fontSize: "16px",
      },
      text: {
        padding: "6px 20px",
      },
    },
    MuiTypography: {
      h6: {
        textTransform: "none",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "26px",
      },
      colorTextSecondary: {
        color: "white",
      },
      colorInherit: {
        color: "white",
      },
    },
    MuiMenuItem: {
      root: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "capitalize",
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#ffff",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#252529",
        color: "white",
      },
    },
    MuiFormHelperText: {
      root: {
        color: "#faf7f791",
        fontFamily: "'Montserrat', sans-serif",
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "#252529",
      },
      dayLabel: {
        color: "#e3d6d661",
      },
    },

    MuiPickersDay: {
      root: {
        "&$selected:hover": {
          color: "#50ec37",
          backgroundColor: "#50ec37",
        },
        "&:hover": {
          backgroundColor: "#50ec37",
        },
      },
      daySelected: {
        color: "#50ec37",
        backgroundColor: "#50ec37",
      },
      hover: {
        color: "#50ec37",
        backgroundColor: "#50ec37",
      },
    },
    MuiListItem: {
      button: {},
      root: {
        "&$selected:hover": {

        },
        "&$selected": {
            borderBottom: "solid",
            borderImageSlice: 1,
            borderImageSource: "linear-gradient(to left, #C5F836, #3AA4D1)"
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "white",
      },
    },
    MuiInputLabel: {
      root: {
        "&$focused": {
          color: "#91d88e87",
        },
      },
    },
    MuiInputBase: {
      root: {
        color: "white",
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid rgba(203, 207, 212, 1)",
        },
        "&:after": {
          borderBottom: `2px solid #91d88e87`,
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid rgba(203, 207, 212, 1)`,
        },
      },
    },
    MuiCardContent: {
      root: {
        color: "#ffffff",
        fontFamily: "'Montserrat', sans-serif",
        paddingTop: "10px",
      },
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: 1500,
      },
    },
    MuiIconButton: {
      label: {
        color: "#ffffff",
      },
    },
    MuiDataGrid: {
      root: {
        color: "#ffffff",
      },
    },
    MuiDataGridPanel:{
      paper:{
        backgroundColor:"#333337eb"

      }
    }
  },
});

export default theme;
