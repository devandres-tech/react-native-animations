import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native'
import data from '../utils/data'

const { width, height } = Dimensions.get('window')
const LOGO_WIDTH = 220
const LOGO_HEIGHT = 40
const DOT_SIZE = 40

const Item = ({ imageUri, heading, description }) => {
  return (
    <View style={styles.itemStyle}>
      <Image source={imageUri} style={[styles.imageStyle]} />
      <View style={styles.textContainer}>
        <Text style={[styles.heading]}>{heading}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
    </View>
  )
}

const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        )
      })}
    </View>
  )
}

export default () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index }) => <Item {...item} />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Image
        style={styles.logo}
        source={require('../assets/ue_black_logo.png')}
      />
      <Pagination />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: '-90deg' },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
