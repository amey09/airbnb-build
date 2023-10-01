"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import Map from "../components/Map";
import ScrollToTopButton from "../components/SrollTopButton";

export default function Search() {
  const [listings, setListings] = useState([]);
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "Greece";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const formatattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatattedStartDate} - ${formattedEndDate}`;
  const stays = listings.length;
  const [cOrdinates, setcOrdinates] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortedListings, setSortedListings] = useState(listings);

  useEffect(() => {
    fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?select=name%2Cstreet%2Ccity%2Cprice%2Cgeolocation%2Cnumber_of_reviews%2Creview_scores_rating%2Cthumbnail_url&where=city%3D%22${location}%22%20OR%20country%3D%22${location}%22%20%20%20AND%20name%20IS%20NOT%20NULL%20%20%20AND%20street%20IS%20NOT%20NULL%20%20%20AND%20price%20IS%20NOT%20NULL%20%20%20AND%20geolocation%20IS%20NOT%20NULL%20%20%20AND%20number_of_reviews%20IS%20NOT%20NULL%20%20%20AND%20review_scores_rating%20IS%20NOT%20NULL%20%20%20AND%20thumbnail_url%20IS%20NOT%20NULL&limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        const listingsData = data.results;
        setListings(listingsData);
        const geoLocationData = listingsData.map((listing, index) => ({
          id: index + 1,
          price: listing.price,
          geoLocation: [listing.geolocation.lon, listing.geolocation.lat],
        }));
        setcOrdinates(geoLocationData);
      });
  }, [location]);

  const toggleSortOrder = () => {
    const newIsAscending = !isAscending;
    const sorted = newIsAscending
      ? [...listings].sort((a, b) => a.price - b.price)
      : [...listings].sort((a, b) => b.price - a.price);
    setSortedListings(sorted);
    setIsAscending(newIsAscending);
  };
  const listingsToDisplay =
    sortedListings.length > 0 ? sortedListings : listings;

  return (
    <Box maxHeight={"fit-content"}>
      <Flex as={"main"} gap={"2rem"} padding={{ "2xl": "0 20rem" }}>
      <ScrollToTopButton />
        <Box
          as="section"
          padding={{
            base: "1rem 0 0 0",
            sm: "1rem 0 0 0",
            md: "1rem 0 0 0",
            lg: "1rem 0 0 0",
            xl: "2rem 0 0 0",
          }}
          flex={1}
        >
          <VStack
            gap={"1rem"}
            alignItems={"left"}
            padding={{
              base: "0.5rem 1rem",
              sm: "0rem 1rem",
              xl: "0rem 0 0.5rem 1rem",
            }}
          >
            {location !== "Greece" && (
              <Text fontSize={"md"} fontStyle={"italic"} fontWeight={"500"}>
                {endDate === startDate
                  ? `Stays for - ${formatattedStartDate}`
                  : `${stays}+ Stays to ${range}`}
              </Text>
            )}
            <Heading as={"h4"}>
              {location === "Greece" ? "Explore Stays" : `Stays in ${location}`}
            </Heading>
            <Flex
              justifyContent={{ lg: "flex-start" }}
              gap={"1rem"}
              flexWrap={{ base: "wrap", sm: "wrap", md: "nowrap" }}
            >
              <Button rounded={"full"}>Cancellation Flexibility</Button>
              <Button rounded={"full"}>Type of Place</Button>
              <Button onClick={toggleSortOrder} rounded={"full"}>
                {isAscending ? "Low To High" : "High To Low"}
              </Button>
            </Flex>
          </VStack>
          <Grid
            height={"85vh"}
            templateColumns={"repeat(1, 1fr)"}
            gap={"1rem"}
            alignItems={"center"}
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0",
              },
            }}
          >
            {listingsToDisplay.map(
              ({
                city,
                country,
                geolocation,
                name,
                number_of_reviews,
                price,
                review_scores_rating,
                street,
                thumbnail_url,
              }) => (
                <GridItem key={name}>
                  <ListingCard
                    city={city}
                    country={country}
                    geolocation={geolocation}
                    name={name}
                    number_of_reviews={number_of_reviews}
                    price={price}
                    review_scores_rating={review_scores_rating}
                    street={street}
                    thumbnail_url={thumbnail_url}
                  />
                </GridItem>
              )
            )}
          </Grid>
        </Box>
        <Box
          as="section"
          padding={{
            base: "1rem 0 0 0",
            sm: "1rem 1rem 0 0",
            md: "1.5rem 1rem 0 0",
            lg: "1.5rem 1rem 0 0",
            xl: "1.5rem 1rem 0 0",
          }}
          flex={1}
          flexDir={"column"}
          gap={"1.5rem"}
          display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        >
          <Map coordinates={cOrdinates} />
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
}
