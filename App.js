import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View, TextInput } from "react-native";

const API_KEY = "5e126929af692a4c53feb3ad457f97ab";

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
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Enter City"
      />

      {data ? (
        <>
          <Text>Current temperature : {data.temp}</Text>
          <Text>Humidity : {data.humidity}</Text>
        </>
      ) : (
        <Text>No data</Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
