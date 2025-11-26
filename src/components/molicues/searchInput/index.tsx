import React from 'react';
import {
    View,
    TextInput,
    Image,
    StyleSheet,
    TextInputProps,
} from 'react-native';
import { horizontalScale, verticalScale, colors } from '../../../utils';
import { png } from '../../../assets/png';

interface SearchInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChangeText,
    placeholder = 'Search',
    ...rest
}) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder}
                placeholderTextColor="#B0B0B0"
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
            <Image source={png.search} style={styles.searchIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: horizontalScale(15),
        borderWidth: 1,
        borderColor: colors.white,
        marginHorizontal: horizontalScale(16),
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(16),
        marginBottom: verticalScale(12),
    },
    searchInput: {
        flex: 1,
        fontSize: horizontalScale(16),
        color: colors.white,
    },
    searchIcon: {
        width: horizontalScale(24),
        height: horizontalScale(24),
        marginLeft: horizontalScale(8),
    },
});
