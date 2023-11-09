import { Input, Box } from "@chakra-ui/react";
import React from "react";

const RainbowGlowingBorderInput = () => {
  return (
    <Box position="relative">
      <Input
        pl="2rem"
        pr="2rem"
        border="2px solid transparent"
        borderRadius="md"
        backgroundClip="padding-box"
        backgroundImage="linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff, #ff00ff)"
        animation="rainbowGlowingBorder 4s linear infinite"
        _focus={{
          animation: "none",
          borderColor: "transparent",
        }}
      />
      <style>
        {`
          @keyframes rainbowGlowingBorder {
            0% { border-color: #ff0000; }
            14% { border-color: #ff7f00; }
            28% { border-color: #ffff00; }
            42% { border-color: #00ff00; }
            57% { border-color: #0000ff; }
            71% { border-color: #8b00ff; }
            85% { border-color: #ff00ff; }
            100% { border-color: #ff0000; }
          }
        `}
      </style>
    </Box>
  );
};

export default RainbowGlowingBorderInput;
