import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { RootStackParamList } from '@/navigation/app-navigator.types';

import { HomeMetricWidget } from './components';
import { useHome } from './home.hook';
import { styles } from './home.styles';

export const HomeScreen = () => {
  const { t, avatarUri, widgetsConfig } = useHome();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderWidget = useCallback(
    ({ item }: { item: (typeof widgetsConfig)[number] }) => (
      <View style={styles.widgetWrapper}>
        <HomeMetricWidget {...item} />
      </View>
    ),
    [],
  );

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text variant="h1" colorType="main">
            {t('Home.greeting', 'Hello!')}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.avatarWrapper}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.userAvatar} />
            ) : (
              <Ionicons name="person-outline" style={styles.avatarIcon} />
            )}
          </Pressable>
        </View>
        <FlatList
          data={widgetsConfig}
          keyExtractor={item => item.id}
          numColumns={3}
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          renderItem={renderWidget}
        />
      </View>
    </Screen>
  );
};
