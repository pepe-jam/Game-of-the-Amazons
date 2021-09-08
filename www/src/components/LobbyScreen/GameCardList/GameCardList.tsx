import {Component} from "react";
import {BasicGame, Player} from "../../../requests";
import {GameCard} from "./GameCard";
import {Scrollbars} from "react-custom-scrollbars";


interface Props {
    gamesList: BasicGame[]
    localPlayer: Player
}

interface State {
}

export class GameCardList extends Component<Props, State> {
    private yourGames: BasicGame[] = this.getYourGames()

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.gamesList.length !== this.props.gamesList.length) { // this will cause problems when many users
            this.yourGames = this.getYourGames()
        }
    }

    render() {
        return (
            <div className={"games"}>
                <div className={"title"}>
                    <h2>Your Games</h2>
                </div>
                <div className={"card-list"}>
                    <Scrollbars id={"scroll"} autoHide={true} autoHideTimeout={1500}>
                        {this.getGameCards()}
                        <div className={"game-card"}> {/*TODO remove game card*/}
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 1`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 2`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 3`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 4`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 5`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 6`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 7`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                        <div className={"game-card"}>
                            <span>{`PEPEGO VS PEPEGA`}</span>
                            <span>{`Game 7`}</span>
                            <span>{"Still in progress..."}</span>
                        </div>
                    </Scrollbars>
                </div>
                <div className={"new-game-button"}>
                    <button onClick={this.handleClick}>New Game</button>
                </div>
            </div>
        )
    }


    private handleClick = () => {
        // TODO
    }


    private getGameCards(): JSX.Element[] {
        return this.yourGames.map((yourGame, index) => {
            const winningPlayer: Player | undefined = this.getPlayerById(yourGame.players, yourGame.winningPlayer)
            return <GameCard key={"gameCard" + index} players={yourGame.players} winningPlayer={winningPlayer}/>
        })
    }

    private getYourGames(): BasicGame[] {
        let yourGames: BasicGame[] = []
        for (let game of this.props.gamesList) {
            for (let player of game.players) if (player.id === this.props.localPlayer.id) {
                yourGames.push(game)
                break
            }
        }
        return yourGames
    }

    /* Helper functions */

    private getPlayerById(players: Player[], id?: number): Player | undefined {
        if (id === undefined) return undefined
        else return players[0].id === id ? players[0] : players[1]
    }
}