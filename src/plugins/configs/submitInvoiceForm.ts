import { useAlertStore } from "../../stores/alert";
import { useLoadingStore } from "../../stores/loading";
import { useMembershipStore } from "../../stores/membership";
import router from "../router";
import supabase from "../supabase/supabaseClient";

async function submitInvoiceForm(
  firstName: string,
  lastName: string,
  paymentAmount: number
) {
  const loadingStore = useLoadingStore();
  const alertStore = useAlertStore();
  const membershipStore = useMembershipStore();

  membershipStore.firstName = firstName.trim().toLocaleLowerCase();
  membershipStore.lastName = lastName.trim().toLocaleLowerCase();
  membershipStore.paymentAmount = paymentAmount;

  // Validate input fields
  if (!membershipStore.isComplete) {
    alertStore.setAlert(
      "Veuillez remplir tous les champs corrects",
      "alert-error",
      2000
    );
    return;
  }

  if (!membershipStore.isCorrectName) {
    alertStore.setAlert(
      "Format du prenom ou nom incorrects",
      "alert-error",
      2000
    );
    return;
  }

  loadingStore.setLoading(true);
  alertStore.clearAlert();

  try {
    const { error } = await supabase.from("payments").insert([
      {
        firstname: membershipStore.firstName,
        lastname: membershipStore.lastName,
        paymentamount: membershipStore.paymentAmount,
      },
    ]);

    if (error) {
      throw error;
    }

    alertStore.setAlert("Facture ajoutée avec succès!", "alert-success");

    // Redirect after showing success message for 2 seconds
    setTimeout(() => {
      loadingStore.$reset();
      alertStore.$reset();
      router.push({
        name: "Invoice",
        query: {
          firstname: membershipStore.firstName,
          lastname: membershipStore.lastName,
          paymentamount: membershipStore.paymentAmount,
        },
      });
    }, 2000);
  } catch (error) {
    alertStore.setAlert(
      "Impossible d'ajouter la facture. Veuillez réessayer.",
      "alert-error",
      2000
    );
    loadingStore.$reset();
  }
}

export default submitInvoiceForm;
