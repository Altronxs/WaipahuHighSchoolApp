import { Tabs } from "expo-router";
import React from "react";
import { Image, Text } from "react-native";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0b0b49",
        },
      }}
    >
      <Tabs.Screen
        name="student"
        options={{
          title: "Students",
          tabBarActiveTintColor: "#ae8c52",
          headerShown: false,
          tabBarLabel: ({ focused }) => <Text className="hidden"></Text>,
          tabBarStyle: {
            backgroundColor: "#0b0b49",
          },
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={require("@/assets/images/whs-info.png")}
                tintColor={focused ? "#ae8c52" : "#ffffff"}
                className="size-8 mt-6"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: "#ae8c52",
          headerShown: false,
          tabBarLabel: ({ focused }) => <Text className="hidden"></Text>,
          tabBarStyle: {
            backgroundColor: "#0b0b49",
          },
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={require("@/assets/images/whs-home.png")}
                tintColor={focused ? "#ae8c52" : "#ffffff"}
                className="size-8 mt-6"
              />

              {/**<ImageBackground source={require('@/assets/images/home.png')} className='size-28 border-4 rounded-full border-whs-gold mb-5'></ImageBackground>**/}
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Campus",
          tabBarActiveTintColor: "#ae8c52",
          headerShown: false,
          tabBarLabel: ({ focused }) => <Text className="hidden"></Text>,
          tabBarStyle: {
            backgroundColor: "#0b0b49",
          },
          tabBarIcon: ({ focused }) => (
            <>
              <Image
                source={require("@/assets/images/whs-map.png")}
                tintColor={focused ? "#ae8c52" : "#ffffff"}
                className="size-8 mt-6"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="cafe"
        options={{
          title: "Cafe",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="bell"
        options={{
          title: "Bell",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          title: "Calender",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="vision"
        options={{
          title: "Vision",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: "News",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="athletics"
        options={{
          title: "Athletics",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="student"
        options={{
          title: "Student",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      /> */}
      <Tabs.Screen
        name="clubs"
        options={{
          title: "Clubs",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="registrar"
        options={{
          title: "Registrar",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="author"
        options={{
          title: "Author",
          href: null, // hides from tab bar
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _Layout;
