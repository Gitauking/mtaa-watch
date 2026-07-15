/*
|--------------------------------------------------------------------------
| Notification Card
|--------------------------------------------------------------------------
*/

import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import AppCard from "../cards/AppCard";

import {
  Colors,
  Typography,
  Spacing,
} from "../../constants";

type NotificationCardProps = {

  title:string;

  message:string;

  time:string;

  onPress?:()=>void;

};

export default function NotificationCard({

  title,

  message,

  time,

  onPress,

}:NotificationCardProps){

  return(

    <TouchableOpacity onPress={onPress}>

      <AppCard>

        <Text style={styles.title}>
          🔔 {title}
        </Text>

        <Text style={styles.message}>
          {message}
        </Text>

        <Text style={styles.time}>
          {time}
        </Text>

      </AppCard>

    </TouchableOpacity>

  );

}

const styles=StyleSheet.create({

  title:{

    fontWeight:"700",

    fontSize:Typography.body,

    color:Colors.text,

  },

  message:{

    marginTop:Spacing.sm,

    color:Colors.textSecondary,

  },

  time:{

    marginTop:Spacing.md,

    fontSize:Typography.small,

    color:Colors.textSecondary,

  },

});