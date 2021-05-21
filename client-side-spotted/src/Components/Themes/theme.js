import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#ffffff"
        },
        textSecondary:{
            color: "#ffffff"
        }
     },
  typography: {
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 400,
      fontSize: 16,
      color: "white"
    },
    body2: {
        fontFamily: "'Montserrat', sans-serif",
    }
  },
  overrides: {
    MuiButtonBase:{
        root:
        {
            color: "white"
        }
    },
    MuiButton:{
        root:{
            borderRadius: '30px',
            padding: '5px 30px',
            fonrSize: '15px'
        },
        label:{
            color: "white",
            fontSize: "16px"
        },
        text:{
            padding: "6px 20px"
        }
    },
    MuiTypography:{
        h6:{
            textTransform: "capitalize",
            fontFamily: "'Montserrat', sans-serif",
            fontSize:"26px"
        },
        colorTextSecondary:{
            color:"white"
        }
    },
    MuiAppBar: {
        colorPrimary:{
            backgroundColor: "#ffff"
    
        }
    },
    MuiPaper: {
        root: {
            backgroundColor: "#252529",
            color: "white"
        }
    },
    MuiFormHelperText:{
        root:{
            color: "#faf7f791",
            fontFamily: "'Montserrat', sans-serif",

        }
    },
    MuiPickersCalendarHeader:{
        iconButton:{
            backgroundColor:"#252529"
        }
    },
    MuiPickersDay:{
        daySelected:{
            backgroundColor: "-webkit-linear-gradient(45deg,#C5F836, #3AA4D1)"
        }
    },
    MuiListItem:{
        button:{
        },
        root: {
            "&$selected:hover": {
                backgroundColor: '#91d88e87',
                color: "white"
              },
              "&$selected": {
                backgroundColor: '#91d88e87',
                color: "white"
              },
        }
    },
    MuiFormLabel: {
        root:{
            color: "white" 
        }
    },
    MuiInputLabel:{
        root: { // Name of the rule
            "&$focused": { // increase the specificity for the pseudo class
              color: "#91d88e87"
            }
          }
    },
    MuiInputBase:{
        root:{
            color: "white"
        }
    },
    MuiInput:{
            underline: {
                '&:before': {
                    borderBottom: '1px solid rgba(203, 207, 212, 1)'
                },
                '&:after': {
                    borderBottom: `2px solid #91d88e87`
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: `2px solid rgba(203, 207, 212, 1)`
                }
            }
        },
    MuiCardContent:{
        root:{
            color: "#ffffff",
            fontFamily: "'Montserrat', sans-serif",
            paddingTop: "50px"

        }
    },
    // MuiCardMedia:{
    //     media:{
    //         width: '80%',
    //         padding: '20px',
    //         margin: '0 auto',
    //     }
    
    // }
    
  }
})


export default theme;