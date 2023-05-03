module Example.Random where
import Prelude
import Data.Int (toNumber)
import Data.Array ((..), mapWithIndex, sortWith)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as N
import Data.Traversable (traverse)
import Data.Maybe(Maybe(..), fromMaybe)
import Data.Tuple (Tuple(..), fst, snd)
import Effect.Random (random, randomInt)
import Effect (Effect)
import Effect.Aff (Aff)
import Pha.Update (Update, gets, liftEffect, modify_)
import Pha.App (app)
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Events as E
import Pha.Html.Util (pc)


randomPick ∷ ∀a. NonEmptyArray a → Effect a
randomPick array = do
  n <- randomInt 0 (N.length array - 1)
  pure $ fromMaybe (N.head array) (N.index array n)

shuffle ∷ ∀a. Array a → Effect (Array a)
shuffle xs = do
  ys <- traverse (\x -> Tuple x <$> random) xs
  pure $ map fst $ sortWith snd $ ys 


data Card = Ace | Two | Three | Four | Five | Six | Seven | Eight | Nine | Ten | Jack | Queen | King
cards ∷ NonEmptyArray Card
cards = N.cons' Ace [Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Jack, Queen, King]

type Model = {
    dice ∷ Int,
    puzzle ∷ Array Int,
    card ∷ Card
}

data Msg = RollDice | DrawCard | ShufflePuzzle

-- initial state
model ∷ Model
model = {
    dice: 1,
    puzzle: 0 .. 15,
    card: Ace
}

update ∷ Msg → Update Model Msg Aff Unit
update RollDice = do
  n <- liftEffect $ randomInt 1 6
  modify_ _{dice = n}
update DrawCard = do
  card <- liftEffect $ randomPick cards
  modify_ _{card = card}
update ShufflePuzzle = do
  p <- gets _.puzzle
  p2 <- liftEffect $ shuffle p
  modify_ _{puzzle = p2}

viewCard ∷ Card → String
viewCard Ace   = "🂡"
viewCard Two   = "🂢"
viewCard Three = "🂣"
viewCard Four  = "🂤"
viewCard Five  = "🂥"
viewCard Six   = "🂦"
viewCard Seven = "🂧"
viewCard Eight = "🂨"
viewCard Nine  = "🂩"
viewCard Ten   = "🂪"
viewCard Jack  = "🂫"
viewCard Queen = "🂭"
viewCard King  = "🂮"

view ∷ Model → Html Msg
view {dice, puzzle, card} =
  H.div [] 
    [ H.div [H.class' "counter" true] [H.text $ show dice]
    , H.button [E.onClick \_ -> RollDice] [H.text "Roll dice"]

    , H.div [H.style "font-size" "12em" ] [H.text $ viewCard card]
    , H.button [E.onClick \_ -> DrawCard] [H.text "Draw" ]

    , H.div [H.class_ "puzzle"] (
        puzzle # mapWithIndex \i j →
          H.div
            [ H.class' "puzzle-item" true
            , H.style "left" $ pc (0.25 * toNumber (j / 4))
            , H.style "top" $ pc (0.25 * toNumber (j `mod` 4)) 
            ] [H.text $ show i]
          )
    , H.button [E.onClick \_ -> ShufflePuzzle] [H.text "Shuffle"]
    ]

main ∷ Effect Unit
main = app
  { init: {model, msg: Just RollDice}
  , view
  , update
  , selector: "#root"
  }
