import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Link,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import { IoPersonCircleOutline, IoLogOutOutline } from "react-icons/io5";

import { useAuth } from "../../../context/AuthContext";

import headerStyle from "./Header.module.scss";

const Header = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const colorModeIcon = () => {
    if (colorMode === "dark") return <SunIcon />;
    return <MoonIcon />;
  };

  return (
    <Box as={"header"} py="3" className={`${headerStyle.Header}`}>
      <Container maxW={"container.xl"}>
        <Box as={"nav"} className={`${headerStyle.Header__nav}`}>
          <Link href="/" className={`${headerStyle.logo}`}>
            Leave Management
          </Link>

          <UnorderedList
            styleType={"none"}
            gap="3"
            ml={"auto"}
            className={`${headerStyle.Header__navList}`}
          >
            <ListItem className={`${headerStyle.Header__navListItem}`}>
              <IconButton aria-label="Toggle color moda" icon={colorModeIcon()} onClick={toggleColorMode} />
            </ListItem>

            <ListItem className={`${headerStyle.Header__navListItem}`}>
              <Menu>
                <MenuButton as={Button}>
                  <Avatar name={user?.name || user?.email} src={user.avatarUrl} size="xs" />
                  {user?.name || user?.email}
                </MenuButton>
                <MenuList p={2} overflow={"hidden"}>
                  <MenuItem borderRadius={3} gap={2} onClick={() => {}}>
                    <Icon as={IoPersonCircleOutline} />
                    Profile
                  </MenuItem>
                  <MenuItem
                    color={"red.500"}
                    _hover={{ backgroundColor: "red.50" }}
                    borderRadius={3}
                    gap={2}
                    onClick={logout}
                  >
                    <Icon as={IoLogOutOutline} />
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </ListItem>
          </UnorderedList>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
