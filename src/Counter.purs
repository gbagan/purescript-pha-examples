module Example.Counter
  where
import Prelude hiding (div)
import Effect (Effect)
import Pha.Html (Html)
import Pha.App (sandbox)
import Pha.Html as H
import Pha.Html.Events as E

type Model = Int
data Msg = Increment | Decrement

init ∷ Model
init = 0

update ∷ Msg → Model → Model
update Increment n = n + 1
update Decrement n = n - 1

view ∷ Model → Html Msg
view counter = 
  H.div []
    [ H.button [E.onClick \_ → Decrement] [H.text "-"]
    , H.span [] [H.text $ show counter]
    , H.button [E.onClick \_ → Increment] [H.text "+"]
    ]

main ∷ Effect Unit
main = sandbox {init, update, view, selector: "#root"}