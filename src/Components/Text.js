import glamorous from "glamorous";
import { COLORS } from "../Utils/Constants";

const FONTSTYLES = {
  TINY: {
    color: "grey",
    fontSize: "11pt",
    fontWeight: "300"
  },
  SMALL: {
    color: "grey",
    fontSize: "12pt",
    fontWeight: "300"
  },
  MESSAGE: {
    color: "white",
    fontSize: "12pt",
    fontWeight: "300"
  },
  HEADING_WHITE: {
    color: "white",
    fontSize: "28pt",
    fontWeight: "600"
  },
  EXPAND_BUTTON: {
    color: COLORS.BLUE,
    fontSize: "12pt",
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none",
    alignSelf: "flex-end",
    marginBottom: "10px",
    marginRight: "10px",
    ":hover": {
      color: COLORS.NAVY
    }
  }
};

export const Text = glamorous.div(
  {
    display: "flex",
    fontFamily: "'Josefin Sans', sans-serif",
    margin: "5px"
  },
  props => {
    const type = props.type;
    return FONTSTYLES[type];
  }
);
