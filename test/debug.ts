import { test } from "uvu";
import * as assert from "uvu/assert";

import { PgnReader, Shape } from "../src";
import { readFile } from "../src/fetch";
import { PgnReaderMove } from "@mliebelt/pgn-types";

// test("should read null moves (--)", () => {
//   const reader = new PgnReader({ pgn: "1. e4 -- 2. Nf3" });
//   assert.equal(reader.getMoves().length, 3);
// });

test("should read null moves in the beginning", () => {
  const reader = new PgnReader({ pgn: "1. -- e5 2. -- d5" });
  assert.equal(reader.getMoves().length, 4);
});

// test("should read null moves (Z0)", () => {
//   const reader = new PgnReader({ pgn: "1. e4 Z0 2. Nf3 Z0 3. Bc4 Z0 4. O-O" });
//   assert.equal(reader.getMoves().length, 7);
// });

test.run();
