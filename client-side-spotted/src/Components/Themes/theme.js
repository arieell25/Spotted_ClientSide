import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    body1: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 400,
      fontSize: 16,
      color: "white"
    }
  },
  overrides: {
    MuiButton:{
        label:{
            color: "white",
            fontSize: "16px"
        }
    },
    MuiAppBar: {
        colorPrimary:{
            backgroundColor: "#ffff"
    
        }
    },
    MuiPaper: {
        root: {
            backgroundColor: "#252529"
        }
    },
    MuiListItem:{
        button:{
            // backgroundColor: "#ffff"
        },
        root: {
            "&$selected:hover": {
                backgroundColor: 'linear-gradient(179.58deg, #C5F836 -13.56%, #3AA4D1 158.3%)',
                color: "white"
              },
              "&$selected": {
                backgroundColor: 'linear-gradient(179.58deg, #C5F836 -13.56%, #3AA4D1 158.3%)',
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
    MuiInput:{
            label:{


            },
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
    'Mui-selected': {
        backgroundColor: 'linear-gradient(179.58deg, #C5F836 -13.56%, #3AA4D1 158.3%)',
        //   -webkit-linear-gradient(45deg,#C5F836, #3AA4D1)
      },
  }
})


export default theme;