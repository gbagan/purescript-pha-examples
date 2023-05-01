module Example.Cats where
import Prelude hiding (div)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff.Class (liftAff)
import Fetch (fetch)
import Fetch.Argonaut.Json (fromJson)
import Pha.App (app)
import Pha.Update (Update, put)
import Pha.Html (Html, text, style, div, h2, button, img)
import Pha.Html.Attributes (src)
import Pha.Html.Events (onClick)

data Model = Failure | Loading | Success String

data Msg = RequestCat

-- initial model
init ∷ Model
init = Loading

type Response = { data :: { image_url :: String } }

update ∷ Msg → Update Model Msg Aff Unit
update RequestCat = do
  put Loading
  {status, json} ← liftAff $ fetch "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat" {}
  if status /= 200 
  then
    put Failure
  else do
    { data: { image_url } } :: Response <- liftAff $ fromJson json
    put $ Success image_url

view ∷ Model → Html Msg
view model =   
  div [] 
    [ h2 [] [text "Random Cats"]
    , viewGif model
    ]

viewGif ∷ Model → Html Msg
viewGif Failure =
  div [] 
    [ text "I could not load a random cat for some reason. "
    , button [onClick \_ → RequestCat] [ text "Try Again!" ]
    ]
viewGif Loading = text "Loading..."
viewGif (Success url) =
  div [] 
    [ button [ onClick \_ → RequestCat, style "display" "block" ] [ text "More Please!" ]
    , img [ src url ] []
    ]

main ∷ Effect Unit
main = app 
  { init: {model: init, msg: Just RequestCat}
  , view
  , update
  , eval: identity
  , selector: "#root"
  }
