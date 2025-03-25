import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/Services/useFetch";
import { fetchMovies } from "@/Services/api";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/Services/appwrite";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  // console.log(movies);
  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchQuery]);
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      console.log("calling");
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20 ">
              <Image source={icons.logo} />
            </View>
            <View className="my-5 ">
              <SearchBar
                placeHolder="Search For Movie"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-xl font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
