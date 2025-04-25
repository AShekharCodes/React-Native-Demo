import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: React.ReactNode;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="font-semibold text-white">{label}</Text>
    <Text className="text-light-200 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  const formatReleaseDate = (dateStr?: string) => {
    if (!dateStr) return "Unknown";

    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const getDaySuffix = (d: number) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            className="w-full h-[500px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <View className="w-full flex-row justify-between items-center">
            <Text className="text-white font-bold text-xl">{movie?.title}</Text>
            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image source={icons.star} className="size-4" />
              <Text className="text-white font-bold text-sm">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-light-200 text-sm ">
                ({movie?.vote_count} votes)
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between gap-10">
            <MovieInfo
              label="Released"
              value={formatReleaseDate(movie?.release_date)}
            />
            <MovieInfo
              label="Runtime"
              value={
                movie?.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              (movie?.genres ?? []).length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {(movie?.genres ?? []).map((g, index) => (
                    <View
                      key={index}
                      className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2"
                    >
                      <Text className="text-light-200 font-bold text-sm">
                        {g.name}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-light-200 text-sm">N/A</Text>
              )
            }
          />

          <View className="flex flex-row justify-between gap-10">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget
                  ? `$${(movie.budget / 1_000_000).toFixed(0)} million`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue
                  ? `$${(movie.revenue / 1_000_000).toFixed(0)} million`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              (movie?.production_companies ?? []).length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {(movie?.production_companies ?? []).map((p, index) => (
                    <View
                      key={index}
                      className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2"
                    >
                      <Text className="text-light-300 font-bold text-sm">
                        {p.name}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-light-200 text-sm">N/A</Text>
              )
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0  mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#FFF"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
