export type Language = "ar" | "fr" | "en";

export const translations = {
  ar: {
    customerGate: {
      title: "قبل أن نبدأ",
      description:
        "نحتاج إلى بعض المعلومات البسيطة لنجهز لك تجربة تسوق أفضل.",

      firstName: "الاسم",
      firstNamePlaceholder: "أدخل اسمك",

      lastName: "اللقب",
      lastNamePlaceholder: "أدخل لقبك",

      phone: "رقم الهاتف",
      phonePlaceholder: "05xxxxxxxx",

      phoneError:
        "يجب أن يتكون الرقم من 10 أرقام ويبدأ بـ 05 أو 06 أو 07.",

      phoneValid: "رقم هاتف صحيح",

      dateOfBirth: "تاريخ الميلاد",

      birthDateError:
        "يجب أن يكون عمر المستخدم 5 سنوات أو أكثر.",

      wilaya: "الولاية",
      wilayaPlaceholder: "اختر ولايتك",

      commune: "البلدية",
      communePlaceholder: "اختر بلديتك",

      selectWilayaFirst:
        "اختر الولاية أولاً",

      privacy:
        "نستخدم هذه المعلومات فقط لتحسين تجربة التسوق وتوفير خيارات التوصيل المناسبة لك.",

      continue: "متابعة إلى المتجر",

      noAccount:
        "لن تحتاج إلى إنشاء حساب أو كلمة مرور.",
    },

    store: {
      welcome: "مرحبًا",

      products: "منتجاتنا",

      subtitle:
        "اختر المنتج والكمية وطريقة التوصيل وأكمل طلبك بسهولة.",

      productBrand: "Algeria Commerce",

      quantity: "الكمية",

      delivery: "طريقة التوصيل",

      homeDelivery: "التوصيل إلى المنزل",

      homeDeliveryDescription:
        "نوصّل الطلب مباشرة إلى عنوانك.",

      officeDelivery: "مكتب التوصيل",

      officeDeliveryDescription:
        "استلم طلبك من أقرب مكتب توصيل.",

      price: "السعر",

      deliveryPrice: "سعر التوصيل",

      productTotal: "سعر المنتجات",

      total: "المجموع",

      orderNow: "اطلب الآن",

      confirmOrder: "تأكيد الطلب",

      secureOrder:
        "طلبك آمن ومعلوماتك محمية.",

      customerInfo: "بياناتك",

      orderDetails: "تفاصيل الطلب",

      imagePlaceholder: "صورة المنتج",

      decreaseQuantity: "إنقاص الكمية",

      increaseQuantity: "زيادة الكمية",

      maximumQuantity:
        "الحد الأقصى للكمية هو 10.",

      minimumQuantity:
        "الحد الأدنى للكمية هو 1.",

      language: "اللغة",

      arabic: "العربية",

      french: "Français",

      english: "English",
    },

    order: {
      successTitle:
        "تم استلام طلبك بنجاح 🎉",

      successDescription:
        "شكرًا لك. سنتواصل معك لتأكيد الطلب ومعلومات التوصيل.",

      product: "المنتج",

      quantity: "الكمية",

      delivery: "التوصيل",

      home: "إلى المنزل",

      office: "مكتب التوصيل",

      total: "المجموع",

      customer: "العميل",

      phone: "الهاتف",

      location: "العنوان",

      backToStore: "العودة إلى المتجر",

      orderReceived:
        "طلبك قيد المعالجة.",

      contactMessage:
        "سيتم التواصل معك قريبًا لتأكيد الطلب.",
    },

    common: {
      required: "هذا الحقل مطلوب.",

      loading: "جاري التحميل...",

      error: "حدث خطأ، حاول مرة أخرى.",

      close: "إغلاق",

      cancel: "إلغاء",

      continue: "متابعة",

      save: "حفظ",
    },
  },

  // =========================================================
  // FRENCH
  // =========================================================

  fr: {
    customerGate: {
      title: "Avant de commencer",
      description:
        "Nous avons besoin de quelques informations simples pour vous offrir une meilleure expérience d'achat.",

      firstName: "Prénom",
      firstNamePlaceholder:
        "Entrez votre prénom",

      lastName: "Nom",
      lastNamePlaceholder:
        "Entrez votre nom",

      phone: "Numéro de téléphone",
      phonePlaceholder: "05xxxxxxxx",

      phoneError:
        "Le numéro doit contenir 10 chiffres et commencer par 05, 06 ou 07.",

      phoneValid:
        "Numéro de téléphone valide",

      dateOfBirth:
        "Date de naissance",

      birthDateError:
        "L'utilisateur doit avoir au moins 5 ans.",

      wilaya: "Wilaya",

      wilayaPlaceholder:
        "Choisissez votre wilaya",

      commune: "Commune",

      communePlaceholder:
        "Choisissez votre commune",

      selectWilayaFirst:
        "Choisissez d'abord la wilaya",

      privacy:
        "Nous utilisons ces informations uniquement pour améliorer votre expérience d'achat et proposer les options de livraison adaptées.",

      continue:
        "Continuer vers la boutique",

      noAccount:
        "Aucun compte ni mot de passe n'est nécessaire.",
    },

    store: {
      welcome: "Bienvenue",

      products: "Nos produits",

      subtitle:
        "Choisissez le produit, la quantité et le mode de livraison, puis passez votre commande.",

      productBrand:
        "Algeria Commerce",

      quantity: "Quantité",

      delivery: "Mode de livraison",

      homeDelivery:
        "Livraison à domicile",

      homeDeliveryDescription:
        "Votre commande est livrée directement à votre adresse.",

      officeDelivery:
        "Bureau de livraison",

      officeDeliveryDescription:
        "Récupérez votre commande auprès du bureau de livraison le plus proche.",

      price: "Prix",

      deliveryPrice:
        "Frais de livraison",

      productTotal:
        "Total des produits",

      total: "Total",

      orderNow:
        "Commander maintenant",

      confirmOrder:
        "Confirmer la commande",

      secureOrder:
        "Votre commande est sécurisée et vos informations sont protégées.",

      customerInfo:
        "Vos informations",

      orderDetails:
        "Détails de la commande",

      imagePlaceholder:
        "Image du produit",

      decreaseQuantity:
        "Diminuer la quantité",

      increaseQuantity:
        "Augmenter la quantité",

      maximumQuantity:
        "La quantité maximale est de 10.",

      minimumQuantity:
        "La quantité minimale est de 1.",

      language: "Langue",

      arabic: "العربية",

      french: "Français",

      english: "English",
    },

    order: {
      successTitle:
        "Votre commande a été reçue avec succès 🎉",

      successDescription:
        "Merci. Nous vous contacterons pour confirmer votre commande et les informations de livraison.",

      product: "Produit",

      quantity: "Quantité",

      delivery: "Livraison",

      home: "À domicile",

      office: "Bureau de livraison",

      total: "Total",

      customer: "Client",

      phone: "Téléphone",

      location:
        "Adresse",

      backToStore:
        "Retour à la boutique",

      orderReceived:
        "Votre commande est en cours de traitement.",

      contactMessage:
        "Nous vous contacterons bientôt pour confirmer votre commande.",
    },

    common: {
      required:
        "Ce champ est obligatoire.",

      loading:
        "Chargement...",

      error:
        "Une erreur s'est produite. Veuillez réessayer.",

      close: "Fermer",

      cancel: "Annuler",

      continue:
        "Continuer",

      save:
        "Enregistrer",
    },
  },

  // =========================================================
  // ENGLISH
  // =========================================================

  en: {
    customerGate: {
      title: "Before we start",

      description:
        "We need a few simple details to provide you with a better shopping experience.",

      firstName:
        "First name",

      firstNamePlaceholder:
        "Enter your first name",

      lastName:
        "Last name",

      lastNamePlaceholder:
        "Enter your last name",

      phone:
        "Phone number",

      phonePlaceholder:
        "05xxxxxxxx",

      phoneError:
        "The number must contain 10 digits and start with 05, 06, or 07.",

      phoneValid:
        "Valid phone number",

      dateOfBirth:
        "Date of birth",

      birthDateError:
        "The user must be at least 5 years old.",

      wilaya:
        "Wilaya",

      wilayaPlaceholder:
        "Choose your wilaya",

      commune:
        "Commune",

      communePlaceholder:
        "Choose your commune",

      selectWilayaFirst:
        "Choose a wilaya first",

      privacy:
        "We use this information only to improve your shopping experience and provide suitable delivery options.",

      continue:
        "Continue to store",

      noAccount:
        "No account or password is required.",
    },

    store: {
      welcome:
        "Welcome",

      products:
        "Our products",

      subtitle:
        "Choose your product, quantity and delivery method, then place your order easily.",

      productBrand:
        "Algeria Commerce",

      quantity:
        "Quantity",

      delivery:
        "Delivery method",

      homeDelivery:
        "Home delivery",

      homeDeliveryDescription:
        "Your order will be delivered directly to your address.",

      officeDelivery:
        "Delivery office",

      officeDeliveryDescription:
        "Pick up your order from the nearest delivery office.",

      price:
        "Price",

      deliveryPrice:
        "Delivery fee",

      productTotal:
        "Products total",

      total:
        "Total",

      orderNow:
        "Order now",

      confirmOrder:
        "Confirm order",

      secureOrder:
        "Your order is secure and your information is protected.",

      customerInfo:
        "Your information",

      orderDetails:
        "Order details",

      imagePlaceholder:
        "Product image",

      decreaseQuantity:
        "Decrease quantity",

      increaseQuantity:
        "Increase quantity",

      maximumQuantity:
        "Maximum quantity is 10.",

      minimumQuantity:
        "Minimum quantity is 1.",

      language:
        "Language",

      arabic:
        "العربية",

      french:
        "Français",

      english:
        "English",
    },

    order: {
      successTitle:
        "Your order was received successfully 🎉",

      successDescription:
        "Thank you. We will contact you to confirm your order and delivery information.",

      product:
        "Product",

      quantity:
        "Quantity",

      delivery:
        "Delivery",

      home:
        "Home delivery",

      office:
        "Delivery office",

      total:
        "Total",

      customer:
        "Customer",

      phone:
        "Phone",

      location:
        "Address",

      backToStore:
        "Back to store",

      orderReceived:
        "Your order is being processed.",

      contactMessage:
        "We will contact you shortly to confirm your order.",
    },

    common: {
      required:
        "This field is required.",

      loading:
        "Loading...",

      error:
        "Something went wrong. Please try again.",

      close:
        "Close",

      cancel:
        "Cancel",

      continue:
        "Continue",

      save:
        "Save",
    },
  },
} as const;