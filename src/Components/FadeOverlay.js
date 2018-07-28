import glamorous from "glamorous";

export const FadeOverlay = glamorous.div(
  {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    transition: "0.3s"
  },
  props => {
    const display = props.display;
    if (display)
      return {
        backgroundColor: "rgba(0,0,0,0.5)",
        pointerEvents: "auto"
      };
    else return { backgroundColor: "rgba(0,0,0,0)", pointerEvents: "none" };
  }
);
