#include <emscripten.h>

int EMSCRIPTEN_KEEPALIVE isOutOfBounds(unsigned i, unsigned j) {
    return (i < 2 && j < 2) ||
           (i < 2 && j > 4) ||
           (i > 4 && j < 2) ||
           (i > 4 && j > 4);
}

int EMSCRIPTEN_KEEPALIVE isCenter(unsigned i, unsigned j) {
    return i == 3 && j == 3;
}
