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
  },

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
  },

  en: {
    customerGate: {
      title: "Before we start",
      description:
        "We need a few simple details to provide you with a better shopping experience.",

      firstName: "First name",
      firstNamePlaceholder:
        "Enter your first name",

      lastName: "Last name",
      lastNamePlaceholder:
        "Enter your last name",

      phone: "Phone number",
      phonePlaceholder: "05xxxxxxxx",

      phoneError:
        "The number must contain 10 digits and start with 05, 06, or 07.",

      phoneValid:
        "Valid phone number",

      dateOfBirth:
        "Date of birth",

      birthDateError:
        "The user must be at least 5 years old.",

      wilaya: "Wilaya",
      wilayaPlaceholder:
        "Choose your wilaya",

      commune: "Commune",
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
  },
} as const;