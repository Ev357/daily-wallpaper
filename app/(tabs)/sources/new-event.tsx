import { UText } from "@/components/ui/text/Text";
import { UView } from "@/components/ui/view/View";
import { spacing } from "@expo/styleguide-base";

const NewEvent = () => {
  return (
    <UView style={{ flex: 1, paddingHorizontal: spacing[4] }} safe>
      <UText>NewEvent</UText>
    </UView>
  );
};

export default NewEvent;
