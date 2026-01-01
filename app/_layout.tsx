import { Slot, useLocalSearchParams } from "expo-router";
import React from "react";
import RootLayoutView from "@/views/root-layout-view";

export const unstable_settings = {
  initialRouteName: 'index'
}

export default function RootLayout() {
  const { monitorId } = useLocalSearchParams<{ monitorId: string }>()

  return (
    <RootLayoutView monitorId={monitorId}>
      <Slot />
    </RootLayoutView>
  )
}
