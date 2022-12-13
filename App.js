import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";

const API_KEY = "5e126929af692a4c53feb3ad457f97ab";
const img = require("./assets/wt2.webp");

export default function App() {
  const [text, setText] = useState("");

  const [data, setData] = useState(null);

  function getWeatherData(query) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_KEY}`;

    fetch(BASE_URL)
      .then((response) => response.json())
      .then((newdata) => setData(newdata.main))
      .catch((err) => console.log(err));
    
     
  }

  useEffect(() => {
    getWeatherData(text);
  }, [text]);
 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weather Recognition</Text>
      </View>
      <ImageBackground source={img} style={styles.image}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Enter City"
        />

        <View style={styles.result}>
          {data? (
            <>
              <Text>Current temperature : {data.temp} </Text>
              <Text>Humidity : {data.humidity}</Text>
            </>
          ) : (
            <Text>No data</Text>
          )}
        </View>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#FCF5DB",
    //paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#C5D2EF",
  },
  headerTitle: {
    fontSize: 29,
    fontWeight: "bold",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },

  input: {
    marginTop: 100,
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  result: {
    marginTop: 80,
    borderWidth: 2,
    width: 200,
  },
});
