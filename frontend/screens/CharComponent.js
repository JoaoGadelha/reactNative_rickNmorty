import React from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CharComponent = ({ changeFav, favorites, RnM_APIresponse, flatListRef }) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.imgContainer}
        data={RnM_APIresponse}
        keyExtractor={(item) => item.id.toString()}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.subContainer}>
                <View style={styles.subText}>
                  <Text>
                    <Text style={styles.blue}>condition:</Text> {item.status}
                  </Text>
                  <Text>
                    <Text style={styles.blue}>species: </Text>
                    {item.species}
                  </Text>
                  <Text>
                    <Text style={styles.blue}>gender: </Text>
                    {item.gender}
                  </Text>
                </View>
                <View style={styles.heart}>
                  {favorites.includes(item.id) && (
                    <AntDesign
                      size={40}
                      name="heart"
                      color="red"
                      onPress={() => changeFav(false, item.id)}
                    />
                  )}
                  {!favorites.includes(item.id) && (
                    <AntDesign
                      size={40}
                      name="hearto"
                      color="red"
                      onPress={() => changeFav(true, item.id)}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    width: "100%",
  },
  textContainer: {
    padding: 20,
  },
  imgContainer: {
    width: "100%",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 30,
  },
  blue: {
    color: "blue",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
});

export default CharComponent;
