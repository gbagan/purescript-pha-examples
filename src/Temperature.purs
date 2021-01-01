module Example.Temperature where
import Prelude
import Data.Maybe (maybe)
import Data.Number as Number
import Effect (Effect)
import Pha.App (sandbox)
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P
import Pha.Html.Events as E

type State =
    {   celsius ∷ String
    ,   fahrenheit ∷ String
    }

data Msg = ChangeCelsius String | ChangeFahrenheit String

-- initial state
init ∷ State
init = {celsius: "", fahrenheit: ""}

update ∷ Msg → State → State
update (ChangeCelsius c) = _{ celsius    = c
                            , fahrenheit = Number.fromString c # maybe "" \x → show (x * 9.0 / 5.0 + 32.0)
                            }
update (ChangeFahrenheit f) = _{ celsius    = Number.fromString f # maybe "" \x → show ((x  - 32.0) * 5.0 / 9.0)
                               , fahrenheit = f
                               }

view ∷ State → Html Msg
view {celsius, fahrenheit} = 
    H.div []
    [   H.label []
        [   H.input [P.type_ "text", H.attr "size" "5", E.onvaluechange ChangeCelsius, P.value celsius]
        ,   H.span [] [H.text "°C"]
        ,   H.input [P.type_ "text", H.attr "size" "5", E.onvaluechange ChangeFahrenheit, P.value fahrenheit]
        ,   H.span [] [H.text "°F"]
        ]
    ]

main ∷ Effect Unit
main = sandbox {init, view, update, selector: "#root"}
