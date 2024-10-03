import html2canvaspro from "html2canvas-pro";
import { useAlertStore } from "../../stores/alert";
import router from "../router";
import { useMembershipStore } from "../../stores/membership";


function downloadImage(htmlId: string) {
  const alertStore = useAlertStore();
  const membershipStore = useMembershipStore();
  try {
    const invoiceElement = document.getElementById(htmlId);

    if (!invoiceElement) {
      throw new Error("Element not found");
    }

    html2canvaspro(invoiceElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = membershipStore.firstName.trim()+".png";
        link.click();

        // Set success alert after image download
        alertStore.setAlert(
          "L'image a été téléchargée avec succès !",
          "alert-success"
        );

        setTimeout(() => {
            alertStore.$reset();
            membershipStore.$reset();
            router.push({
              name: "Home"
            });
          }, 2000);

      });
      
  } catch (error) {
    console.error("Error generating image:", error);
    alertStore.setAlert(
      "Échec du téléchargement de l'image. Veuillez réessayer.",
      "alert-error"
    );
  }

}

export default downloadImage;
