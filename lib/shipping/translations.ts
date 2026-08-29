export type Lang = "ar" | "fr";

export const T = {
  title: { ar: "شركات التوصيل", fr: "Livraison" },
  subtitle: {
    ar: "اربط حسابك لدى شركات التوصيل لتجهيز طلباتك.",
    fr: "Connectez vos comptes livreurs pour préparer vos commandes.",
  },
  connectCarrier: { ar: "ربط شركة توصيل", fr: "Connecter un livreur" },
  searchPlaceholder: {
    ar: "ابحث عن شركة توصيل…",
    fr: "Rechercher un livreur…",
  },
  noResultsTitle: { ar: "لا توجد نتائج", fr: "Aucun résultat" },
  noResultsBody: {
    ar: "لا توجد شركات تطابق «{q}».",
    fr: "Aucun livreur ne correspond à «{q}».",
  },
  clearSearch: { ar: "مسح البحث", fr: "Effacer" },
  emptyTitle: { ar: "لا توجد شركات توصيل بعد", fr: "Aucun livreur disponible" },
  emptyBody: {
    ar: "نضيف شركات جديدة باستمرار. عد لاحقاً.",
    fr: "De nouveaux livreurs arrivent bientôt.",
  },
  connectFirst: { ar: "ربط شركة توصيل", fr: "Connecter un livreur" },
  connected: { ar: "مربوط", fr: "Connecté" },
  connect: { ar: "ربط", fr: "Connecter" },
  manage: { ar: "إدارة", fr: "Gérer" },
  error: { ar: "خطأ", fr: "Erreur" },
  retry: { ar: "إعادة المحاولة", fr: "Réessayer" },
  loadErrorTitle: {
    ar: "تعذر تحميل شركات التوصيل",
    fr: "Impossible de charger les livreurs",
  },
  loadErrorBody: {
    ar: "حدث خطأ أثناء جلب القائمة. حاول مرة أخرى.",
    fr: "Une erreur est survenue. Veuillez réessayer.",
  },
  chooseCarrier: { ar: "اختر شركة التوصيل", fr: "Choisir le livreur" },
  chooseCarrierHint: {
    ar: "اختر الشركة التي تريد الربط معها.",
    fr: "Choisissez le livreur à connecter.",
  },
  credentialsStep: { ar: "بيانات الاعتماد", fr: "Identifiants" },
  requiredField: { ar: "هذا الحقل مطلوب.", fr: "Ce champ est requis." },
  urlMustHttps: {
    ar: "يجب أن يبدأ العنوان بـ https://",
    fr: "Le lien doit commencer par https://",
  },
  testAndConnect: { ar: "اختبار والربط", fr: "Tester et connecter" },
  testing: {
    ar: "جارٍ التحقق من البيانات…",
    fr: "Vérification des identifiants…",
  },
  whereFind: { ar: "أين أجد هذه البيانات؟", fr: "Où trouver ces données ?" },
  openDashboard: { ar: "فتح لوحة الشركة", fr: "Ouvrir le tableau de bord" },
  close: { ar: "إغلاق", fr: "Fermer" },
  helpTitle: { ar: "كيف تحصل على هذه البيانات؟", fr: "Comment obtenir ces données ?" },
  connectedSuccess: {
    ar: "تم ربط شركة التوصيل بنجاح",
    fr: "Livreur connecté avec succès",
  },
  done: { ar: "تم", fr: "Terminé" },
  masked: { ar: "••••••", fr: "••••••" },
  testConnection: { ar: "اختبار الاتصال", fr: "Tester la connexion" },
  testingConnection: { ar: "جارٍ الاختبار…", fr: "Test en cours…" },
  changeCredentials: {
    ar: "تغيير بيانات الاعتماد",
    fr: "Modifier les identifiants",
  },
  save: { ar: "حفظ", fr: "Enregistrer" },
  disconnect: { ar: "قطع الربط", fr: "Déconnecter" },
  disconnectTitle: {
    ar: "هل أنت متأكد من قطع الربط؟",
    fr: "Confirmer la déconnexion ?",
  },
  disconnectBody: {
    ar: "سيُحذف الحساب من قائمتك.",
    fr: "Le compte sera supprimé de votre liste.",
  },
  confirm: { ar: "تأكيد", fr: "Confirmer" },
  cancel: { ar: "إلغاء", fr: "Annuler" },
  credentialsUpdated: {
    ar: "تم تحديث بيانات الاعتماد بنجاح",
    fr: "Identifiants mis à jour",
  },
  testOk: {
    ar: "تم التحقق بنجاح. الحساب يعمل.",
    fr: "Connexion vérifiée. Tout fonctionne.",
  },
  cancelCaptions: {
    ar: "ألغِ قبل المتابعة",
    fr: "Annulez avant de poursuivre",
  },
  back: { ar: "رجوع", fr: "Retour" },
  selection: { ar: "الاختيار", fr: "Sélection" },
} as const;

const ERROR_MESSAGES: Record<
  string,
  { ar: string; fr: string }
> = {
  invalid_credentials: {
    ar: "بيانات الاعتماد غير صحيحة. تأكد من نسخ المفاتيح كاملةً من لوحة الشركة.",
    fr: "Identifiants invalides. Vérifiez les clés copiées depuis le tableau de bord.",
  },
  carrier_not_found: {
    ar: "شركة الشحن غير موجودة.",
    fr: "Le transporteur n'existe pas.",
  },
  carrier_inactive: {
    ar: "شركة الشحن غير مفعّلة حالياً.",
    fr: "Le transporteur est actuellement désactivé.",
  },
  connection_not_found: {
    ar: "اتصال الشحن غير موجود.",
    fr: "La connexion de livraison n'existe pas.",
  },
  invalid_commune: {
    ar: "بيانات البلدية غير مطابقة لقائمة الشركة.",
    fr: "La commune ne correspond pas aux listes du transporteur.",
  },
  duplicate_order: {
    ar: "هذا الاسم والهاتف سبق شحنهما اليوم لدى الشركة.",
    fr: "Un colis identique existe déjà aujourd'hui.",
  },
  timeout: {
    ar: "الشركة لم تستجب. حاول مرة أخرى لاحقاً.",
    fr: "Le transporteur ne répond pas. Réessayez plus tard.",
  },
  network: {
    ar: "تعذر الوصول إلى الشركة. تحقق من اتصالك.",
    fr: "Impossible d'atteindre le transporteur.",
  },
  unknown: {
    ar: "حدث خطأ غير متوقع.",
    fr: "Une erreur inattendue est survenue.",
  },
};

export function t(key: keyof typeof T | string, lang: Lang = "ar"): string {
  const entry = (T as Record<string, { ar: string; fr: string }>)[key];
  if (!entry) return String(key);
  return entry[lang] ?? entry.ar;
}

export function translateError(code?: string, lang: Lang = "ar"): string {
  const entry = ERROR_MESSAGES[code ?? "unknown"];
  return (entry ?? ERROR_MESSAGES.unknown)[lang];
}