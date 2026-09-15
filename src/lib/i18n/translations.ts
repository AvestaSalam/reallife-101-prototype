/**
 * Central i18n dictionaries for Reallife 101.
 *
 * English is the source of truth: `TranslationKey` is derived from the `en`
 * dictionary, and every other locale is typed as `Record<TranslationKey, string>`
 * so a missing or extra key in es/fr/zh is a compile-time error.
 *
 * Values may contain `{placeholder}` variables, interpolated by `translate()`.
 */

export type Locale = "en" | "es" | "fr" | "zh";

/** Languages offered in the profile settings, shown with native names. */
export const LOCALES: {
  code: Locale;
  native: string;
  english: string;
  flag: string;
}[] = [
  { code: "en", native: "English", english: "English", flag: "🇬🇧" },
  { code: "es", native: "Español", english: "Spanish", flag: "🇪🇸" },
  { code: "fr", native: "Français", english: "French", flag: "🇫🇷" },
  { code: "zh", native: "中文", english: "Chinese", flag: "🇨🇳" },
];

const en = {
  // ---- common ----
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.done": "Done",
  "common.version": "Version",
  "common.comingSoon": "coming soon in this prototype",

  // ---- navigation ----
  "nav.home": "Home",
  "nav.courses": "Courses",
  "nav.explore": "Explore",
  "nav.roadmap": "Roadmap",
  "nav.more": "More",
  "nav.menu": "Menu",
  "nav.saved": "Saved",
  "nav.challenges": "Challenges",
  "nav.resources": "Resources",
  "nav.profile": "Profile",

  // ---- tools ----
  "nav.tools": "Tools",
  "tools.budget": "Budget Planner",
  "tools.resume": "Resume Builder",
  "tools.aiCoach": "AI Coach",
  "tools.hub.subtitle": "Handy helpers for real life",
  "tools.hub.open": "Open tool",
  "tools.prototype": "Prototype",
  "tools.budget.desc": "Track income & expenses with the 50/30/20 rule.",
  "tools.resume.desc": "Build a clean resume and preview it live.",
  "tools.aiCoach.desc": "Ask anything — get friendly, practical guidance.",

  // ---- mobile header ----
  "header.search": "Search courses...",
  "header.notifications": "Notifications",
  "header.markAllRead": "Mark all read",
  "header.openProfile": "Open profile",

  // ---- profile page ----
  "profile.backHome": "Back to home",
  "profile.title": "Profile",
  "profile.subtitle": "Manage your account & settings",
  "profile.memberSince": "Member since {date}",
  "profile.editProfile": "Edit profile",
  "profile.viewProfile": "View full profile",
  "profile.stats.points": "Points",
  "profile.stats.streak": "Day streak",
  "profile.stats.completed": "Completed",
  "profile.level": "Level {level}",
  "profile.rank": "Rising Learner",
  "profile.xpProgress": "Progress to Level {level}",
  "profile.xp": "{current} / {total} XP",

  // ---- subscription ----
  "premium.free.title": "Go Premium",
  "premium.free.subtitle":
    "Unlock every course, tool and exclusive challenge. Cancel anytime.",
  "premium.free.cta": "Get Premium",
  "premium.badge": "PREMIUM",
  "premium.member": "Premium member",
  "premium.manage": "Manage plan",
  "premium.modal.title": "Reallife 101 Premium",
  "premium.modal.subtitle": "Learn faster with unlimited access.",
  "premium.monthly": "Monthly",
  "premium.yearly": "Yearly",
  "premium.perMonth": "/month",
  "premium.perYear": "/year",
  "premium.bestValue": "Best value · Save 50%",
  "premium.feature1": "Unlimited access to all courses & resources",
  "premium.feature2": "Ad-free learning experience",
  "premium.feature3": "Offline downloads",
  "premium.feature4": "Exclusive premium challenges & badges",
  "premium.feature5": "Priority support",
  "premium.cta": "Start 7-day free trial",
  "premium.ctaNote": "Then {price}. Cancel anytime.",
  "premium.success": "Welcome to Premium! 🎉",
  "premium.renews": "Renews on {date}",
  "premium.trialEnds": "Free trial ends {date}",
  "premium.currentPlan": "Current plan",
  "premium.cancel": "Cancel subscription",
  "premium.cancelNote":
    "You'll keep Premium until the end of your billing period.",
  "premium.cancelConfirm": "Keep Premium",
  "premium.cancelled": "Subscription cancelled — sorry to see you go!",

  // ---- settings sections ----
  "section.preferences": "Preferences",
  "section.account": "Account",
  "section.support": "Support & legal",

  // ---- settings rows ----
  "settings.language": "App language",
  "settings.languageDesc": "Change the language of the app",
  "settings.autoplay": "Autoplay videos",
  "settings.autoplayDesc": "Play the next lesson automatically",
  "settings.notifications": "Push notifications",
  "settings.notificationsDesc": "Streak reminders & new content",
  "settings.offline": "Offline mode",
  "settings.offlineDesc": "Download lessons over Wi-Fi only",
  "settings.reminder": "Daily reminder",
  "settings.reminderDesc": "A nudge to keep your streak alive",
  "settings.editProfile": "Edit profile",
  "settings.editProfileDesc": "Update your name & email",
  "settings.password": "Change password",
  "settings.passwordDesc": "We'll email you a secure reset link",
  "settings.passwordSent": "Password reset link sent to your email",
  "settings.privacy": "Privacy",
  "settings.privacyDesc": "Data & privacy controls",
  "settings.signOut": "Sign out",
  "settings.signOutMsg": "Signed out — see you soon!",
  "settings.delete": "Delete account",
  "settings.deleteDesc": "Permanently remove your account",
  "settings.deleteMsg": "Account deletion isn't available in this prototype",
  "settings.help": "Help center",
  "settings.helpDesc": "FAQs & guides",
  "settings.contact": "Contact us",
  "settings.contactDesc": "We usually reply within 24h",
  "settings.rate": "Rate Reallife 101",
  "settings.rateDesc": "Tell us how we're doing",
  "settings.about": "About",
  "settings.aboutDesc": "Version 1.0.0",

  // ---- language ----
  "language.title": "App language",
  "language.hint": "Applies instantly across the app",
  "language.changed": "Language changed to {language}",

  // ---- edit profile modal ----
  "edit.title": "Edit profile",
  "edit.name": "Display name",
  "edit.email": "Email",
  "edit.save": "Save changes",
  "edit.saved": "Profile updated",
};

