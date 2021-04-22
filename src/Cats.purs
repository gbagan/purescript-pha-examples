module Example.Cats where
import Prelude hiding (div)
import Data.Maybe (Maybe(..))
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Aff.Class (liftAff)
import Affjax as AX
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut.Decode (decodeJson, (.:))
import Pha.App (app)
import Pha.Update (Update, modify_)
import Pha.Html (Html, text, style, div, h2, button, img)
import Pha.Html.Attributes (src)
import Pha.Html.Events (onClick)

data State = Failure | Loading | Success String

data Msg = RequestCat

-- initial state
state ∷ State
state = Loading

update ∷ Msg → Update State Unit
update RequestCat = do
    modify_ (const Loading)
    res ← liftAff $ AX.get ResponseFormat.json "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cat"
    let status = case res of
                    Left _  → Failure
                    Right response → do
                        case decodeJson response.body >>= (_ .: "data") >>= (_ .: "image_url") of
                            Left _ → Failure
                            Right url → Success url

    modify_ (const status)

view ∷ State → Html Msg
view st =   
    div [] 
    [   h2 [] [text "Random Cats"]
    ,   viewGif st
    ]

viewGif ∷ State → Html Msg
viewGif Failure =
    div [] 
    [   text "I could not load a random cat for some reason. "
    ,   button [onClick RequestCat] [ text "Try Again!" ]
    ]
viewGif Loading = text "Loading..."
viewGif (Success url) =
    div [] 
    [   button [ onClick RequestCat, style "display" "block" ] [ text "More Please!" ]
    ,   img [ src url ] []
    ]

main ∷ Effect Unit
main = app 
    {   init: {state, action: Just RequestCat}
    ,   view
    ,   update
    ,   subscriptions: []
    ,   selector: "#root"
    }
