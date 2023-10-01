"use client";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Input,
  Image,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker, DateRange } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const formatattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatattedStartDate} - ${formattedEndDate}`;
  const isMdScreen = useMediaQuery({ maxWidth: 768 });
  const isSmScreen = useMediaQuery({ maxWidth: 480 });
  const isBaseScreen = useMediaQuery({ maxWidth: 400 });

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchValue("");
  };

  const search = () => {
    const url = new URLSearchParams(Array.from(searchParams.entries()));

    if (searchValue) {
      url.set("location", searchValue);
    }

    if (startDate) {
      url.set("startDate", startDate.toISOString());
    }

    if (endDate) {
      url.set("endDate", endDate.toISOString());
    }

    const query = url.toString().length > 0 ? `?${url.toString()}` : "";

    router.push(`/search${query}`);
    setSearchValue("");
  };

  const renderDateRange = () => {
    if (isMdScreen || isSmScreen || isBaseScreen) {
      return (
        <DateRange
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={["#FD5861"]}
          onChange={handleSelect}
        />
      );
    } else {
      return (
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={["#FD5861"]}
          onChange={handleSelect}
        />
      );
    }
  };

  return (
    <Box>
      <Grid
        padding={{
          base: "0 1.5rem",
          sm: "0 1.5rem",
          md: "0 1.5rem",
          xl: "0 1.5rem",
          "2xl": "0 20rem 0 21rem",
        }}
        position={"sticky"}
        top={"0"}
        right={"0"}
        left="0"
        alignItems={"center"}
        height={"15svh"}
        backgroundColor={"black"}
        as="header"
        zIndex={9999}
        templateColumns={"repeat(2, 1fr)"}
        gap={"2rem"}
      >
        <GridItem onClick={() => router.push("/")} position={"relative"}>
          <Image
            src={"/airbnb.png"}
            width={150}
            height={50}
            objectFit="contain"
            cursor={"pointer"}
          />
        </GridItem>
        <GridItem>
          <Box>
            <InputGroup color={"white"}>
              <InputRightElement>
                <Search2Icon onClick={search} cursor={"pointer"} />
              </InputRightElement>
              <Input
                placeholder={`${location || "Location"} | ${
                  range || "Select Dates"
                }`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </InputGroup>
          </Box>
        </GridItem>
      </Grid>
      {searchValue && (
        <Flex
          flexDir={"column"}
          margin={"1rem 1.5rem"}
          width={"fit-content"}
          zIndex={999}
          position={"absolute"}
          right={{
            base: "0",
            sm: "0",
            md: "0",
            lg: "0",
            xl: "0",
            "2xl": "19rem",
          }}
        >
          {renderDateRange()}
          <Flex flexGrow={"auto"} gap="1.5rem">
            <Button onClick={resetInput} textColor={"gray"} flexGrow={"1"}>
              Cancel
            </Button>
            <Button onClick={search} textColor={"red"} flexGrow={"1"}>
              Search
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default Header;
