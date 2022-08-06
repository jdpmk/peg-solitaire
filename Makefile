APP=peg-solitaire

EMCC_WASM_C=wasm/$(APP).c
EMCC_WASM_JS=wasm/$(APP).js
EMCC_FLAGS=-s WASM=0 -s EXPORTED_RUNTIME_METHODS='[cwrap]'

all:
	emcc $(EMCC_WASM_C) -o $(EMCC_WASM_JS) $(EMCC_FLAGS)

clean:
	rm $(EMCC_WASM_JS)
