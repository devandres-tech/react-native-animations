import * as React from 'react'
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native'
const { width, height } = Dimensions.get('screen')

const API_KEY = '563492ad6f91700001000001e544bbc06df5477aa259d3305da2715d'
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20'
const IMAGE_SIZE = 80
const SPACING = 10

const fetchImgFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
  const { photos } = await data.json()
  return photos
}

export default () => {
  const [images, setImages] = React.useState(null)

  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImgFromPexels()
      setImages(images)
    }
    fetchImages()
  }, [])

  const topRef = React.useRef()
  const thumbRef = React.useRef()
  const [activeIndex, setActiveIndex] = React.useState(0)

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    })
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      })
    }
  }

  if (!images) return <Text>Loading...</Text>

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width)
          )
        }}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFill]}
              />
            </View>
          )
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        contentContainerStyle={{ padding: SPACING }}
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', bottom: IMAGE_SIZE }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item.src.portrait }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
