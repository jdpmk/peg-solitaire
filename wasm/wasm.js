var C_isOutOfBounds = Module.cwrap("isOutOfBounds",        // function
                                   "number",               // return type
                                   ["number", "number"]);  // parameter types

var C_isCenter = Module.cwrap("isCenter",             // function
                              "number",               // return type
                              ["number", "number"]);  // parameter types
