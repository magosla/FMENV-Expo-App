import { Slot } from "expo-router";
import React from "react";
import RootLayoutView from "@/views/root-layout-view";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: '(monitor)'
}

export default function RootLayout() {
  return (
    <RootLayoutView>
      <Slot />
      <StatusBar style="auto" animated />
    </RootLayoutView>
  )
}