export type TranslationKey = keyof typeof en;

const es: Record<TranslationKey, string> = {
  // ---- common ----
  "common.cancel": "Cancelar",
  "common.save": "Guardar",
  "common.done": "Hecho",
  "common.version": "Versión",
  "common.comingSoon": "llegará pronto en este prototipo",

  // ---- navigation ----
  "nav.home": "Inicio",
  "nav.courses": "Cursos",
  "nav.explore": "Explorar",
  "nav.roadmap": "Hoja de ruta",
  "nav.more": "Más",
  "nav.menu": "Menú",
  "nav.saved": "Guardados",
  "nav.challenges": "Retos",
  "nav.resources": "Recursos",
  "nav.profile": "Perfil",

  // ---- tools ----
  "nav.tools": "Herramientas",
  "tools.budget": "Planificador de presupuesto",
  "tools.resume": "Creador de currículums",
  "tools.aiCoach": "Entrenador IA",
  "tools.hub.subtitle": "Ayudas prácticas para la vida real",
  "tools.hub.open": "Abrir herramienta",
  "tools.prototype": "Prototipo",
  "tools.budget.desc": "Controla ingresos y gastos con la regla 50/30/20.",
  "tools.resume.desc": "Crea un currículum limpio y previsualízalo en vivo.",
  "tools.aiCoach.desc": "Pregunta lo que quieras y recibe guía práctica.",

  // ---- mobile header ----
  "header.search": "Buscar cursos...",
  "header.notifications": "Notificaciones",
  "header.markAllRead": "Marcar todo como leído",
  "header.openProfile": "Abrir perfil",

  // ---- profile page ----
  "profile.backHome": "Volver al inicio",
  "profile.title": "Perfil",
  "profile.subtitle": "Gestiona tu cuenta y configuración",
  "profile.memberSince": "Miembro desde {date}",
  "profile.editProfile": "Editar perfil",
  "profile.viewProfile": "Ver perfil completo",
  "profile.stats.points": "Puntos",
  "profile.stats.streak": "Racha",
  "profile.stats.completed": "Completados",
  "profile.level": "Nivel {level}",
  "profile.rank": "Aprendiz en ascenso",
  "profile.xpProgress": "Progreso al nivel {level}",
  "profile.xp": "{current} / {total} XP",

  // ---- subscription ----
  "premium.free.title": "Hazte Premium",
  "premium.free.subtitle":
    "Desbloquea todos los cursos, herramientas y retos exclusivos. Cancela cuando quieras.",
  "premium.free.cta": "Obtener Premium",
  "premium.badge": "PREMIUM",
  "premium.member": "Miembro Premium",
  "premium.manage": "Gestionar plan",
  "premium.modal.title": "Reallife 101 Premium",
  "premium.modal.subtitle": "Aprende más rápido con acceso ilimitado.",
  "premium.monthly": "Mensual",
  "premium.yearly": "Anual",
  "premium.perMonth": "/mes",
  "premium.perYear": "/año",
  "premium.bestValue": "Mejor valor · Ahorra 50%",
  "premium.feature1": "Acceso ilimitado a todos los cursos y recursos",
  "premium.feature2": "Aprendizaje sin anuncios",
  "premium.feature3": "Descargas sin conexión",
  "premium.feature4": "Retos e insignias exclusivos de Premium",
  "premium.feature5": "Soporte prioritario",
  "premium.cta": "Empieza tus 7 días gratis",
  "premium.ctaNote": "Después {price}. Cancela cuando quieras.",
  "premium.success": "¡Bienvenido a Premium! 🎉",
  "premium.renews": "Se renueva el {date}",
  "premium.trialEnds": "La prueba gratis termina el {date}",
  "premium.currentPlan": "Plan actual",
  "premium.cancel": "Cancelar suscripción",
  "premium.cancelNote":
    "Conservarás Premium hasta el final de tu periodo de facturación.",
  "premium.cancelConfirm": "Conservar Premium",
  "premium.cancelled": "Suscripción cancelada — ¡sentimos verte partir!",

  // ---- settings sections ----
  "section.preferences": "Preferencias",
  "section.account": "Cuenta",
  "section.support": "Soporte y legal",

  // ---- settings rows ----
  "settings.language": "Idioma de la app",
  "settings.languageDesc": "Cambia el idioma de la aplicación",
  "settings.autoplay": "Reproducir videos automáticamente",
  "settings.autoplayDesc": "Reproduce la siguiente lección automáticamente",
  "settings.notifications": "Notificaciones push",
  "settings.notificationsDesc": "Recordatorios de racha y contenido nuevo",
  "settings.offline": "Modo sin conexión",
  "settings.offlineDesc": "Descarga lecciones solo con Wi-Fi",
  "settings.reminder": "Recordatorio diario",
  "settings.reminderDesc": "Un empujón para mantener tu racha",
  "settings.editProfile": "Editar perfil",
  "settings.editProfileDesc": "Actualiza tu nombre y correo",
  "settings.password": "Cambiar contraseña",
  "settings.passwordDesc": "Te enviaremos un enlace seguro por correo",
  "settings.passwordSent":
    "Enlace para restablecer la contraseña enviado a tu correo",
  "settings.privacy": "Privacidad",
  "settings.privacyDesc": "Control de datos y privacidad",
  "settings.signOut": "Cerrar sesión",
  "settings.signOutMsg": "Sesión cerrada — ¡hasta pronto!",
  "settings.delete": "Eliminar cuenta",
  "settings.deleteDesc": "Elimina tu cuenta permanentemente",
  "settings.deleteMsg":
    "La eliminación de cuenta no está disponible en este prototipo",
  "settings.help": "Centro de ayuda",
  "settings.helpDesc": "Preguntas frecuentes y guías",
  "settings.contact": "Contáctanos",
  "settings.contactDesc": "Respondemos en menos de 24 h",
  "settings.rate": "Valora Reallife 101",
  "settings.rateDesc": "Cuéntanos qué tal lo hacemos",
  "settings.about": "Acerca de",
  "settings.aboutDesc": "Versión 1.0.0",

  // ---- language ----
  "language.title": "Idioma de la aplicación",
  "language.hint": "Se aplica al instante en toda la app",
  "language.changed": "Idioma cambiado a {language}",

  // ---- edit profile modal ----
  "edit.title": "Editar perfil",
  "edit.name": "Nombre visible",
  "edit.email": "Correo electrónico",
  "edit.save": "Guardar cambios",
  "edit.saved": "Perfil actualizado",
};

