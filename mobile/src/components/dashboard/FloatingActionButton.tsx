/*
|--------------------------------------------------------------------------
| Floating Action Button
|--------------------------------------------------------------------------
|
| Used to quickly report a new incident.
|
*/

import React from "react";

import {

  TouchableOpacity,

  StyleSheet,

} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import {
  Colors,
  Spacing,
} from "../../constants";

type FABProps = {

  onPress: () => void;

};

export default function FloatingActionButton({

  onPress,

}: FABProps) {

  return (

    <TouchableOpacity

      style={styles.fab}

      onPress={onPress}

    >

      <Ionicons

        name="add"

        size={30}

        color="white"

      />

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  fab: {

    position: "absolute",

    bottom: 30,

    right: 25,

    width: 65,

    height: 65,

    borderRadius: 35,

    backgroundColor: Colors.primary,

    justifyContent: "center",

    alignItems: "center",

    elevation: 8,

  },

});