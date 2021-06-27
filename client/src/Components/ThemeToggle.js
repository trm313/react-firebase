import { useColorMode, Flex, Icon, IconButton } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align='center'>
      <IconButton
        icon={
          colorMode === "light" ? <Icon as={FiMoon} /> : <Icon as={FiSun} />
        }
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default ThemeToggle;
