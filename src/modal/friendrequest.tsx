import React from "react";
import {
    Modal,
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import { colors } from "../utils";
import { verticalScale, horizontalScale, width } from "../utils";
import { AcceptButton, DeclineButton } from "../components/atoms";

interface FriendRequestProps {
    visible: boolean;
    onAccept: () => void;
    onDecline: () => void;
    userName: string;
    profileImage: string;
}

export const FriendRequest: React.FC<FriendRequestProps> = ({
    visible,
    onAccept,
    onDecline,
    userName,
    profileImage
}) => {
    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Image source={{ uri: profileImage }} style={styles.avatar} />
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.message}>Want to be your Friend</Text>
                    <View style={styles.buttonsContainer}>
                        <AcceptButton onPress={onAccept} title="Accept" />
                        <DeclineButton onPress={onDecline} title="Decline" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: width * 0.8,
        backgroundColor: colors.white,
        borderRadius: horizontalScale(20),
        padding: horizontalScale(24),
        alignItems: "center",
        elevation: 10
    },
    avatar: {
        width: horizontalScale(80),
        height: horizontalScale(80),
        borderRadius: horizontalScale(40),
        marginBottom: verticalScale(16),
    },
    userName: {
        fontSize: horizontalScale(20),
        fontWeight: "bold",
        color: colors.black,
        marginBottom: verticalScale(4)
    },
    message: {
        fontSize: horizontalScale(16),
        color: colors.black,
        marginBottom: verticalScale(24)
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: horizontalScale(16)
    },
    acceptButton: {
        flex: 1,
        backgroundColor: colors.green,
        paddingVertical: verticalScale(12),
        borderRadius: horizontalScale(12),
        alignItems: "center"
    },
    declineButton: {
        flex: 1,
        borderWidth: 2,
        borderColor: colors.green,
        paddingVertical: verticalScale(12),
        borderRadius: horizontalScale(12),
        alignItems: "center"
    },
    acceptText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: horizontalScale(16)
    },
    declineText: {
        color: colors.green,
        fontWeight: "bold",
        fontSize: horizontalScale(16)
    }
});
