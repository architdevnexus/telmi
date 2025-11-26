import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auhtNavigation, mainNavigation } from '../routes';
import { BottomTab } from '../bottom';


const NavigateStack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <NavigateStack.Navigator
      initialRouteName={'splash'}
      screenOptions={{
        headerShown: false,
      }}>
        
      {auhtNavigation.map((item, index) => (
        <NavigateStack.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}
      
      <NavigateStack.Screen
        name="bottom_tab"
        component={BottomTab}
        options={{ headerShown: false }}
      />

      {mainNavigation.map((item, index) => (
        <NavigateStack.Screen
          key={index}
          name={item.name}
          component={item.component}
        />
      ))}

    </NavigateStack.Navigator>
  );
};
