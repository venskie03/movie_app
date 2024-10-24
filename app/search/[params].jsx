import { View, Text, SafeAreaView, Pressable, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { API } from '../../components/api/Api';

const Searchmovies = () => {
    const { params } = useLocalSearchParams()
    const router = useRouter()
    const [searchMovies, setSearchedMovies] = useState([])
    const [moviesGenre, setMoviesGenre] = useState([]);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    const handleSearchMovies = async () =>{
        try {
            const response = await API.searchMovies(params)
            console.log(response.data)
            setSearchedMovies(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    const getMoviesGenres = async () => {
        try {
          const response = await API.getGenresID();
          setMoviesGenre(response.data.genres);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(()=>{
    handleSearchMovies();
    getMoviesGenres();
    },[params])

  return (
   <SafeAreaView className="flex-1">
     <View className="bg-gray-900 flex-1">
      <View className="flex-row h-20 items-end ">
      <Pressable onPress={()=> router.push('/')}>
      <View className="flex-row items-center pl-1"><Ionicons name="chevron-back" size={24} color="white" />
      <Text style={{fontFamily: 'PoppinsMedium'}} className="text-white"> Back</Text></View>
      </Pressable>
      </View>

        <View className="flex-1 p-3">
        <Text style={{fontFamily: 'PoppinsMedium'}} className="text-white text-lg mt-2">Search Results of <Text className="text-yellow-300">{params}</Text></Text>

        <ScrollView>
          <View className="flex flex-wrap flex-row justify-between">
          {searchMovies?.map((movie, index) => (
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
                          {movie.genre_ids?.map((genreID, genreIndex) => {
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
          </View>
        </ScrollView>

        </View>

    </View>
   </SafeAreaView>
  )
}

export default Searchmovies