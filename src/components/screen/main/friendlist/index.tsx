import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
import { FriendCard, SearchInput } from '../../../molicues';
import { colors } from '../../../../utils';
import { verticalScale, horizontalScale, width, height, platform } from '../../../../utils';
import { png } from '../../../../assets/png';
import { instance } from '../../../../api';
import debounce from 'lodash/debounce';

interface Friend {
    id: string;
    name: string;
    image: string;
}

export const FriendList: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch friends from API
    const fetchFriends = async (query: string = '') => {
        setLoading(true);
        setError(null);
        try {
            const response = await instance.get<Friend[]>('api/friends/list', {
                params: { search: query }, // if backend supports search
            });
            if (response.status === 200) {
                setFriends(response.data); // adjust if API wraps data
            } else {
                setError('Failed to load friends.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching friends.');
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const debouncedSearch = useCallback(debounce((query: string) => fetchFriends(query), 500), []);

    useEffect(() => {
        fetchFriends(); // initial fetch
        return () => {
            debouncedSearch.cancel(); // cleanup debounce
        };
    }, []);

    useEffect(() => {
        debouncedSearch(search);
    }, [search]);

    const handleRemove = (id: string) => {
        setFriends(prev => prev.filter(friend => friend.id !== id));
    };

    const handleMessage = (name: string) => {
        console.log('Message to:', name);
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={colors.white} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={{ color: colors.white }}>{error}</Text>
            </View>
        );
    }

    return (
        <ImageBackground source={png.bg} style={styles.container}>
            <SearchInput value={search} onChangeText={setSearch} />
            <Text style={styles.title}>Friends</Text>
            <FlatList
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <FriendCard
                        name={item.name}
                        image={item.image}
                        onRemove={() => handleRemove(item.id)}
                        onMessage={() => handleMessage(item.name)}
                        actionUri={""}
                        messageUri={""}

                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No friends found.</Text>
                }
                contentContainerStyle={{ paddingBottom: verticalScale(20) }}
                showsVerticalScrollIndicator={false}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        paddingTop: platform === 'ios' ? '15%' : '10%',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.white,
        fontSize: horizontalScale(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    emptyText: {
        color: colors.white,
        textAlign: 'center',
        marginTop: verticalScale(20),
    },
});
