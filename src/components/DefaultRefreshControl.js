import React from "react";
import { RefreshControl } from "react-native";
import { colors } from "../config";

const getRefreshControl = (refreshing, onRefresh) => (
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
    tintColor={colors.primaryBg}
    colors={[colors.primaryBg]}
    progressBackgroundColor="#fff"
  />
);


export default getRefreshControl