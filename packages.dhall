let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.14.1-20210419/packages.dhall sha256:d9a082ffb5c0fabf689574f0680e901ca6f924e01acdbece5eeedd951731375a

let overrides = {=}

let additions =
      { pha =
        { dependencies =
          [ "aff"
          , "free"
          , "web-dom"
          , "web-html"
          , "web-uievents"
          , "unsafe-reference"
          ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "v0.8.1"
        }
      }

in  upstream // overrides // additions
