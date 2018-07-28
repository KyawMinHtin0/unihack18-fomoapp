import glamorous from "glamorous";

export const TrendingMarker = glamorous.div({
  borderRadius: "50px",
  width: "30px",
  height: "30px",
  backgroundColor: "white",
  borderStyle: "solid",
  borderColor: "#407899",
  borderWidth: "5px",
  boxShadow: "1px 1px 1px grey",
  transition: "border-color 0.3s, background-color 0.1s, transform 0.3s",
  zIndex: 100,
  ":hover": {
    backgroundColor: "white",
    borderColor: "#4464AD",
    boxShadow: "2px 2px 2px grey",
    transform: "scale(1.1)"
  },
  ":active": {
    backgroundColor: "#00A08750",
    boxShadow: "0px 0px 0px grey"
  }
});
