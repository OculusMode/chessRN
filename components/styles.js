import {StyleSheet, Dimensions} from 'react-native'
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modal: {
        // backgroundColor:'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        height: 200,
        // alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    enterButton: {
        // backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center'
    },
    nickNameInput: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    },
    enterButtonText: {
        fontSize: 25
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').width/10,
        width: Dimensions.get('window').width/10
    },
    row: {
        flexDirection: 'row'
    },
    whiteBg: {
        backgroundColor: 'rgb(118,150,86)',
    },
    blackBg: {
        backgroundColor: 'rgb(238,238,210)'
    },
    icon:{
        height: Dimensions.get('window').width/10,
        width: Dimensions.get('window').width/10
    }
})
