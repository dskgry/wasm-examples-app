(module
 (import "env" "__memory_base" (global $__memory_base i32))
 (global $STACKTOP (mut i32) (i32.const 0))
 (global $STACK_MAX (mut i32) (i32.const 0))
 (export "__post_instantiate" (func $__post_instantiate))
 (export "_checkPrimes" (func $_checkPrimes))
 (func $_isPrime (; 0 ;) (; has Stack IR ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $1
   (i32.const 2)
  )
  ;;@ /data/c/check_primes.c:7:0
  (block $__rjto$0
   (block $__rjti$0
    (local.set $0
     (loop $while-in (result i32)
      ;;@ /data/c/check_primes.c:2:0
      (br_if $__rjti$0
       (i32.ge_s
        (local.get $1)
        (local.get $0)
       )
      )
      ;;@ /data/c/check_primes.c:3:0
      (local.set $2
       (i32.rem_s
        (local.get $0)
        (local.get $1)
       )
      )
      (local.set $2
       (i32.eqz
        (local.get $2)
       )
      )
      ;;@ /data/c/check_primes.c:2:0
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 1)
       )
      )
      (br_if $while-in
       (i32.eqz
        (local.get $2)
       )
      )
      (i32.const 0)
     )
    )
    (br $__rjto$0)
   )
   ;;@ /data/c/check_primes.c:7:0
   (local.set $0
    (i32.gt_u
     (local.get $0)
     (i32.const 1)
    )
   )
  )
  ;;@ /data/c/check_primes.c:8:0
  (local.get $0)
 )
 (func $_checkPrimes (; 1 ;) (; has Stack IR ;) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (loop $while-in
   (block $while-out
    ;;@ /data/c/check_primes.c:13:0
    (br_if $while-out
     (i32.ge_s
      (local.get $1)
      (local.get $0)
     )
    )
    ;;@ /data/c/check_primes.c:14:0
    (local.set $3
     (call $_isPrime
      (local.get $1)
     )
    )
    (local.set $3
     (i32.eq
      (local.get $3)
      (i32.const 1)
     )
    )
    (local.set $2
     (i32.add
      (local.get $2)
      (local.get $3)
     )
    )
    ;;@ /data/c/check_primes.c:13:0
    (local.set $1
     (i32.add
      (local.get $1)
      (i32.const 1)
     )
    )
    (br $while-in)
   )
  )
  ;;@ /data/c/check_primes.c:18:0
  (local.get $2)
 )
 (func $__post_instantiate (; 2 ;) (; has Stack IR ;)
  (global.set $STACKTOP
   (global.get $__memory_base)
  )
  (global.set $STACK_MAX
   (i32.add
    (global.get $STACKTOP)
    (i32.const 5242880)
   )
  )
 )
)
