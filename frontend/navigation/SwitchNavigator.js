import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CharList from "../screens/CharList";

const screens = {
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  CharList: {
    screen: CharList,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
