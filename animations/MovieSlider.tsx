/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from 'react'
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native'
const { width, height } = Dimensions.get('window')
import { getMovies } from '../utils/api'
import Genres from '../utils/genres'
import Rating from '../utils/rating'
import LinearGradient from 'react-native-linear-gradient'

const SPACING = 10
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2
const BACKDROP_HEIGHT = height * 0.65

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
)

export default () => {
  const [movies, setMovies] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies()
      setMovies(movies)
    }

    if (movies.length === 0) {
      fetchData(movies)
    }
  }, [movies])

  if (movies.length === 0) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: ITEM_SIZE }}>
              <View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
                <Genres genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
})
