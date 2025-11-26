import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    TextInput,
    View,
    FlatList,
    Platform,
    Alert,
    Linking,
} from "react-native";

import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    MediaStream,
    RTCView,
} from "@videosdk.live/react-native-sdk";
import { JoinScreen } from "./join";

import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';



const Button = ({ onPress, buttonText, backgroundColor }: any) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
                borderRadius: 4,
            }}
        >
            <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
        </TouchableOpacity>
    );
};


function ControlsContainer({ join, leave, toggleWebcam, toggleMic }: any) {
    return (
        <View
            style={{
                padding: 24,
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <Button
                onPress={join}
                buttonText={"Join"}
                backgroundColor={"#1178F8"}
            />
            <Button
                onPress={() => {
                    toggleWebcam();
                }}
                buttonText={"Toggle Webcam"}
                backgroundColor={"#1178F8"}
            />
            <Button
                onPress={() => {
                    toggleMic();
                }}
                buttonText={"Toggle Mic"}
                backgroundColor={"#1178F8"}
            />
            <Button
                onPress={() => {
                    leave();
                }}
                buttonText={"Leave"}
                backgroundColor={"#FF0000"}
            />
        </View>
    );
}
function ParticipantView({ participantId }: any) {

    const { webcamStream, webcamOn, isLocal, displayName } = useParticipant(participantId);
    console.log({ participantId, isLocal, webcamStream, webcamOn, displayName });

    return webcamOn && webcamStream ? (
        <RTCView
            streamURL={new MediaStream([webcamStream.track]).toURL()}
            objectFit={'cover'}
            mirror={true}
            zOrder={1}
            style={{
                height: 300,
                marginVertical: 8,
                marginHorizontal: 8,
            }}
        />
    ) : (
        <View
            style={{
                backgroundColor: "grey",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
        </View>
    );
}

function ParticipantList({ participants }: any) {
    return participants.length > 0 ? (
        <FlatList
            data={participants}
            renderItem={({ item }) => {
                return <ParticipantView participantId={item} />;
            }}
        />
    ) : (
        <View
            style={{
                flex: 1,
                backgroundColor: "#F6F6FF",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 20 }}>Press Join button to enter meeting.</Text>
        </View>
    );
}

function MeetingView() {
    const { join, leave, toggleWebcam, toggleMic, participants, localParticipant } = useMeeting({});
    const participantsArrId = [...participants.keys()];

    // Add this useEffect to enable webcam when localParticipant is available
    useEffect(() => {
        if (localParticipant && typeof localParticipant.enableWebcam === 'function') {
            localParticipant.enableWebcam();
            console.log("Webcam enabled");
        }
    }, [localParticipant]);

    const requestPermissions = async () => {
        try {
            // Define permissions based on platform
            const permissions = Platform.select({
                ios: [
                    PERMISSIONS.IOS.CAMERA,
                    PERMISSIONS.IOS.MICROPHONE
                ],
                android: [
                    PERMISSIONS.ANDROID.CAMERA,
                    PERMISSIONS.ANDROID.RECORD_AUDIO
                ]
            }) || [];

            // Check all permissions first
            const permissionStatuses = await Promise.all(
                permissions.map(permission => check(permission))
            );

            // Request any permissions that aren't granted
            const permissionResults = await Promise.all(
                permissions.map(async (permission, index) => {
                    if (permissionStatuses[index] !== RESULTS.GRANTED) {
                        return request(permission);
                    }
                    return permissionStatuses[index];
                })
            );

            // Check if all permissions were granted
            const allGranted = permissionResults.every(
                result => result === RESULTS.GRANTED
            );

            if (!allGranted) {
                Alert.alert(
                    "Permissions Required",
                    "Camera and microphone permissions are required for video calling. Please enable them in your device settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { 
                            text: "Open Settings",
                            onPress: () => {
                                if (Platform.OS === 'ios') {
                                    Linking.openURL('app-settings:');
                                } else {
                                    Linking.openSettings();
                                }
                            }
                        }
                    ]
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error("Error requesting permissions:", error);
            Alert.alert(
                "Permission Error",
                "There was an error requesting permissions. Please try again.",
                [{ text: "OK" }]
            );
            return false;
        }
    };

    const handleJoinRoom = async () => {
        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) {
            return;
        }
        try {
            join();
            console.log("Joined meeting");
            // Removed direct call to localParticipant.enableWebcam()
        } catch (error) {
            console.error("Error joining meeting:", error);
            Alert.alert(
                "Error",
                "Failed to join the meeting. Please try again.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ParticipantList participants={participantsArrId} />
            <ControlsContainer
                join={handleJoinRoom}
                leave={leave}
                toggleWebcam={toggleWebcam}
                toggleMic={toggleMic}
            />
        </View>
    );
}

export const GoLive = () => {
    const [meetingId, setMeetingId] = useState(null);

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkMjFkOGVjYy01YmJjLTRiZGUtYmE5OC0wZWU5MzIwMTYyMzkiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NzE2MzQ1MCwiZXhwIjoxOTA0OTUxNDUwfQ.9M80GqcUoRWPSCgbjItJ578Gb4zz4ZVVTPfHd1Ydymo";

    // --- Add this useEffect to force permission request on mount ---
    useEffect(() => {
        const requestPermissions = async () => {
            try {
                const permissions = Platform.select({
                    ios: [
                        PERMISSIONS.IOS.CAMERA,
                        PERMISSIONS.IOS.MICROPHONE
                    ],
                    android: [
                        PERMISSIONS.ANDROID.CAMERA,
                        PERMISSIONS.ANDROID.RECORD_AUDIO
                    ]
                }) || [];
                await Promise.all(
                    permissions.map(async (permission) => {
                        await request(permission);
                    })
                );
            } catch (error) {
                console.error("Error requesting permissions on mount:", error);
            }
        };
        requestPermissions();
    }, []);
    // --- End of useEffect ---


    const createMeeting = async ({ token }: any) => {
        const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
            method: "POST",
            headers: {
                authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

        const { roomId } = await res.json();
        return roomId;
    };

    const getMeetingId = async (id: any) => {
        const meetingId = id == null ? await createMeeting({ token }) : id;
        setMeetingId(meetingId);
    };

    return meetingId ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
            <MeetingProvider
                config={{
                    meetingId,
                    micEnabled: true,
                    webcamEnabled: true,
                    name: "Test User",
                    maxResolution: 'hd',
                }}
                token={token}
            >
                <MeetingView />
            </MeetingProvider>
        </SafeAreaView>
    ) : (
        <JoinScreen getMeetingId={getMeetingId} />
    );
}