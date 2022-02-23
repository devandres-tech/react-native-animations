import * as React from 'react'
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Svg, { Polygon } from 'react-native-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaskedView from '@react-native-community/masked-view'
import { colors, links, routes } from '../utils/utils'

const { width, height } = Dimensions.get('window')

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)
const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)

const Button = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  )
}

const fromCoords = { x: 0, y: height }
const toCoords = { x: width, y: 0 }

const CustomDrawer = ({ onPress, animatedValue }) => {
  const [selectedRoute, setSelectedRoute] = React.useState(routes[0])
  const polygonRef = React.useRef()
  React.useEffect(() => {
    animatedValue.addListener((v) => {
      if (polygonRef.current) {
        polygonRef.current.setNativeProps({
          points: `0,0 ${v.x},${v.y} ${width}, ${height} 0, ${height}`,
        })
      }
    })
  }, [])

  const translateX = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [-100, 0],
  })
  const opacity = animatedValue.x.interpolate({
    inputRange: [0, width],
    outputRange: [0, 1],
  })

  return (
    <MaskedView
      style={{ flex: 1 }}
      maskElement={
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <AnimatedPolygon
            ref={polygonRef}
            fill='red'
            points={`0,0 ${fromCoords.x},${fromCoords.y} ${width}, ${height} 0, ${height}`}
          />
        </Svg>
      }
    >
      <View style={styles.menuContainer}>
        <AntDesign
          name='close'
          size={34}
          color='white'
          onPress={onPress}
          style={{ position: 'absolute', top: 40, right: 20 }}
        />
        <Animated.View
          style={[styles.menu, { opacity, transform: [{ translateX }] }]}
        >
          <View>
            {routes.map((route, index) => {
              return (
                <Button
                  label={route}
                  key={route}
                  onPress={() => {
                    setSelectedRoute(route)
                    onPress()
                  }}
                  style={[
                    styles.button,
                    {
                      color: colors[index],
                      textDecorationLine:
                        route === selectedRoute ? 'line-through' : 'none',
                    },
                  ]}
                />
              )
            })}
          </View>
          <View>
            {links.map((link, index) => {
              return (
                <Button
                  label={link}
                  key={link}
                  onPress={onPress}
                  style={[
                    styles.buttonSmall,
                    { color: colors[index + routes.length + 1] },
                  ]}
                />
              )
            })}
          </View>
        </Animated.View>
      </View>
    </MaskedView>
  )
}

export default () => {
  const animatedValue = React.useRef(new Animated.ValueXY(fromCoords)).current

  const animate = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue: toValue === 1 ? toCoords : fromCoords,
      duration: 400,
      useNativeDriver: true,
    })
  }

  const onCloseDrawer = React.useCallback(() => {
    // close animation
    animate(0).start()
  }, [])
  const onOpenDrawer = React.useCallback(() => {
    // open animation
    animate(1).start()
  }, [])

  const translateX = animatedValue.y.interpolate({
    inputRange: [0, height * 0.3],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CustomDrawer onPress={onCloseDrawer} animatedValue={animatedValue} />
      <AnimatedAntDesign
        onPress={onOpenDrawer}
        name='menufold'
        size={34}
        color='#222'
        style={{
          position: 'absolute',
          top: 40,
          right: 20,
          transform: [{ translateX }],
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'flex-start',
    paddingTop: 80,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 34,
    lineHeight: 34 * 1.5,
  },
  buttonSmall: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
})
