(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map13 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map13(f)(fa);
      };
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map7 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map7($$const(identity2))(a))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure1 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure1(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure1 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure1(f))(a);
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Show/foreign.js
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  function fromStringImpl(str, isFinite2, just, nothing) {
    var num = parseFloat(str);
    if (isFinite2(num)) {
      return just(num);
    } else {
      return nothing;
    }
  }

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
  };

  // output/Control.Bind/index.js
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$new = _new;

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure3 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr2 = foldr(dictFoldable);
      return function(f) {
        return foldr2(function($454) {
          return applySecond2(f($454));
        })(pure3(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_1(dictFoldable));
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty2;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map7) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map7(array1)(f(array[bot]));
                  case 2:
                    return apply2(map7(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map7(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map7(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler(error2) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error2) {
        setTimeout(function() {
          throw error2;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error2) {
        return left(error2);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error2) {
        k(left(error2))();
        return nonCanceler;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size3 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size3 !== 0) {
          size3--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i, tmp;
          if (size3 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size3) % limit] = cb;
          size3++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error2) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step2 = aff;
      var fail = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run2(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step2 = bhead(step2);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail = util.left(e);
                step2 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step2)) {
                status = RETURN;
                fail = step2;
                step2 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step2 = util.fromRight(step2);
              }
              break;
            case CONTINUE:
              switch (step2.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step2._2;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step2 = util.right(step2._1);
                  } else {
                    status = STEP_BIND;
                    step2 = step2._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step2 = runSync(util.left, util.right, step2._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step2 = runAsync(util.left, step2._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step2 = result2;
                        run2(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail = util.left(step2._1);
                  step2 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step2, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step2, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step2 = step2._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step2._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step2._1) {
                    tmp.run();
                  }
                  step2 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step2 = sequential2(util, supervisor, step2._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step2 = interrupt || fail || step2;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail) {
                      status = CONTINUE;
                      step2 = attempt._2(util.fromLeft(fail));
                      fail = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step2 = util.fromRight(step2);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail === null) {
                      result = util.fromRight(step2);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step2 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step2 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail) {
                      step2 = attempt._1.failed(util.fromLeft(fail))(attempt._2);
                    } else {
                      step2 = attempt._1.completed(util.fromRight(step2))(attempt._2);
                    }
                    fail = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step2, fail), attempts, interrupt);
                    status = CONTINUE;
                    step2 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step2 = attempt._1;
                    fail = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step2));
                }
              }
              joins = null;
              if (interrupt && fail) {
                setTimeout(function() {
                  throw util.fromLeft(fail);
                }, 0);
              } else if (util.isLeft(step2) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step2);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join3) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join3.rethrow;
            join3.handler(step2)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join3;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill(error2, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error2);
              status = COMPLETED;
              step2 = interrupt;
              run2(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step2(error2)), attempts, interrupt);
                }
                status = RETURN;
                step2 = null;
                fail = null;
                run2(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error2);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step2 = null;
                fail = null;
              }
          }
          return canceler;
        };
      }
      function join2(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run2(runTick);
          }
          return canceler;
        };
      }
      return {
        kill,
        join: join2,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run2(runTick);
              });
            } else {
              run2(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill(error2, par2, cb2) {
        var step2 = par2;
        var head = null;
        var tail = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step2.tag) {
              case FORKED:
                if (step2._3 === EMPTY) {
                  tmp = fibers[step2._1];
                  kills2[count++] = tmp.kill(error2, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head === null) {
                  break loop;
                }
                step2 = head._2;
                if (tail === null) {
                  head = null;
                } else {
                  head = tail._1;
                  tail = tail._2;
                }
                break;
              case MAP:
                step2 = step2._2;
                break;
              case APPLY:
              case ALT:
                if (head) {
                  tail = new Aff2(CONS, head, tail);
                }
                head = step2;
                step2 = step2._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join2(result, head, tail) {
        var fail, step2, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail = result;
          step2 = null;
        } else {
          step2 = result;
          fail = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head === null) {
              cb(fail || step2)();
              return;
            }
            if (head._3 !== EMPTY) {
              return;
            }
            switch (head.tag) {
              case MAP:
                if (fail === null) {
                  head._3 = util.right(head._1(util.fromRight(step2)));
                  step2 = head._3;
                } else {
                  head._3 = fail;
                }
                break;
              case APPLY:
                lhs = head._1._3;
                rhs = head._2._3;
                if (fail) {
                  head._3 = fail;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, fail === lhs ? head._2 : head._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join2(fail, null, null);
                      } else {
                        join2(fail, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step2 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head._3 = step2;
                }
                break;
              case ALT:
                lhs = head._1._3;
                rhs = head._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail = step2 === lhs ? rhs : lhs;
                  step2 = null;
                  head._3 = fail;
                } else {
                  head._3 = step2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill(early, step2 === lhs ? head._2 : head._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join2(step2, null, null);
                      } else {
                        join2(step2, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail === null) {
              head = null;
            } else {
              head = tail._1;
              tail = tail._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join2(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run2() {
        var status = CONTINUE;
        var step2 = par;
        var head = null;
        var tail = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step2.tag) {
                  case MAP:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(MAP, step2._1, EMPTY, EMPTY);
                    step2 = step2._2;
                    break;
                  case APPLY:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(APPLY, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  case ALT:
                    if (head) {
                      tail = new Aff2(CONS, head, tail);
                    }
                    head = new Aff2(ALT, EMPTY, step2._2, EMPTY);
                    step2 = step2._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step2;
                    step2 = new Aff2(FORKED, fid, new Aff2(CONS, head, tail), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step2)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head === null) {
                  break loop;
                }
                if (head._1 === EMPTY) {
                  head._1 = step2;
                  status = CONTINUE;
                  step2 = head._2;
                  head._2 = EMPTY;
                } else {
                  head._2 = step2;
                  step2 = head;
                  if (tail === null) {
                    head = null;
                  } else {
                    head = tail._1;
                    tail = tail._2;
                  }
                }
            }
          }
        root = step2;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error2, cb2) {
        interrupt = util.left(error2);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill(error2, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler;
            };
          });
        };
      }
      run2();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential2(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  var _liftEffect = Aff.Sync;
  var makeAff = Aff.Async;
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Pha.App.Internal/foreign.js
  var TEXT_NODE = 3;
  var merge = (a, b) => ({ ...a, ...b });
  var compose2 = (f, g) => f && g ? (x) => f(g(x)) : f || g;
  var patchProperty = (node, key, oldValue, newValue, listener, isSvg, mapf) => {
    if (key === "style") {
      for (let k in merge(oldValue, newValue)) {
        oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
        if (k[0] === "-") {
          node[key].setProperty(k, oldValue);
        } else {
          node[key][k] = oldValue;
        }
      }
    } else if (key[0] === "o" && key[1] === "n") {
      const key2 = key.slice(2);
      if (!node.actions)
        node.actions = {};
      node.actions[key2] = mapf && newValue ? mapf(newValue) : newValue;
      if (!newValue) {
        node.removeEventListener(key2, listener);
      } else if (!oldValue) {
        node.addEventListener(key2, listener);
      }
    } else if (!isSvg && key in node) {
      node[key] = newValue;
    } else if (newValue == null || newValue === false || key === "class" && !newValue) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };
  var createNode = (vnode, listener, isSvg, mapf) => {
    const node = vnode.type === TEXT_NODE ? document.createTextNode(vnode.tag) : (isSvg = isSvg || vnode.tag === "svg") ? document.createElementNS("http://www.w3.org/2000/svg", vnode.tag) : document.createElement(vnode.tag);
    const props = vnode.props;
    const mapf2 = compose2(mapf, vnode.mapf);
    for (let k in props) {
      patchProperty(node, k, null, props[k], listener, isSvg, mapf2);
    }
    for (let i = 0, len = vnode.children.length; i < len; i++) {
      node.appendChild(
        createNode(
          getVNode(vnode.children[i]).html,
          listener,
          isSvg,
          mapf2
        )
      );
    }
    vnode.node = node;
    return node;
  };
  var patch = (parent2, node, oldVNode, newVNode, listener, isSvg, mapf) => {
    if (oldVNode === newVNode) {
    } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
      if (oldVNode.tag !== newVNode.tag)
        node.nodeValue = newVNode.tag;
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
      node = parent2.insertBefore(
        createNode(newVNode, listener, isSvg, mapf),
        node
      );
      if (oldVNode) {
        parent2.removeChild(oldVNode.node);
      }
    } else {
      const oldVProps = oldVNode.props;
      const newVProps = newVNode.props;
      const oldVKids = oldVNode.children;
      const newVKids = newVNode.children;
      let oldTail = oldVKids.length - 1;
      let newTail = newVKids.length - 1;
      mapf = compose2(mapf, newVNode.mapf);
      isSvg = isSvg || newVNode.tag === "svg";
      for (let i in merge(oldVProps, newVProps)) {
        if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldVProps[i]) !== newVProps[i]) {
          patchProperty(node, i, oldVProps[i], newVProps[i], listener, isSvg, mapf);
        }
      }
      if (!newVNode.keyed) {
        for (let i = 0; i <= oldTail && i <= newTail; i++) {
          const oldVNode2 = oldVKids[i].html;
          const newVNode2 = getVNode(newVKids[i], oldVNode2).html;
          patch(node, oldVNode2.node, oldVNode2, newVNode2, listener, isSvg, mapf);
        }
        for (let i = oldTail + 1; i <= newTail; i++) {
          const newVNode2 = getVNode(newVKids[i], oldVNode).html;
          node.appendChild(
            createNode(newVNode2, listener, isSvg, mapf)
          );
        }
        for (let i = newTail + 1; i <= oldTail; i++) {
          node.removeChild(oldVKids[i].html.node);
        }
      } else {
        let oldHead = 0;
        let newHead = 0;
        while (newHead <= newTail && oldHead <= oldTail) {
          const { key: oldKey, html: oldVNode2 } = oldVKids[oldHead];
          if (oldKey !== newVKids[newHead].key)
            break;
          const newKNode = getVNode(newVKids[newHead], oldVNode2);
          patch(node, oldVNode2.node, oldVNode2, newKNode.html, listener, isSvg, mapf);
          newHead++;
          oldHead++;
        }
        while (newHead <= newTail && oldHead <= oldTail) {
          const { key: oldKey, html: oldVNode2 } = oldVKids[oldTail];
          if (oldKey !== newVKids[newTail].key)
            break;
          const newKNode = getVNode(newVKids[newTail], oldVNode2);
          patch(node, oldVNode2.node, oldVNode2, newKNode.html, listener, isSvg, mapf);
          newTail--;
          oldTail--;
        }
        if (oldHead > oldTail) {
          while (newHead <= newTail) {
            const newVNode2 = getVNode(newVKids[newHead]).html;
            node.insertBefore(
              createNode(newVNode2, listener, isSvg, mapf),
              oldVKids[oldHead] && oldVKids[oldHead].html.node
            );
            newHead++;
          }
        } else if (newHead > newTail) {
          while (oldHead <= oldTail) {
            node.removeChild(oldVKids[oldHead].html.node);
            oldHead++;
          }
        } else {
          const keyed2 = {};
          const newKeyed = {};
          for (let i = oldHead; i <= oldTail; i++) {
            keyed2[oldVKids[i].key] = oldVKids[i].html;
          }
          while (newHead <= newTail) {
            const { key: oldKey, html: oldVKid } = oldVKids[oldHead] || { key: null, html: null };
            const { key: newKey, html: newVKid } = getVNode(newVKids[newHead], oldVKid);
            if (newKeyed[oldKey] || oldVKids[oldHead + 1] && newKey === oldVKids[oldHead + 1].key) {
              oldHead++;
              continue;
            }
            if (oldKey === newKey) {
              patch(node, oldVKid.node, oldVKid, newVKid, listener, isSvg, mapf);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              const vkid = keyed2[newKey];
              if (vkid != null) {
                patch(
                  node,
                  node.insertBefore(vkid.node, oldVKid.node),
                  vkid,
                  newVKids[newHead].html,
                  listener,
                  isSvg,
                  mapf
                );
                newKeyed[newKey] = true;
              } else {
                patch(node, oldVKid && oldVKid.node, null, newVKids[newHead].html, listener, isSvg, mapf);
              }
            }
            newHead++;
          }
          for (let i in keyed2) {
            if (!newKeyed[i]) {
              node.removeChild(keyed2[i].node);
            }
          }
        }
      }
    }
    newVNode.node = node;
    return node;
  };
  var propsChanged = (a, b) => {
    for (let i = 0; i < a.length; i++)
      if (a[i] !== b[i])
        return true;
    return false;
  };
  var evalMemo = (f, memo) => memo.reduce((g, v) => g(v), f);
  var getVNode = (newVNode, oldVNode) => {
    if (typeof newVNode.html.type === "function") {
      if (!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.html.memo)) {
        oldVNode = copyVNode(evalMemo(newVNode.html.type, newVNode.html.memo));
        oldVNode.memo = newVNode.html.memo;
      }
      newVNode.html = oldVNode;
    }
    return newVNode;
  };
  var copyVNode = (vnode) => ({
    ...vnode,
    children: vnode.children && vnode.children.map(({ key, html }) => ({ key, html: copyVNode(html) }))
  });
  var getAction = (target5) => (type) => () => target5.actions[type];
  var unsafePatch = (parent2) => (node) => (oldVDom) => (newVDom) => (listener) => () => patch(parent2, node, oldVDom, newVDom, (e) => listener(e)());
  var unsafeLinkNode = (node) => (vdom) => {
    vdom.node = node;
    return vdom;
  };

  // output/Pha.Html.Core/foreign.js
  var _h = (tag, ps, children2, keyed2 = false) => {
    const style2 = {};
    const props = { style: style2 };
    const vdom = { tag, children: children2, props, node: null, keyed: keyed2 };
    const n = ps.length;
    for (let i = 0; i < n; i++) {
      const [t, k, v] = ps[i];
      if (t == 1)
        props[k] = v;
      else if (t === 2)
        props.class = (props.class ? props.class + " " : "") + k;
      else if (t === 3)
        style2[k] = v;
    }
    return vdom;
  };
  var elem2 = (tag) => (ps) => (children2) => _h(tag, ps, children2.map((html) => ({ key: null, html })));
  var createTextVNode = (text6) => ({
    tag: text6,
    props: {},
    children: [],
    type: 3
  });
  var attr = (k) => (v) => [1, k, v];
  var unsafeOnWithEffect = (k) => (v) => [1, "on" + k, v];
  var text = createTextVNode;

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }
  function type_(e) {
    return e.type;
  }

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Web.DOM.Document/foreign.js
  var getEffProp = function(name15) {
    return function(doc) {
      return function() {
        return doc[name15];
      };
    };
  };
  var url = getEffProp("URL");
  var documentURI = getEffProp("documentURI");
  var origin = getEffProp("origin");
  var compatMode = getEffProp("compatMode");
  var characterSet = getEffProp("characterSet");
  var contentType = getEffProp("contentType");
  var _documentElement = getEffProp("documentElement");
  function createTextNode(data) {
    return function(doc) {
      return function() {
        return doc.createTextNode(data);
      };
    };
  }

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value13) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value13 instanceof ty) {
        return just(value13);
      }
    }
    var obj = value13;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value13);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value13) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value13);
    };
  };

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp2("children");
  var _firstElementChild = getEffProp2("firstElementChild");
  var _lastElementChild = getEffProp2("lastElementChild");
  var childElementCount = getEffProp2("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map3 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map3(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map4 = /* @__PURE__ */ map(functorEffect);
  var parentNode = /* @__PURE__ */ function() {
    var $6 = map4(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();

  // output/Web.DOM.Text/index.js
  var toNode2 = unsafeCoerce2;

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;

  // output/Web.HTML.HTMLInputElement/foreign.js
  function value3(input2) {
    return function() {
      return input2.value;
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.HTML.HTMLSelectElement/foreign.js
  function value10(select3) {
    return function() {
      return select3.value;
    };
  }

  // output/Web.HTML.HTMLSelectElement/index.js
  var fromEventTarget2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLSelectElement");

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Pha.App/index.js
  var $runtime_lazy2 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var bind1 = /* @__PURE__ */ bind(bindEffect);
  var unless2 = /* @__PURE__ */ unless(applicativeEffect);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEffect);
  var map5 = /* @__PURE__ */ map(functorEffect);
  var map1 = /* @__PURE__ */ map(functorMaybe);
  var app$prime = function(v) {
    var go2 = function(state3) {
      return function(node) {
        return function(vdom) {
          var getState = read(state3);
          var setState = function(newState) {
            return function __do() {
              var oldState = read(state3)();
              return unless2(unsafeRefEq(oldState)(newState))(function __do2() {
                write(newState)(state3)();
                return render(v.view(newState))();
              })();
            };
          };
          var render = function(newVDom) {
            return function __do() {
              var oldVDom = read(vdom)();
              var node1 = read(node)();
              var pnode = parentNode(node1)();
              return for_2(pnode)(function(pnode$prime) {
                var vdom2 = copyVNode(newVDom);
                return function __do2() {
                  var node2 = unsafePatch(pnode$prime)(node1)(oldVDom)(vdom2)(listener)();
                  write(node2)(node)();
                  return write(vdom2)(vdom)();
                };
              })();
            };
          };
          var listener = function(e) {
            var v1 = type_(e);
            return for_2(currentTarget(e))(function(target5) {
              return function __do() {
                var fn = getAction(target5)(v1)();
                return dispatchEvent(e)(fn)();
              };
            });
          };
          var dispatchEvent = function(ev) {
            return function(handler) {
              return function __do() {
                var msg$prime = handler(ev)();
                return for_2(msg$prime)($lazy_dispatch(76))();
              };
            };
          };
          var $lazy_dispatch = $runtime_lazy2("dispatch", "Pha.App", function() {
            return v.update({
              get: getState,
              put: function(s) {
                return setState(s);
              }
            });
          });
          var dispatch = $lazy_dispatch(69);
          return function __do() {
            render(v.view(v.init.model))();
            return for_2(v.init.msg)(dispatch)();
          };
        };
      };
    };
    return function __do() {
      var parentNode2 = mapFlipped2(bind1(windowImpl)(document2))(toParentNode)();
      var selected2 = map5(map1(toNode))(querySelector(v.selector)(parentNode2))();
      return for_2(selected2)(function(node_) {
        return function __do2() {
          var state3 = $$new(v.init.model)();
          var emptyNode = mapFlipped2(bind1(mapFlipped2(bind1(windowImpl)(document2))(toDocument))(createTextNode("")))(toNode2)();
          appendChild(emptyNode)(node_)();
          var node = $$new(emptyNode)();
          var vdom = $$new(unsafeLinkNode(emptyNode)(text("")))();
          return go2(state3)(node)(vdom)();
        };
      })();
    };
  };
  var sandbox = function(v) {
    return app$prime({
      init: {
        model: v.init,
        msg: Nothing.value
      },
      view: v.view,
      update: function(v1) {
        return function(msg) {
          return function __do() {
            var st = v1.get();
            return v1.put(v.update(msg)(st))();
          };
        };
      },
      selector: v.selector
    });
  };

  // output/Pha.Html.Attributes/index.js
  var value12 = /* @__PURE__ */ attr("value");
  var type_18 = /* @__PURE__ */ attr("type");

  // output/Pha.Html.Elements/index.js
  var span2 = /* @__PURE__ */ elem2("span");
  var label4 = /* @__PURE__ */ elem2("label");
  var input = function(attrs) {
    return elem2("input")(attrs)([]);
  };
  var div2 = /* @__PURE__ */ elem2("div");

  // output/Pha.Html.Events/index.js
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var bind2 = /* @__PURE__ */ bind(bindMaybe);
  var map6 = /* @__PURE__ */ map(functorEffect);
  var map12 = /* @__PURE__ */ map(functorFn);
  var on2 = unsafeOnWithEffect;
  var onValueChange = function(f) {
    var fn = function(ev) {
      var v = bind2(currentTarget(ev))(fromEventTarget);
      if (v instanceof Just) {
        return map6(map12(Just.create)(f))(value3(v.value0));
      }
      ;
      if (v instanceof Nothing) {
        var v1 = bind2(currentTarget(ev))(fromEventTarget2);
        if (v1 instanceof Nothing) {
          return pure2(Nothing.value);
        }
        ;
        if (v1 instanceof Just) {
          return map6(map12(Just.create)(f))(value10(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Pha.Html.Events (line 67, column 17 - line 69, column 73): " + [v1.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Pha.Html.Events (line 64, column 9 - line 69, column 73): " + [v.constructor.name]);
    };
    return on2("change")(fn);
  };

  // output/Example.Temperature/index.js
  var show2 = /* @__PURE__ */ show(showNumber);
  var ChangeCelsius = /* @__PURE__ */ function() {
    function ChangeCelsius2(value0) {
      this.value0 = value0;
    }
    ;
    ChangeCelsius2.create = function(value0) {
      return new ChangeCelsius2(value0);
    };
    return ChangeCelsius2;
  }();
  var ChangeFahrenheit = /* @__PURE__ */ function() {
    function ChangeFahrenheit2(value0) {
      this.value0 = value0;
    }
    ;
    ChangeFahrenheit2.create = function(value0) {
      return new ChangeFahrenheit2(value0);
    };
    return ChangeFahrenheit2;
  }();
  var view = function(v) {
    return div2([])([label4([])([input([type_18("text"), attr("size")("5"), onValueChange(ChangeCelsius.create), value12(v.celsius)]), span2([])([text("\xB0C")]), input([type_18("text"), attr("size")("5"), onValueChange(ChangeFahrenheit.create), value12(v.fahrenheit)]), span2([])([text("\xB0F")])])]);
  };
  var update = function(v) {
    if (v instanceof ChangeCelsius) {
      return function(v1) {
        return {
          celsius: v.value0,
          fahrenheit: maybe("")(function(x) {
            return show2(x * 9 / 5 + 32);
          })(fromString(v.value0))
        };
      };
    }
    ;
    if (v instanceof ChangeFahrenheit) {
      return function(v1) {
        return {
          celsius: maybe("")(function(x) {
            return show2((x - 32) * 5 / 9);
          })(fromString(v.value0)),
          fahrenheit: v.value0
        };
      };
    }
    ;
    throw new Error("Failed pattern match at Example.Temperature (line 23, column 1 - line 23, column 29): " + [v.constructor.name]);
  };
  var init = {
    celsius: "",
    fahrenheit: ""
  };
  var main = /* @__PURE__ */ sandbox({
    init,
    view,
    update,
    selector: "#root"
  });

  // <stdin>
  main();
})();
