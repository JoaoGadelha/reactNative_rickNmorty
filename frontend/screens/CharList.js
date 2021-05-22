import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { postData } from "../functions/postData";
import { Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

const CharList = ({ navigation }) => {
  let [favorites, setFavorites] = useState([1, 2, 3]);
  let [apiRes, setApiRes] = useState([]);
  let [page, setPage] = useState(1);
  let [isHeart, setIsHeart] = useState(true);

  const changeFav = (action, charID) => {
    // se 'action' eh falso, remove char dos favoritos
    let aux = [...favorites];
    let favAction;
    let data;
    let url = "https://joao-gadelha-rick-n-morty.herokuapp.com/favorites";

    if (!action) {
      const index = aux.indexOf(charID);
      if (index > -1) {
        aux.splice(index, 1);
      }
      favAction = "0";
    } else {
      aux.push(charID);
      favAction = "1";
    }

    data = { clientID: item.id, charID: charID, favAction: favAction };
    let response = await postData(url, data);
    setFavorites(aux);
  };

  const nextPage = () => {
    if (apiRes.info.next !== null) {
      setPage((page) => page + 1);
      fetchRnMAPI();
    }
  };

  const prevPage = () => {
    if (page >= 1) {
      setPage((page) => page - 1);
      fetchRnMAPI();
    }
  };

  const fetchRnMAPI = async () => {
    const fetchAPI = await fetch(
      "https://rickandmortyapi.com/api/character?page=" + page
    );
    const jsonRes = await fetchAPI.json();
    await setApiRes(jsonRes);
  };

  useEffect(() => {
    fetchRnMAPI();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.imgContainer}
        data={apiRes.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
            <Text>{item.name}</Text>
            <Text>{item.status}</Text>
            <Text>{item.species}</Text>
            <Text>{item.gender}</Text>
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
        )}
      ></FlatList>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={prevPage}>
          <Icon name={"chevron-left"} size={30} color="#01a699" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Icon name={"chevron-right"} size={30} color="#01a699" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default CharList;
