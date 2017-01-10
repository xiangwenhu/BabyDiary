import React from 'react'
import {
    Text,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'

export default {
    LeftButton(route, navigator, index) {
        if (index > 0) {
            return (
                <TouchableHighlight style={{ marginTop: 10 }} onPress={() => {
                    if (index > 0) {
                        navigator.pop()
                    }
                } }>
                    <Text>Back</Text>
                </TouchableHighlight>
            )
        } else {
            return null
        }
    },

    RightButton() {
        return null
    },

    Title() {
        return (
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: 'white', margin: 10, fontSize: 16 }}>                   
                </Text>
            </TouchableOpacity>
        )
    }
}