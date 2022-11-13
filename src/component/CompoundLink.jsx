import React from "react";
import { Link } from "react-router-dom";

const CompoundLink = ({ to, href, style, children, ...props }) => {
  const Container = !!to ? Link : !!href ? "a" : "div";
  return (
    <Container
      to={to}
      href={href}
      target={href && "_blank"}
      style={style}
      className="block"
      {...props}
    >
      {children}
    </Container>
  );
};

export default CompoundLink;
