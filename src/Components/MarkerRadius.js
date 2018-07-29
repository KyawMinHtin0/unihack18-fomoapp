import glamorous from "glamorous";

export const MarkerRadius = glamorous.div({
  position: "absolute",
  top: "-30px",
  left: "-30px",
  borderRadius: "200px",
  width: "100px",
  height: "100px",
  backgroundColor: "#53DD9050",
  pointerEvents: "none",
  transition: "300s",
  ":hover": {
    backgroundColor: "#53DD9020"
  }
});
