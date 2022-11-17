/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/RemoteCall/factory/api/cache.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, November 14th 2022, 4:04:31 pm
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { storageUtils } from "../../utils/storageUtils";
import { session } from "../../utils/sessionUtils";
import { ApiBase } from "../baseApi";

class CacheApi extends ApiBase {
  constructor() {
    super();
  }

  callArg(argv) {
    let argv_config = this.api_argv().option("d", {
      alias: "delete",
      type: "boolean",
      describe: "Delete cache by keyword",
      default: false,
    });
    argv_config.parseArgFromCmd(argv);

    return argv_config.get_result();
  }

  call(argv) {
    session.argv = argv;

    const name = argv.keyword || "";
    const isInteger = Number.isInteger(Number(name));

    const all_data_file = storageUtils.listCache().filter(function (f) {
      return (
        name.length === 0 ||
        (isInteger ? f.name.startsWith(name + ".") : f.name === name)
      );
    });

    if (argv.delete) {
      for (let f of all_data_file) {
        storageUtils.delCache(f.name);
      }
    }
  }
}

export const cacheApi: CacheApi = new CacheApi();
