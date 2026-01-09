import { Slot } from "expo-router";
import React from "react";
import RootLayoutView from "@/views/root-layout-view";

export const unstable_settings = {
  initialRouteName: 'index'
}

export default function RootLayout() {
  return (
    <RootLayoutView>
      <Slot />
    </RootLayoutView>
  )
}
