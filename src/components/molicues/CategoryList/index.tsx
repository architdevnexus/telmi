import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  ListRenderItem,
} from 'react-native';
import {png} from '../../../assets/png';
import {colors} from '../../../utils';

// Define type for each category item
interface CategoryItem {
  id: 'Sports' | 'Music' | 'Pop Culture' | 'Gaming' | 'TV/Films' | 'Politics';
  iconName: ImageSourcePropType;
}

interface CategoryListProps {
  data: CategoryItem[];
  setSelectedCategory: (categoryId: CategoryItem['id'] | 'All') => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  data,
  setSelectedCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<
    CategoryItem['id'] | null
  >(null);

  const handleCategoryPress = (id: CategoryItem['id']) => {
    const newActiveCategory = id === activeCategory ? 'All' : id;
    setActiveCategory(id === activeCategory ? null : id);
    setSelectedCategory(newActiveCategory);
  };

  const renderItem: ListRenderItem<CategoryItem> = ({item}) => {
    const isActive = activeCategory === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleCategoryPress(item.id)}>
          <ImageBackground
            source={png.iconBg}
            style={[
              styles.imageBackground,
              {borderColor: isActive ? colors.white : colors.black},
            ]}>
            <Image source={item.iconName} style={styles.icon} />
          </ImageBackground>
        </TouchableOpacity>
        <Text
          style={[
            styles.label,
            {color: isActive ? colors.white : colors.lightBlack},
          ]}>
          {item.id}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  imageBackground: {
    height: 50,
    width: 50,
    marginBottom: 10,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 18,
  },
});
