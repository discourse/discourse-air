import { apiInitializer } from "discourse/lib/api";
import { withSilencedDeprecations } from "discourse-common/lib/deprecated";

export default apiInitializer("0.8", (api) => {
  const transformerExists = api.registerValueTransformer(
    "topic-list-item-expand-pinned",
    () => true
  );

  if (!transformerExists) {
    withSilencedDeprecations("discourse.hbr-topic-list-overrides", () => {
      api.modifyClass("component:topic-list-item", {
        pluginId: "discourse-air",
        expandPinned: true,
      });
    });
  }
});
