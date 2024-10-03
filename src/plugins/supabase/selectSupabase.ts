import { onMounted } from "vue";
import supabase from "./supabaseClient";

const select = async () => {
    const { data, error } = await supabase
      .from("payments")
      .select();
    if (error) {
      return false;
    } else {
      return data;
    }
}


onMounted(() => {
  select()
})

export default select