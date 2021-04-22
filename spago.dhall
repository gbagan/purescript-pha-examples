{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "purescript-pha-examples"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut"
  , "argonaut-codecs"
  , "arrays"
  , "datetime"
  , "effect"
  , "either"
  , "foldable-traversable"
  , "integers"
  , "maybe"
  , "numbers"
  , "pha"
  , "prelude"
  , "random"
  , "tuples"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
