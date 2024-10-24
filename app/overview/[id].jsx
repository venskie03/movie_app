import { Image, SafeAreaView, ScrollView, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API } from '../../components/api/Api';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import {LinearGradient} from "expo-linear-gradient"
import AntDesign from '@expo/vector-icons/AntDesign';


const Movieoverview = () => {
  const { id } = useLocalSearchParams();
  const [movieDetails, setMovieDetails] = useState([])
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const [movieImage, setMovieImage] = useState("")
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [handleSecondRecommended, setSecondRecommended] = useState([])
  const [moviesGenre, setMoviesGenre] = useState([]);
  const router = useRouter()

  const getMoviesGenres = async () => {
    try {
      const response = await API.getGenresID();
      setMoviesGenre(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMovieDetails = async () =>{
    try {
      const response = await API.getMovieDetails(id)
      setMovieDetails(response.data)
      console.log("ID RECOMENDATIONS", response.data.genres[0].id)
      handleRecomentdedMovies(response.data.genres[0].id)
      handleSecondRecomentdedMovies(response.data.genres[1].id)
      setMovieImage(response.data.backdrop_path)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRecomentdedMovies = async (id) =>{

    try {
      const response = await API.getMovieByGenre(id)
      console.log(response.data)
      setRecommendedMovies(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSecondRecomentdedMovies = async (id) =>{

    try {
      const response = await API.getMovieByGenre(id)
      setSecondRecommended(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    handleMovieDetails();
    getMoviesGenres();
  },[])

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
       <ScrollView>
      <View className="h-56 bg-gray-500">
      <Pressable className="flex-row  top-9  p-2 absolute z-30" onPress={()=>router.push('/')}>
      <View  className="flex-row   p-1 pl-1 pr-1 rounded-lg ">
        <Ionicons name="chevron-back" size={25} color="white" />
        </View>
      </Pressable>

      <Pressable className="flex-row  top-10 p-2  right-4 absolute z-30" onPress={()=>router.push('/')}>
      <View  className="flex-row items-center ">
      <AntDesign name="hearto" size={25} color="yellow" />
        </View>
      </Pressable>
        <Image  className="w-full object-cover h-72" source={{uri: `${imgUrl}${movieImage}`}}/>

        <LinearGradient
        // Button Linear Gradient
        colors={['transparent', 'rgba(23,23,23, 0.7)', 'rgba(23,23,23, 1)']}
        className="h-60 absolute w-full bottom-[-72]"
         >
      </LinearGradient>

        <Pressable className="absolute right-40 top-28" onPress={()=>router.push(`/player/${id}`)}>
        <FontAwesome name="play" size={44} color="white" />
        </Pressable>
       
      </View>

    <View className="details flex-1 p-3 mt-3">
       {movieDetails ? 
       <View className="flex-row gap-2">
       <Image className="w-32 h-44 rounded-md" source={{uri: `${imgUrl}${movieDetails.poster_path}`}}/>
       <View >
       <Text onPress={()=>console.log(movieDetails.genres)}
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-yellow-300 text-lg w-48"
              >
               {movieDetails.original_title}
              </Text>
              <Text onPress={()=>console.log(movieDetails.genres)}
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-gray-400 text-md"
              >
               {movieDetails.release_date}
              </Text>
              <Text onPress={()=>console.log(movieDetails.genres)}
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-gray-400 text-md"
              >
               {movieDetails.runtime} minutes
              </Text>
              <Text onPress={()=>console.log(movieDetails.genres)}
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-gray-400 text-md"
              >
               {movieDetails.popularity} watched
              </Text>
              <View className=" flex-row flex-wrap w-48 gap-1">
        {movieDetails?.genres?.map((genre, index) => (
          <Text
            key={index}
            className="text-gray-400"
          >
            {genre.name},
          </Text>
        ))}
      </View>
 
       </View>
       </View> : null 
      }
           <Text
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-yellow-300 text-lg mt-4"
              >
               Overview
              </Text>
              <Text  style={{ fontFamily: "PoppinsThinItalic" }}
                className="text-white text-md mt-1">{movieDetails.overview}</Text>

                <View>
                <Text
                style={{ fontFamily: "PoppinsMedium" }}
                className="text-yellow-300 text-lg mt-4"
              >
               Recommended
              </Text>
              <ScrollView horizontal={true}>
                {recommendedMovies?.map((movie, index) => (
                  <Pressable onPress={()=>router.push(`/overview/${movie.id}`)} key={index}>
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
                        {movie?.genre_ids?.map((genreID, genreIndex) => {
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
              <ScrollView horizontal={true} className="mt-1">
                {handleSecondRecommended?.map((movie, index) => (
                  <Pressable onPress={()=>router.push(`/overview/${movie.id}`)} key={index}>
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
                        {movie?.genre_ids?.map((genreID, genreIndex) => {
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
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Movieoverview;
