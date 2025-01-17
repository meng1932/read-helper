import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { HapticTab } from '@/components/common/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TABS } from '@/types';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookshelf"
        options={{
          title: 'Bookshelf',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name={TABS.PHYSICAL_BOOK}
        options={{
          title: 'Book',
          tabBarIcon: ({ color }) => <Feather name="book-open" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name={TABS.LIBBY}
        options={{
          title: 'Libby',
          tabBarIcon: ({ color }) => <MaterialIcons name="face" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name={TABS.WEREAD}
        options={{
          title: 'Weread',
          tabBarIcon: ({ color }) => <FontAwesome name="wechat" size={28} color={color} />
        }}
      />
    </Tabs>
  );
}
