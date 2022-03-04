import * as React from 'react'
import {
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import data from '../data2'
const ICON_SIZE = 42
const ITEM_HEIGHT = ICON_SIZE * 2
const colors = {
  yellow: '#FFE8A3',
  dark: '#2D2D2D',
}

const { width, height } = Dimensions.get('window')

const Icon = React.memo(({ icon, color }) => {
  return <SimpleLineIcons name={icon} color={color} size={ICON_SIZE} />
})

const Item = React.memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  )
})

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 - ITEM_HEIGHT * 2,
        width: width * 0.7,
        paddingHorizontal: 14,
      }}
    >
      <Text
        style={{
          color: colors.yellow,
          fontSize: 52,
          fontWeight: '700',
          lineHeight: 52,
        }}
      >
        Connect with...
      </Text>
    </View>
  )
})

const ConnectButton = React.memo(({ onPress }) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: height / 2 + ITEM_HEIGHT / 2,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: colors.yellow,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: colors.yellow,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 32, fontWeight: '800', color: colors.dark }}>
          Done!
        </Text>
      </TouchableOpacity>
    </View>
  )
})

export default () => {
  const [index, setIndex] = React.useState(0)
  const onConnectPress = React.useCallback(() => {
    Alert.alert('Connect with:', data[index].name.toUpperCase())
  }, [index])

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ConnectWithText />
      <ConnectButton onPress={onConnectPress} />
      <Item />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
})
