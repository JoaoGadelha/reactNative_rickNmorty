import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { postData } from "../functions/postData";
import { Icon } from "react-native-elements";
import CharComponent from "./CharComponent";

const CharList = ({ route,navigation }) => {
  let [favorites, setFavorites] = useState([]);
  let [apiRes, setApiRes] = useState({ info: 1 });
  let [page, setPage] = useState(1);
  let [pageLoading, setPageLoading] = useState(false);
  const flatListRef = useRef();

  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const changeFav = async (action, charID) => {
    let aux = [...favorites];
    let favAction;
    let data;
    let url = "https://joao-gadelha-rick-n-morty.herokuapp.com/favorites";

    // se 'action' eh falso, remove char dos favoritos
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

    data = {
      clientID: route.params.clientID,
      charID: charID,
      favAction: favAction,
    };

    let response = await postData(url, data);
    setFavorites(response);
  };

  const nextPage = () => {
    if (apiRes.info.next !== null && !pageLoading) {
      setPage((page) => page + 1);
      setPageLoading(true);
    }
  };

  const prevPage = () => {
    if (page > 1 && !pageLoading) {
      setPage((page) => page - 1);
      setPageLoading(true);
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
    console.log(route.params);
    setFavorites(route.params.favorites);
    fetchRnMAPI();
  }, []);

  useEffect(() => {
    console.log(page);
    fetchRnMAPI();
  }, [page]);

  useEffect(() => {
    setPageLoading(false);
    toTop();
  }, [apiRes]);

  return (
    <View style={styles.container}>
      <CharComponent
        changeFav={changeFav}
        favorites={favorites}
        RnM_APIresponse={apiRes.results}
        flatListRef={flatListRef}
      />
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  btnContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  invisible: { display: "none" },
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
});

export default CharList;
