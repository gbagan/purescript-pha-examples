let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.13.8-20201223/packages.dhall sha256:a1a8b096175f841c4fef64c9b605fb0d691229241fd2233f6cf46e213de8a185

let overrides = {=}

let additions =
      { pha =
        { dependencies = [ "aff", "free", "web-dom", "web-html", "web-uievents", "unsafe-reference" ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "v0.8.1"
        }
      }

in  upstream // overrides // additions
