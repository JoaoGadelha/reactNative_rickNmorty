import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class CharList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CharList</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CharList