#include <emscripten.h>

int EMSCRIPTEN_KEEPALIVE isCenter(unsigned i, unsigned j) {
    return i == 3 && j == 3;
}
