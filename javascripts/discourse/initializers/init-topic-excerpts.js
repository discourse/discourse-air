import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  api.registerValueTransformer("topic-list-item-expand-pinned", () => true);
});
