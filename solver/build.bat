@echo on
clang --target=wasm32 -O3 -flto -nostdlib -Wall -Wl,--no-entry -Wl,--export-all -Wl,--lto-O3 -o solver.wasm solver.c memcpy.c