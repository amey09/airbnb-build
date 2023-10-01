import {
  Box,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
        {children}
      </Text>
    );
  };
  return (
    <Box dropShadow={"2xl"}>
      <Container as={Stack} maxW={"6xl"}>
        <Grid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box height={"4rem"} position={"relative"} width={"4rem"}>
              <Image src={"football-logo.svg"} />
            </Box>
            <Text fontSize={"sm"}>© 2022 Ground. All rights reserved</Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={"#"}>
              Overview
            </Box>
            <Box as="a" href={"#"}>
              Features
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"#"}>
              About
            </Box>
            <Box as="a" href={"#"}>
              Careers
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"#"}>
              Help Center
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Box as="a" href={"#"}>
              Facebook
            </Box>
            <Box as="a" href={"#"}>
              Twitter
            </Box>
            <Box as="a" href={"#"}>
              Dribbble
            </Box>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
