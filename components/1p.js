import React from 'react'
import { View, Text, Modal, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import { apiTypes, pieceType, defaultGame, images, defaultMoveDetails } from './types'
import styles from './styles'
export default class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: true,
            userName: '',
            status: 'none',
            showCreateGameMenu: 0 /* 1 to create 2 to join*/,
            startGame: false,
            playerMove: 1,
            game: defaultGame,
            tempMovedDetails: defaultMoveDetails
        }
        this.clickedEnterButton.bind(this)
        this.clickedJoinButton.bind(this)
        this.clickedCreateGame.bind(this)
        this.onIconTouch.bind(this)
    }
    componentDidMount() {
        window.navigator.userAgent = 'react-native';
        const io = require('socket.io-client/dist/socket.io');
        this.socket = io('http://192.168.1.105:3000');
        this.socket.on('connect', () => {
            console.log('connected')
            // this.setState({ status: 'COnnected' })
        })

        this.socket.on('disconnect', () => {
            // this.setState({ status: 'DISCOnnected' })
        })
        this.socket.on(apiTypes.pingToStartGame, res => {
            console.log('join')
            
        })
    }


    /****************************** Methods Start ***************************/
    clickedEnterButton = () => {
        if (this.state.showCreateGameMenu == 1)
            this.socket.emit(apiTypes.createRoom, { name: this.state.userName }, res => console.log(res))
        else
            this.socket.emit(apiTypes.joinRoom, { name: this.state.userName }, res => console.log(res))
    }

    clickedJoinButton = () => {
        this.setState({ showCreateGameMenu: 2 })
    }

    clickedCreateGame = () => {
        this.setState({ showCreateGameMenu: 1 })
    }

    onIconTouch = (piece, i, j) => {
        /*
        basically player touches two times,
        first: to select icon,
        second: to move
        */

        let { tempMovedDetails, game, playerMove } = this.state
        
        /**
         * in first time condition will be false as no icon selected yet,
         * after he selects icon and clicks to where to move, we will check further
         */

        //if icon selected
        if (tempMovedDetails.isIconSeleted) {
            //if same button clicked, reset
            if (tempMovedDetails.i == i && tempMovedDetails.j == j)
                this.setState({ tempMovedDetails: defaultMoveDetails })
            else if (game[tempMovedDetails.i][tempMovedDetails.j].type && game[tempMovedDetails.i][tempMovedDetails.j].player == piece.player) {
                /* if i selected black pawn and want to move another piece then select new one as selected*/
                this.setState({
                    tempMovedDetails: { i, j, iconData: piece, isIconSeleted: true }
                })
            } else {
                this.moveIfValid(i, j, tempMovedDetails.i, tempMovedDetails.j)
            }
        } else if (piece.type && piece.player == playerMove)/*if icon not selected yet and touched is not empty this time*/ {
            this.setState({
                tempMovedDetails: { i, j, iconData: piece, isIconSeleted: true }
            })
        }

    }

    move = (newI, newJ, oldI, oldJ) => this.setState((prevState) => {
        //to move icon
        /**
         * P.S. i dont think thats the best way and i hate react compared to vue thanks to this setState bullshit. but fine. Chalao ab.!
         */
        const newArray = prevState.game.slice()
        let dArray = newArray[newI].slice()
        //first put icon on new place, and make sure to say that it is moved
        dArray.splice(newJ, 1, { ...newArray[oldI][oldJ], isYetMoved: true })
        newArray.splice(newI, 1, dArray)
        dArray = newArray[oldI].slice()
        dArray.splice(oldJ, 1, {})
        newArray.splice(oldI, 1, dArray)
        return { game: [...newArray], tempMovedDetails: defaultMoveDetails, playerMove: prevState.playerMove == 0 ? 1 : 0 /* swap playerMove */ }
    })

    moveIfValid = (newI, newJ, oldI, oldJ) => {
        let { game } = this.state
        let piece = game[oldI][oldJ]
        let newPlace = game[newI][newJ]
        let valid = false
        console.log(piece)

        console.log(newPlace)
        //i may make conditions in json as everything is same. the less code the more fun
        switch (piece.type) {
            case pieceType.pawn: {
                /**
                 * if kill => kill in cross
                 * else go straight (if not moved yet, you can take 2 steps at a time)
                 */
                if (piece.player == 0
                    ? newPlace.type
                        ? oldI == newI - 1 && oldJ == newJ + 1 || oldJ == newJ - 1
                        : oldJ == newJ && ( oldI == newI - 1 || !piece.isYetMoved && !game[oldI + 1][oldJ].type && oldI == newI - 2 )
                    : newPlace.type
                        ? oldI == newI + 1 && oldJ == newJ - 1 || oldJ == newJ + 1
                        : oldJ == newJ && ( oldI == newI + 1 || !piece.isYetMoved && !game[oldI - 1][oldJ].type && oldI == newI + 2 )
                ) {
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                
                break
            }
            case pieceType.rook/*hathi*/: {
                if (
                    (/*basic*/oldI == newI && ( /*overlap*/oldJ < newJ ? game[oldI].slice(oldJ + 1, newJ).filter(e => e.type).length == 0 : game[oldI].slice(newJ + 1, oldJ).filter(e => e.type).length == 0))
                    || (/*basic*/oldJ == newJ && ( /*overlap*/oldI < newI ? game.map(e => e[oldJ]).slice(oldI + 1, newI).filter(e => e.type).length == 0 : game.map(e => e[oldJ]).slice(newI + 1, oldI).filter(e => e.type).length == 0))
                ) {
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                break
            }
            case pieceType.bishop: {
                if (
                    (/*Left to right cross*//*basic*/oldI - oldJ == newI - newJ && (/*overlap*/oldI < newI ? game.map((e, i) => e[i - (oldI - oldJ)]).slice(oldI + 1, newI).filter(f => f.type).length == 0 : game.map((e, i) => e[i - (oldI - oldJ)]).slice(newI + 1, oldI).filter(f => f.type).length == 0))
                    || (/*right to left cross*//*basic*/oldI + oldJ == newI + newJ) && (/*overlap*/oldI < newI ? game.map((e, i) => e[oldI + oldJ - i]).slice(oldI + 1, newI).filter(f => f.type).length == 0 : game.map((e, i) => e[oldI + oldJ - i]).slice(newI + 1, oldI).filter(f => f.type).length == 0)
                ) {
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                break
            }
            case pieceType.knight: {
                if (
                    (
                        (newI == oldI + 2 || newI == oldI - 2 /* two steps up or down*/)
                        && (newJ == oldJ - 1 || newJ == oldJ + 1 /* one step right or left*/)
                    ) ||
                    (
                        (newJ == oldJ + 2 || newJ == oldJ - 2 /* two steps left or right*/)
                        && (newI == oldI - 1 || newI == oldI + 1 /* one step up or down*/)
                    )
                ) {
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                break
            }
            case pieceType.queen: {
                //rook + bishop
                if (
                    //rook
                    (/*basic*/oldI == newI && ( /*overlap*/oldJ < newJ ? game[oldI].slice(oldJ + 1, newJ).filter(e => e.type).length == 0 : game[oldI].slice(newJ + 1, oldJ).filter(e => e.type).length == 0))
                    || (/*basic*/oldJ == newJ && ( /*overlap*/oldI < newI ? game.map(e => e[oldJ]).slice(oldI + 1, newI).filter(e => e.type).length == 0 : game.map(e => e[oldJ]).slice(newI + 1, oldI).filter(e => e.type).length == 0))
                    //bishop
                    || (/*Left to right cross*//*basic*/oldI - oldJ == newI - newJ && (/*overlap*/oldI < newI ? game.map((e, i) => e[i - (oldI - oldJ)]).slice(oldI + 1, newI).filter(f => f.type).length == 0 : game.map((e, i) => e[i - (oldI - oldJ)]).slice(newI + 1, oldI).filter(f => f.type).length == 0))
                    || (/*right to left cross*//*basic*/oldI + oldJ == newI + newJ) && (/*overlap*/oldI < newI ? game.map((e, i) => e[oldI + oldJ - i]).slice(oldI + 1, newI).filter(f => f.type).length == 0 : game.map((e, i) => e[oldI + oldJ - i]).slice(newI + 1, oldI).filter(f => f.type).length == 0)
                ) {
                    console.log('perfect')
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    console.log('not perfect')
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                break
            }
            case pieceType.king: {
                if (oldI == newI - 1 || oldI == newI + 1 || oldJ == newJ - 1 || oldJ == newJ + 1) {
                    this.move(newI, newJ, oldI, oldJ)
                } else {
                    this.setState({ tempMovedDetails: defaultMoveDetails })
                }
                break
            }
        }
    }
    /****************************** Methods End ***************************/

    renderGame() {
        let { game } = this.state
        return (
            <View style={styles.container}>
                {
                    game.map((col, i) =>
                        <View key={i} style={styles.row}>
                            {
                                col.map((row, j) =>
                                    <TouchableHighlight onPress={this.onIconTouch.bind(this, row, i, j)} key={i * 8 + j} style={[styles.column, (i + j) % 2 == 0 ? styles.whiteBg : styles.blackBg]}>
                                        <View>
                                            {
                                                row.type &&
                                                <Image
                                                    style={styles.icon}
                                                    source={images[row.type][row.player]}
                                                />
                                            }
                                        </View>
                                    </TouchableHighlight>
                                )
                            }
                        </View>
                    )
                }
            </View>
        )
    }


    createMenuComponents = () =>
        <View>
            <TextInput
                placeholderTextColor='rgba(255,255,255,0.5)'
                style={styles.nickNameInput}
                placeholder={this.state.showCreateGameMenu == 1 ? 'Whats your nickName?' : 'Enter your friend\'s nickname'}
                onChangeText={userName => this.setState({ userName })}
                value={this.state.userName}
            />
            <TouchableOpacity
                style={styles.enterButton}
                onPress={this.clickedEnterButton}>
                <Text style={styles.enterButtonText}>let's enter</Text>
            </TouchableOpacity>
        </View>


    render() {
        let { modalVisible, userName, showCreateGameMenu } = this.state
        return (<View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                style={styles.modal}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('close')
                }}>
                <View style={styles.modalView}>
                    <View>
                        <TouchableOpacity
                            style={styles.enterButton}
                            onPress={this.clickedJoinButton}>
                            <Text style={styles.enterButtonText}>Join Game</Text>
                        </TouchableOpacity><TouchableOpacity
                            style={styles.enterButton}
                            onPress={this.clickedCreateGame}>
                            <Text style={styles.enterButtonText}>Create Game</Text>
                        </TouchableOpacity>
                        {
                            showCreateGameMenu != 0 && this.createMenuComponents()
                        }
                    </View>
                </View>
            </Modal>
        </View>)
    }
}

