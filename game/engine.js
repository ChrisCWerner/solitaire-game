// Game Engine
import Solitaire from "./schemes/solitaire.js"

const GameEngine = () => {
  const solitaire = Solitaire()
  solitaire.newGame()
  return solitaire
}

export default GameEngine
