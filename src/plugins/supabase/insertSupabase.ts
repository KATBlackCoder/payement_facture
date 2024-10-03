import supabase from "./supabaseClient";

async function insert(firstNameValue: string, lastNameValue: string, paymentAmountValue: number ) {
  const { error } = await supabase.from("payments").insert([
    {
      lastname: firstNameValue,
      firstname: lastNameValue,
      paymentamount: paymentAmountValue,
    },
  ]);
  if (error) {
    console.error("Error inserting data:", error);
    if (error.details == null) {
      alert("Veuillez préciser tous les champs.");
    }
  } else {
    alert("Payement soumis avec succès!");
  }
}

export default insert;
  