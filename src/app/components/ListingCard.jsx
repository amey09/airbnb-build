"use client";

import { StarIcon } from "@chakra-ui/icons";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";

function ListingCard({
  city,
  country,
  geolocation,
  name,
  number_of_reviews,
  price,
  review_scores_rating,
  street,
  thumbnail_url,
}) {
  return (
    <Flex
      cursor="pointer"
      _hover={{
        opacity: 3,
        boxShadow: "lg",
        transition: "opacity 200ms ease-out, box-shadow 200ms ease-out",
      }}
      flexDir={{ base: "column", sm: "row", md: "row" }}
      gap={{ base: "1rem", md: "2rem", lg: "2rem" }}
      padding={"1rem 0"}
    >
      <Box
        position={"relative"}
        height={"15rem"}
        width={"15rem"}
        flexShrink={0}
      >
        <Image
          src={"/room.jpg"}
          fill
          style={{
            borderRadius: "1.8rem",
            objectFit: "cover",
            padding: "0 1rem",
          }}
          alt="logo"
          sizes="15rem"
          placeholder="blur"
          blurDataURL={"/room.jpg"}
        />
      </Box>
      <Flex
        flexDir={"column"}
        gap={"1rem"}
        justifyContent={"space-between"}
        padding={{
          base: "0 1rem",
          sm: "0 1rem 0 0",
          md: "0 1rem 0 0",
          lg: "0",
        }}
        flexGrow={1}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"topline"}
          flexDir={{ base: "column", sm: "row", md: "row" }}
          gap={{ base: "1rem", sm: "2rem" }}
        >
          <Text fontSize={"sm"}>{street}</Text>
          <AiFillHeart fontSize={"md"} />
        </Flex>
        <Heading size={{ base: "sm", md: "sm" }}>{name}</Heading>
        <Box marginTop={"auto"} fontSize="sm">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={
                  i < Math.floor(review_scores_rating / 20)
                    ? "teal.500"
                    : "gray.300"
                }
              />
            ))}
          <Box paddingTop={"0.3rem"} color="gray.600" fontSize="sm">
            {number_of_reviews} reviews
          </Box>
        </Box>
        <Flex gap={"0.5rem"} marginTop={"auto"} color="gray.600">
          <Box fontSize="sm">${price}</Box>
          <Box textAlign={"center"} fontSize="sm">
            / Night
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ListingCard;
