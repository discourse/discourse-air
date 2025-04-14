import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  api.registerValueTransformer("topic-list-item-expand-pinned", () => true);
});
