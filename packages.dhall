let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.8-20230430/packages.dhall
        sha256:007f16aff737b37041e2f387f906ea711c85afc19b898e9f4986ec85cb96efc4

let overrides = {=}

let additions =
      { pha =
        { dependencies =
          [ "aff"
          , "free"
          , "web-dom"
          , "web-html"
          , "web-uievents"
          , "web-pointerevents"
          , "unsafe-reference"
          ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "master"
        }
      }

in  upstream // overrides // additions