const fr: Record<TranslationKey, string> = {
  // ---- common ----
  "common.cancel": "Annuler",
  "common.save": "Enregistrer",
  "common.done": "Terminé",
  "common.version": "Version",
  "common.comingSoon": "bientôt disponible dans ce prototype",

  // ---- navigation ----
  "nav.home": "Accueil",
  "nav.courses": "Cours",
  "nav.explore": "Explorer",
  "nav.roadmap": "Parcours",
  "nav.more": "Plus",
  "nav.menu": "Menu",
  "nav.saved": "Enregistrés",
  "nav.challenges": "Défis",
  "nav.resources": "Ressources",
  "nav.profile": "Profil",

  // ---- tools ----
  "nav.tools": "Outils",
  "tools.budget": "Planificateur de budget",
  "tools.resume": "Créateur de CV",
  "tools.aiCoach": "Coach IA",
  "tools.hub.subtitle": "Des aides pratiques pour la vie réelle",
  "tools.hub.open": "Ouvrir l'outil",
  "tools.prototype": "Prototype",
  "tools.budget.desc": "Suivez revenus et dépenses avec la règle 50/30/20.",
  "tools.resume.desc": "Créez un CV soigné avec aperçu en direct.",
  "tools.aiCoach.desc": "Posez vos questions, recevez des conseils pratiques.",

  // ---- mobile header ----
  "header.search": "Rechercher des cours...",
  "header.notifications": "Notifications",
  "header.markAllRead": "Tout marquer comme lu",
  "header.openProfile": "Ouvrir le profil",

  // ---- profile page ----
  "profile.backHome": "Retour à l'accueil",
  "profile.title": "Profil",
  "profile.subtitle": "Gérez votre compte et vos réglages",
  "profile.memberSince": "Membre depuis {date}",
  "profile.editProfile": "Modifier le profil",
  "profile.viewProfile": "Voir le profil complet",
  "profile.stats.points": "Points",
  "profile.stats.streak": "Jours de série",
  "profile.stats.completed": "Terminés",
  "profile.level": "Niveau {level}",
  "profile.rank": "Apprenant en progression",
  "profile.xpProgress": "Progression vers le niveau {level}",
  "profile.xp": "{current} / {total} XP",

  // ---- subscription ----
  "premium.free.title": "Passez Premium",
  "premium.free.subtitle":
    "Débloquez tous les cours, outils et défis exclusifs. Annulable à tout moment.",
  "premium.free.cta": "Obtenir Premium",
  "premium.badge": "PREMIUM",
  "premium.member": "Membre Premium",
  "premium.manage": "Gérer l'abonnement",
  "premium.modal.title": "Reallife 101 Premium",
  "premium.modal.subtitle": "Apprenez plus vite avec un accès illimité.",
  "premium.monthly": "Mensuel",
  "premium.yearly": "Annuel",
  "premium.perMonth": "/mois",
  "premium.perYear": "/an",
  "premium.bestValue": "Meilleure offre · 50 % d'économie",
  "premium.feature1": "Accès illimité à tous les cours et ressources",
  "premium.feature2": "Apprentissage sans publicité",
  "premium.feature3": "Téléchargements hors ligne",
  "premium.feature4": "Défis et badges exclusifs Premium",
  "premium.feature5": "Assistance prioritaire",
  "premium.cta": "Essai gratuit de 7 jours",
  "premium.ctaNote": "Puis {price}. Annulable à tout moment.",
  "premium.success": "Bienvenue dans Premium ! 🎉",
  "premium.renews": "Renouvellement le {date}",
  "premium.trialEnds": "Fin de l'essai gratuit le {date}",
  "premium.currentPlan": "Formule actuelle",
  "premium.cancel": "Résilier l'abonnement",
  "premium.cancelNote":
    "Vous garderez Premium jusqu'à la fin de votre période de facturation.",
  "premium.cancelConfirm": "Garder Premium",
  "premium.cancelled": "Abonnement résilié — dommage de vous voir partir !",

  // ---- settings sections ----
  "section.preferences": "Préférences",
  "section.account": "Compte",
  "section.support": "Aide et mentions légales",

  // ---- settings rows ----
  "settings.language": "Langue de l'application",
  "settings.languageDesc": "Changer la langue de l'application",
  "settings.autoplay": "Lecture automatique des vidéos",
  "settings.autoplayDesc": "Lire la leçon suivante automatiquement",
  "settings.notifications": "Notifications push",
  "settings.notificationsDesc": "Rappels de série et nouveaux contenus",
  "settings.offline": "Mode hors ligne",
  "settings.offlineDesc": "Télécharger les leçons en Wi-Fi uniquement",
  "settings.reminder": "Rappel quotidien",
  "settings.reminderDesc": "Un petit rappel pour garder votre série",
  "settings.editProfile": "Modifier le profil",
  "settings.editProfileDesc": "Mettez à jour votre nom et votre e-mail",
  "settings.password": "Changer le mot de passe",
  "settings.passwordDesc": "Nous vous enverrons un lien sécurisé par e-mail",
  "settings.passwordSent":
    "Lien de réinitialisation envoyé à votre adresse e-mail",
  "settings.privacy": "Confidentialité",
  "settings.privacyDesc": "Contrôles des données et confidentialité",
  "settings.signOut": "Se déconnecter",
  "settings.signOutMsg": "Déconnecté — à bientôt !",
  "settings.delete": "Supprimer le compte",
  "settings.deleteDesc": "Supprimer définitivement votre compte",
  "settings.deleteMsg":
    "La suppression de compte n'est pas disponible dans ce prototype",
  "settings.help": "Centre d'aide",
  "settings.helpDesc": "FAQ et guides",
  "settings.contact": "Nous contacter",
  "settings.contactDesc": "Réponse en général sous 24 h",
  "settings.rate": "Notez Reallife 101",
  "settings.rateDesc": "Dites-nous ce que vous en pensez",
  "settings.about": "À propos",
  "settings.aboutDesc": "Version 1.0.0",

  // ---- language ----
  "language.title": "Langue de l'application",
  "language.hint": "Appliqué instantanément dans toute l'application",
  "language.changed": "Langue changée en {language}",

  // ---- edit profile modal ----
  "edit.title": "Modifier le profil",
  "edit.name": "Nom affiché",
  "edit.email": "E-mail",
  "edit.save": "Enregistrer les modifications",
  "edit.saved": "Profil mis à jour",
};

