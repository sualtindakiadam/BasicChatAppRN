import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageCardProps {
    userEmail: string;
    email: string;
    message: string;
    timestamp: string;
}
const MessageCard: React.FC<MessageCardProps> = ({
    userEmail,
    email,
    message,
    timestamp,
}) => {
    const isCurrentUser = userEmail === email;
    const firstLetter = email ? email.charAt(0).toUpperCase() : '';
    const messageStyle = isCurrentUser ? styles.messageRight : styles.messageLeft;
    const backgroundStyle = isCurrentUser ? styles.backgroundRight : styles.backgroundLeft;
    const textStyle = isCurrentUser ? styles.textRight : styles.textLeft;

    return (
        <View style={[styles.messageCard, { justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }]}>
            {!isCurrentUser && <View style={[styles.backgroundLeft, styles.circle]}>
                <Text style={styles.circleText}>{firstLetter}</Text>
            </View>}
            <View style={styles.messageContainer}>
                <View style={[styles.message, backgroundStyle]}>
                    <Text style={[textStyle, { fontWeight: '700', marginBottom: 5 }]}>{email}</Text>
                    <Text style={[textStyle, { flexWrap: 'wrap' }]}>{message}</Text>
                    <Text style={[textStyle, styles.timestamp]}>{timestamp}</Text>
                </View>
            </View>
            {isCurrentUser && <View style={[styles.backgroundRight, styles.circle]}>
                <Text style={styles.circleText}>{firstLetter}</Text>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    messageCard: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        alignItems: 'center'
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    circleLeft: {
        backgroundColor: 'lightblue',
    },
    circleRight: {
        backgroundColor: 'purple',
    },
    circleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    messageContainer: {
        flexDirection: 'column',
        maxWidth: '70%'
    },
    messageLeft: {
        alignSelf: 'flex-start',
    },
    messageRight: {
        alignSelf: 'flex-end',
    },
    message: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    backgroundLeft: {
        backgroundColor: '#87CEFA',

    },
    backgroundRight: {
        backgroundColor: '#800080',

    },
    textLeft: {
        textAlign: 'left',
    },
    textRight: {
        textAlign: 'right',
        color: 'white',
    },
    timestamp: {
        marginTop: 6,
        fontSize: 13,
        fontWeight: '700'
    },
});

export default MessageCard;
