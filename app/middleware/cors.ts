// If you want to limit which servers can access what, please add your cors actions here.

import { corsEventHandler } from "nitro-cors";

export default corsEventHandler((_event) => {}, {
  origin: "*",
  methods: "*",
});
