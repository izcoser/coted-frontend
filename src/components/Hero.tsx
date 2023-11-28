// Hero.js
import React from "react";
import ActualValue from "./ActualValue";

interface HeroProps {
  title: string;
}

const Hero = ({ title }: HeroProps) => {
  return (
    <div className="hero">
      <div className="flex-1 pt-6 padding padding-x">
        <h1 className="hero__title">{title}</h1>
      </div>
    </div>
  );
};

export default Hero;
