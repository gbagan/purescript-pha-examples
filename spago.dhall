{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "purescript-pha-examples"
, dependencies = [ "affjax", "argonaut", "numbers", "pha", "random" ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
