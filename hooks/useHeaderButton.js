import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { useColor } from "./useColor";

export const useHeaderButton = ({ headerRight, headerLeft }, dependencies) => {
  const { dark } = useColor();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerRight, headerLeft });
  }, [dark]);
};
