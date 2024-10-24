import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API } from "../components/api/Api";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const index = () => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const [nowplayingMovies, setNowplayingMovies] = useState([]);
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const getNowPlayingMovies = async () => {
    try {
      const response = await API.nowPlayingMovies();
      setNowplayingMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTopRatedMovies = async () => {
    try {
      const response = await API.getToprated()
      setTopRatedMovies(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const getPopularMovies = async () => {
    try {
      const response = await API.popularMovies();
      setPopularMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoviesGenres = async () => {
    try {
      const response = await API.getGenresID();
      setMoviesGenre(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
    getMoviesGenres();
    getPopularMovies();
    handleTopRatedMovies();
  }, []);



  const handleSearchMovies = () =>{
    router.push(`/search/${inputValue}`)
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-slate-900">
        <View className="flex-row items-end  justify-between pl-3 pr-3 h-20 ">
       <Pressable onPress={()=> router.push('/')}>
       <View className="flex-row items-center justify-center gap-0.5">
            <MaterialIcons name="movie" size={20} color="yellow" />
            <Text
              style={{ fontFamily: "PoppinsMedium" }}
              className="text-white text-xl"
            >
             <Text className="text-yellow-300"> Movie</Text>Night
            </Text>
          </View>
       </Pressable>
   
        </View>

        <View className="flex-1 p-3">
          <View className="flex-row p-1 items-center border bg-gray-700 rounded-md ">
            <Feather name="search" size={24} color="gray" paddingLeft={10} />
            <TextInput
              className="flex-1 pl-2 text-white"
              placeholderTextColor={"gray"}
              placeholder="Search your movies here..."
              onChangeText={setInputValue}
              onSubmitEditing={handleSearchMovies}
            />
          </View>

          <View className="flex-1">
            <ScrollView horizontal className="mt-2 mb-2">
           <View className="flex-row gap-2">
           {moviesGenre.map((item, index)=>(
                <Pressable key={index} onPress={()=> router.push(`/genres/${item.id}`)} className="bg-gray-700 rounded-md p-2 pl-3 pr-3">
                <Text  style={{ fontFamily: "PoppinsMedium" }} className="text-white">{item.name}</Text>
              </Pressable>
              ))}
           </View>
            </ScrollView>
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
              <View className="nowplaying">
                <Text
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="text-yellow-300 text-md"
                >
                  NowPlaying Movies
                </Text>
                <ScrollView horizontal={true}>
                  {nowplayingMovies.map((movie, index) => (
                    <Pressable
                      onPress={() => router.push(`/overview/${movie.id}`)}
                      key={index}
                    >
                      <View className="m-1 flex-2 w-40 overflow-hidden">
                        <Image
                          className="w-40 h-56 rounded-md"
                          source={{ uri: `${imgUrl}${movie.poster_path}` }}
                        />
                        <View className="flex-row">
                          <Text
                            style={{ fontFamily: "PoppinsMedium" }}
                            className="text-white mt-1"
                            numberOfLines={1} // Limit to 1 line
                            ellipsizeMode="tail" // Add ellipsis if the text overflows
                          >
                            {movie.original_title}
                          </Text>
                        </View>
                        <View className="flex-row ">
                          {movie.genre_ids.map((genreID, genreIndex) => {
                            const genre = moviesGenre.find(
                              (g) => g.id === genreID
                            );
                            return genre ? (
                              <Text
                                key={genreIndex}
                                style={{ fontFamily: "PoppinsMedium" }}
                                className="text-gray-400 mr-1"
                              >
                                {genre.name},
                              </Text>
                            ) : null; // Handle case where genre might not be found
                          })}
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
              <View className="popular mt-3">
                <Text
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="text-yellow-300 text-md"
                >
                  Popular Movies
                </Text>
                <ScrollView horizontal={true}>
                  {popularMovies.map((movie, index) => (
                    <Pressable
                      onPress={() => router.push(`/overview/${movie.id}`)}
                      key={index}
                    >
                      <View className="m-1 flex-2 w-40 overflow-hidden">
                        <Image
                          className="w-40 h-56 rounded-md"
                          source={{ uri: `${imgUrl}${movie.poster_path}` }}
                        />
                        <View className="flex-row">
                          <Text
                            style={{ fontFamily: "PoppinsMedium" }}
                            className="text-white mt-1"
                            numberOfLines={1} // Limit to 1 line
                            ellipsizeMode="tail" // Add ellipsis if the text overflows
                          >
                            {movie.original_title}
                          </Text>
                        </View>
                        <View className="flex-row ">
                          {movie.genre_ids.map((genreID, genreIndex) => {
                            const genre = moviesGenre.find(
                              (g) => g.id === genreID
                            );
                            return genre ? (
                              <Text
                                key={genreIndex}
                                style={{ fontFamily: "PoppinsMedium" }}
                                className="text-gray-400 mr-1"
                              >
                                {genre.name},
                              </Text>
                            ) : null; // Handle case where genre might not be found
                          })}
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View className="popular mt-3">
                <Text
                  style={{ fontFamily: "PoppinsMedium" }}
                  className="text-yellow-300 text-md"
                >
                  Toprated Movies
                </Text>
                <ScrollView horizontal={true}>
                  {topRatedMovies.map((movie, index) => (
                    <Pressable
                      onPress={() => router.push(`/overview/${movie.id}`)}
                      key={index}
                    >
                      <View className="m-1 flex-2 w-40 overflow-hidden">
                        <Image
                          className="w-40 h-56 rounded-md"
                          source={{ uri: `${imgUrl}${movie.poster_path}` }}
                        />
                        <View className="flex-row">
                          <Text
                            style={{ fontFamily: "PoppinsMedium" }}
                            className="text-white mt-1"
                            numberOfLines={1} // Limit to 1 line
                            ellipsizeMode="tail" // Add ellipsis if the text overflows
                          >
                            {movie.original_title}
                          </Text>
                        </View>
                        <View className="flex-row ">
                          {movie.genre_ids.map((genreID, genreIndex) => {
                            const genre = moviesGenre.find(
                              (g) => g.id === genreID
                            );
                            return genre ? (
                              <Text
                                key={genreIndex}
                                style={{ fontFamily: "PoppinsMedium" }}
                                className="text-gray-400 mr-1"
                              >
                                {genre.name},
                              </Text>
                            ) : null; // Handle case where genre might not be found
                          })}
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
