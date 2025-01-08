import { apiInitializer } from "discourse/lib/api";
import { withSilencedDeprecations } from "discourse-common/lib/deprecated";

export default apiInitializer("0.8", (api) => {
  api.registerValueTransformer("topic-list-item-expand-pinned", () => true);

  withSilencedDeprecations("discourse.hbr-topic-list-overrides", () => {
    api.modifyClass("component:topic-list-item", {
      pluginId: "discourse-air",
      expandPinned: true,
    });
  });
});
