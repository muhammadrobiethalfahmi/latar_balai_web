import {
  getDocument,
  setDocument,
  updateDocument,
} from "../firebase/firestore";

const COLLECTION = "settings";
const DOC_ID = "website";

export async function getWebsiteSettings() {
  const data = await getDocument(COLLECTION, DOC_ID);

  return (
    data || {
      siteName: "",
      logo: "",

      phone: "",
      whatsapp: "",
      email: "",

      address: "",
      maps: "",

      openHour: "",
      closeHour: "",

      facebook: "",
      instagram: "",
      youtube: "",
      tiktok: "",

      homeTitle: "",
      homeSubtitle: "",
      homeImage: "",

      tourismTitle: "",
      tourismSubtitle: "",
      tourismImage: "",

      educationTitle: "",
      educationSubtitle: "",
      educationImage: "",

      marketplaceTitle: "",
      marketplaceSubtitle: "",
      marketplaceImage: "",

      contactTitle: "",
      contactSubtitle: "",
      contactImage: "",
    }
  );
}

export async function saveWebsiteSettings(data) {
  const current = await getDocument(COLLECTION, DOC_ID);

  if (!current) {
    await setDocument(COLLECTION, DOC_ID, data);
  } else {
    await updateDocument(COLLECTION, DOC_ID, data);
  }
}