const zh: Record<TranslationKey, string> = {
  // ---- common ----
  "common.cancel": "取消",
  "common.save": "保存",
  "common.done": "完成",
  "common.version": "版本",
  "common.comingSoon": "即将在原型中推出",

  // ---- navigation ----
  "nav.home": "首页",
  "nav.courses": "课程",
  "nav.explore": "探索",
  "nav.roadmap": "路线图",
  "nav.more": "更多",
  "nav.menu": "菜单",
  "nav.saved": "收藏",
  "nav.challenges": "挑战",
  "nav.resources": "资源",
  "nav.profile": "我的",

  // ---- tools ----
  "nav.tools": "工具",
  "tools.budget": "预算规划器",
  "tools.resume": "简历生成器",
  "tools.aiCoach": "AI 教练",
  "tools.hub.subtitle": "实用的人生小助手",
  "tools.hub.open": "打开工具",
  "tools.prototype": "原型演示",
  "tools.budget.desc": "用 50/30/20 法则管理收入与支出。",
  "tools.resume.desc": "创建简洁简历，实时预览效果。",
  "tools.aiCoach.desc": "随便提问，获得友好实用的建议。",

  // ---- mobile header ----
  "header.search": "搜索课程…",
  "header.notifications": "通知",
  "header.markAllRead": "全部标为已读",
  "header.openProfile": "打开个人资料",

  // ---- profile page ----
  "profile.backHome": "返回首页",
  "profile.title": "个人资料",
  "profile.subtitle": "管理你的账户与设置",
  "profile.memberSince": "加入于 {date}",
  "profile.editProfile": "编辑资料",
  "profile.viewProfile": "查看完整资料",
  "profile.stats.points": "积分",
  "profile.stats.streak": "连续天数",
  "profile.stats.completed": "已完成",
  "profile.level": "等级 {level}",
  "profile.rank": "进阶学习者",
  "profile.xpProgress": "距离等级 {level}",
  "profile.xp": "{current} / {total} XP",

  // ---- subscription ----
  "premium.free.title": "升级高级版",
  "premium.free.subtitle": "解锁全部课程、工具和专属挑战。随时可取消。",
  "premium.free.cta": "获取高级版",
  "premium.badge": "高级版",
  "premium.member": "高级会员",
  "premium.manage": "管理订阅",
  "premium.modal.title": "Reallife 101 高级版",
  "premium.modal.subtitle": "无限访问，学得更快。",
  "premium.monthly": "按月",
  "premium.yearly": "按年",
  "premium.perMonth": "/月",
  "premium.perYear": "/年",
  "premium.bestValue": "最超值 · 立省 50%",
  "premium.feature1": "无限访问全部课程与资源",
  "premium.feature2": "无广告学习体验",
  "premium.feature3": "离线下载",
  "premium.feature4": "专属高级挑战与徽章",
  "premium.feature5": "优先客服支持",
  "premium.cta": "开始 7 天免费试用",
  "premium.ctaNote": "试用期后 {price}。随时可取消。",
  "premium.success": "欢迎加入高级版！🎉",
  "premium.renews": "将于 {date} 续订",
  "premium.trialEnds": "免费试用将于 {date} 结束",
  "premium.currentPlan": "当前方案",
  "premium.cancel": "取消订阅",
  "premium.cancelNote": "在当前计费周期结束前仍可继续使用高级版。",
  "premium.cancelConfirm": "保留高级版",
  "premium.cancelled": "订阅已取消 — 感谢你的使用！",

  // ---- settings sections ----
  "section.preferences": "偏好设置",
  "section.account": "账户",
  "section.support": "支持与条款",

  // ---- settings rows ----
  "settings.language": "应用语言",
  "settings.languageDesc": "更改应用显示语言",
  "settings.autoplay": "自动播放视频",
  "settings.autoplayDesc": "自动播放下一课",
  "settings.notifications": "推送通知",
  "settings.notificationsDesc": "连续学习提醒与新内容通知",
  "settings.offline": "离线模式",
  "settings.offlineDesc": "仅通过 Wi-Fi 下载课程",
  "settings.reminder": "每日提醒",
  "settings.reminderDesc": "提醒你保持连续学习",
  "settings.editProfile": "编辑资料",
  "settings.editProfileDesc": "更新你的姓名和邮箱",
  "settings.password": "修改密码",
  "settings.passwordDesc": "我们将通过邮件发送安全重置链接",
  "settings.passwordSent": "密码重置链接已发送至你的邮箱",
  "settings.privacy": "隐私",
  "settings.privacyDesc": "数据与隐私控制",
  "settings.signOut": "退出登录",
  "settings.signOutMsg": "已退出登录 — 再见！",
  "settings.delete": "删除账户",
  "settings.deleteDesc": "永久删除你的账户",
  "settings.deleteMsg": "此原型暂不支持删除账户",
  "settings.help": "帮助中心",
  "settings.helpDesc": "常见问题与指南",
  "settings.contact": "联系我们",
  "settings.contactDesc": "通常 24 小时内回复",
  "settings.rate": "为 Reallife 101 评分",
  "settings.rateDesc": "告诉我们你的感受",
  "settings.about": "关于",
  "settings.aboutDesc": "版本 1.0.0",

  // ---- language ----
  "language.title": "应用语言",
  "language.hint": "更改后立即在整个应用生效",
  "language.changed": "语言已切换为 {language}",

  // ---- edit profile modal ----
  "edit.title": "编辑资料",
  "edit.name": "显示名称",
  "edit.email": "邮箱",
  "edit.save": "保存更改",
  "edit.saved": "资料已更新",
};

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  es,
  fr,
  zh,
};

/** Look up `key` in `locale`, falling back to English, then interpolate `{vars}`. */
export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const dict = translations[locale] ?? en;
  let text = dict[key] ?? en[key] ?? String(key);
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

/** BCP 47 tag for date/number formatting (Chinese uses zh-CN). */
export function localeTag(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : locale;
}
