export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Header
    timer: 'Timer',
    history: 'History',
    signIn: 'Sign In',
    logout: 'Logout',
    
    // Hero
    heroTagline: 'Focus. Work. Achieve.',
    heroSubtitle: 'Free online timer for Pomodoro sessions, deep work, and study time',
    startFocusing: 'Start focusing instantly',
    
    // Timer modes
    pomodoro: 'Pomodoro',
    deepFocus: 'Deep Focus',
    custom: 'Custom',
    customDuration: 'Custom Duration (minutes)',
    
    // Timer states
    focusing: 'Focusing...',
    paused: 'Paused',
    readyToFocus: 'Ready to focus',
    sessionCompleted: 'Session Completed!',
    sessionCompletedDesc: 'Fantastic work! You\'ve completed a {duration}-minute focus session.',
    sessionSaved: 'Session saved to your history!',
    
    // Controls
    start: 'Start',
    pause: 'Pause',
    stop: 'Stop',
    reset: 'Reset',
    
    // Instructions
    timerInstructions: 'Click on the timer to start, pause, or resume your session',
    
    // Stats
    todaysFocus: 'Today\'s Focus',
    thisWeek: 'This Week',
    streak: 'Streak',
    totalSessions: 'Total Sessions',
    days: 'days',
    
    // History page
    focusHistory: 'Your Focus Journey',
    productivityInsights: 'Your productivity insights',
    historySubtitle: 'Track your productivity and build better focus habits with detailed analytics and insights',
    totalFocusTime: 'Total Focus Time',
    sessionsCompleted: 'Sessions Completed',
    averageSession: 'Average Session',
    currentStreak: 'Current Streak',
    completionRate: 'completion rate',
    perSession: 'per completed session',
    best: 'Best',
    productivityTrends: 'Productivity Trends',
    trendsSubtitle: 'Visualize your focus patterns over time',
    recentSessions: 'Recent Sessions',
    recentSessionsSubtitle: 'Your latest focus activities',
    exportCsv: 'Export CSV',
    noSessions: 'No sessions yet',
    noSessionsDesc: 'Start your first focus session to see your progress here!',
    startFirstSession: 'Start Your First Session',
    
    // Time ranges
    last7Days: 'Last 7 days',
    last30Days: 'Last 30 days',
    last90Days: 'Last 90 days',
    
    // Chart types
    sessions: 'Sessions',
    focusTime: 'Focus Time',
    line: 'Line',
    bar: 'Bar',
    
    // Auth
    welcomeTo: 'Welcome to',
    authSubtitle: 'Sign in to track your focus sessions and boost productivity',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    continueWithGoogle: 'Continue with Google',
    orContinueWith: 'or continue with email',
    demoCredentials: 'Demo Credentials',
    
    // Common
    minutes: 'minutes',
    minute: 'minute',
    hour: 'hour',
    hours: 'hours',
    session: 'session',
    completed: 'Completed',
    loading: 'Loading...',
    
    // Notifications
    sessionSavedTitle: 'Session Saved!',
    sessionSavedDesc: 'Your {duration}-minute session has been saved to history.',
    welcomeBack: 'Welcome back!',
    welcomeBackDesc: 'You\'ve successfully signed in to FocusFlow.',
    accountCreated: 'Account created!',
    accountCreatedDesc: 'Welcome to FocusFlow! You can now start tracking your focus sessions.',
    
    // History page specific
    loadingHistory: 'Loading your focus history...',
    signInToViewHistory: 'Sign in to view your history',
    trackSessionsDesc: 'Track your focus sessions and productivity analytics',
    acrossAllSessions: 'across all sessions',
    noChartData: 'No chart data available',
    of: 'of',
    loadingFailed: 'Loading Failed',
    loadingFailedDesc: 'Couldn\'t load your history. Please refresh the page.',
    noData: 'No Data',
    noDataDesc: 'No sessions to export.',
    exportSuccessful: 'Export Successful',
    exportSuccessfulDesc: 'Your session data has been exported to CSV.',
    
    // Notifications
    notificationsEnabled: 'Notifications Enabled',
    notificationsDisabled: 'Notifications Disabled',
    soundEnabled: 'Sound Enabled',
    soundDisabled: 'Sound Disabled',
    notificationPermissionGranted: 'You\'ll be notified when your focus session completes.',
    notificationPermissionDenied: 'Please enable notifications in your browser settings.',
    notificationStatusEnabled: 'Browser notifications enabled - you\'ll be alerted when your session completes',
    notificationStatusDisabled: 'Enable notifications to get alerted when your session completes',
    
    // Settings page
    settings: 'Settings',
    accountSettings: 'Account Settings',
    settingsSubtitle: 'Manage your account preferences and profile information',
    signInToViewSettings: 'Sign in to view your settings',
    settingsRequireAuth: 'You need to sign in to access your account settings',
    profileInformation: 'Profile Information',
    profileDesc: 'Manage your personal information and account details',
    displayName: 'Display Name',
    emailAddress: 'Email Address',
    memberSince: 'Member Since',
    verified: 'Verified',
    preferences: 'Preferences',
    dataPrivacy: 'Data & Privacy',
    exportData: 'Export My Data',
    deleteAccount: 'Delete Account',
    accountStats: 'Account Statistics',
    accountStatsDesc: 'Your FocusFlow journey at a glance',
    enabled: 'Enabled',
    language: 'Language',
    notifications: 'Notifications',
    nameUpdated: 'Name Updated',
    nameUpdatedDesc: 'Your display name has been successfully updated.',
    noDisplayName: 'No display name set',
    enterDisplayName: 'Enter your display name',
  },
  
  es: {
    // Header
    timer: 'Temporizador',
    history: 'Historial',
    signIn: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    
    // Hero
    heroTagline: 'Enfócate. Trabaja. Logra.',
    heroSubtitle: 'Temporizador online gratuito para sesiones Pomodoro, trabajo profundo y tiempo de estudio',
    startFocusing: 'Comienza a enfocarte al instante',
    
    // Timer modes
    pomodoro: 'Pomodoro',
    deepFocus: 'Enfoque Profundo',
    custom: 'Personalizado',
    customDuration: 'Duración Personalizada (minutos)',
    
    // Timer states
    focusing: 'Enfocándose...',
    paused: 'Pausado',
    readyToFocus: 'Listo para enfocar',
    sessionCompleted: '¡Sesión Completada!',
    sessionCompletedDesc: '¡Trabajo fantástico! Has completado una sesión de enfoque de {duration} minutos.',
    sessionSaved: '¡Sesión guardada en tu historial!',
    
    // Controls
    start: 'Iniciar',
    pause: 'Pausar',
    stop: 'Detener',
    reset: 'Reiniciar',
    
    // Instructions
    timerInstructions: 'Haz clic en el temporizador para iniciar, pausar o reanudar tu sesión',
    
    // Stats
    todaysFocus: 'Enfoque de Hoy',
    thisWeek: 'Esta Semana',
    streak: 'Racha',
    totalSessions: 'Sesiones Totales',
    days: 'días',
    
    // History page
    focusHistory: 'Tu Viaje de Enfoque',
    productivityInsights: 'Tus perspectivas de productividad',
    historySubtitle: 'Rastrea tu productividad y construye mejores hábitos de enfoque con análisis detallados',
    totalFocusTime: 'Tiempo Total de Enfoque',
    sessionsCompleted: 'Sesiones Completadas',
    averageSession: 'Sesión Promedio',
    currentStreak: 'Racha Actual',
    completionRate: 'tasa de finalización',
    perSession: 'por sesión completada',
    best: 'Mejor',
    productivityTrends: 'Tendencias de Productividad',
    trendsSubtitle: 'Visualiza tus patrones de enfoque a lo largo del tiempo',
    recentSessions: 'Sesiones Recientes',
    recentSessionsSubtitle: 'Tus actividades de enfoque más recientes',
    exportCsv: 'Exportar CSV',
    noSessions: 'Aún no hay sesiones',
    noSessionsDesc: '¡Inicia tu primera sesión de enfoque para ver tu progreso aquí!',
    startFirstSession: 'Inicia Tu Primera Sesión',
    
    // Time ranges
    last7Days: 'Últimos 7 días',
    last30Days: 'Últimos 30 días',
    last90Days: 'Últimos 90 días',
    
    // Chart types
    sessions: 'Sesiones',
    focusTime: 'Tiempo de Enfoque',
    line: 'Línea',
    bar: 'Barra',
    
    // Auth
    welcomeTo: 'Bienvenido a',
    authSubtitle: 'Inicia sesión para rastrear tus sesiones de enfoque y aumentar la productividad',
    signUp: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    createAccount: 'Crear Cuenta',
    continueWithGoogle: 'Continuar con Google',
    orContinueWith: 'o continuar con correo electrónico',
    demoCredentials: 'Credenciales de Demo',
    
    // Common
    minutes: 'minutos',
    minute: 'minuto',
    hour: 'hora',
    hours: 'horas',
    session: 'sesión',
    completed: 'Completado',
    loading: 'Cargando...',
    
    // Notifications
    sessionSavedTitle: '¡Sesión Guardada!',
    sessionSavedDesc: 'Tu sesión de {duration} minutos ha sido guardada en el historial.',
    welcomeBack: '¡Bienvenido de vuelta!',
    welcomeBackDesc: 'Has iniciado sesión exitosamente en FocusFlow.',
    accountCreated: '¡Cuenta creada!',
    accountCreatedDesc: '¡Bienvenido a FocusFlow! Ahora puedes comenzar a rastrear tus sesiones de enfoque.',
    
    // History page specific
    loadingHistory: 'Cargando tu historial de enfoque...',
    signInToViewHistory: 'Inicia sesión para ver tu historial',
    trackSessionsDesc: 'Rastrea tus sesiones de enfoque y análisis de productividad',
    acrossAllSessions: 'en todas las sesiones',
    noChartData: 'No hay datos de gráfico disponibles',
    of: 'de',
    loadingFailed: 'Error de Carga',
    loadingFailedDesc: 'No se pudo cargar tu historial. Por favor actualiza la página.',
    noData: 'Sin Datos',
    noDataDesc: 'No hay sesiones para exportar.',
    exportSuccessful: 'Exportación Exitosa',
    exportSuccessfulDesc: 'Tus datos de sesión han sido exportados a CSV.',
    
    // Notifications
    notificationsEnabled: 'Notificaciones Habilitadas',
    notificationsDisabled: 'Notificaciones Deshabilitadas',
    soundEnabled: 'Sonido Habilitado',
    soundDisabled: 'Sonido Deshabilitado',
    notificationPermissionGranted: 'Serás notificado cuando tu sesión de enfoque se complete.',
    notificationPermissionDenied: 'Por favor habilita las notificaciones en la configuración de tu navegador.',
    notificationStatusEnabled: 'Notificaciones del navegador habilitadas - serás alertado cuando tu sesión se complete',
    notificationStatusDisabled: 'Habilita las notificaciones para ser alertado cuando tu sesión se complete',
    
    // Settings page
    settings: 'Configuración',
    accountSettings: 'Configuración de Cuenta',
    settingsSubtitle: 'Gestiona las preferencias de tu cuenta e información del perfil',
    signInToViewSettings: 'Inicia sesión para ver tu configuración',
    settingsRequireAuth: 'Necesitas iniciar sesión para acceder a la configuración de tu cuenta',
    profileInformation: 'Información del Perfil',
    profileDesc: 'Gestiona tu información personal y detalles de la cuenta',
    displayName: 'Nombre para Mostrar',
    emailAddress: 'Dirección de Correo Electrónico',
    memberSince: 'Miembro Desde',
    verified: 'Verificado',
    preferences: 'Preferencias',
    dataPrivacy: 'Datos y Privacidad',
    exportData: 'Exportar Mis Datos',
    deleteAccount: 'Eliminar Cuenta',
    accountStats: 'Estadísticas de Cuenta',
    accountStatsDesc: 'Tu viaje en FocusFlow de un vistazo',
    enabled: 'Habilitado',
    language: 'Idioma',
    notifications: 'Notificaciones',
    nameUpdated: 'Nombre Actualizado',
    nameUpdatedDesc: 'Tu nombre para mostrar ha sido actualizado exitosamente.',
    noDisplayName: 'No hay nombre para mostrar establecido',
    enterDisplayName: 'Ingresa tu nombre para mostrar',
  },
  
  fr: {
    // Header
    timer: 'Minuteur',
    history: 'Historique',
    signIn: 'Se Connecter',
    logout: 'Déconnexion',
    
    // Hero
    heroTagline: 'Concentrez. Travaillez. Réussissez.',
    heroSubtitle: 'Minuteur en ligne gratuit pour les sessions Pomodoro, le travail profond et le temps d\'étude',
    startFocusing: 'Commencez à vous concentrer instantanément',
    
    // Timer modes
    pomodoro: 'Pomodoro',
    deepFocus: 'Concentration Profonde',
    custom: 'Personnalisé',
    customDuration: 'Durée Personnalisée (minutes)',
    
    // Timer states
    focusing: 'Concentration...',
    paused: 'En Pause',
    readyToFocus: 'Prêt à se concentrer',
    sessionCompleted: 'Session Terminée !',
    sessionCompletedDesc: 'Travail fantastique ! Vous avez terminé une session de concentration de {duration} minutes.',
    sessionSaved: 'Session sauvegardée dans votre historique !',
    
    // Controls
    start: 'Démarrer',
    pause: 'Pause',
    stop: 'Arrêter',
    reset: 'Réinitialiser',
    
    // Instructions
    timerInstructions: 'Cliquez sur le minuteur pour démarrer, mettre en pause ou reprendre votre session',
    
    // Stats
    todaysFocus: 'Concentration d\'Aujourd\'hui',
    thisWeek: 'Cette Semaine',
    streak: 'Série',
    totalSessions: 'Sessions Totales',
    days: 'jours',
    
    // History page
    focusHistory: 'Votre Parcours de Concentration',
    productivityInsights: 'Vos perspectives de productivité',
    historySubtitle: 'Suivez votre productivité et développez de meilleures habitudes de concentration avec des analyses détaillées',
    totalFocusTime: 'Temps Total de Concentration',
    sessionsCompleted: 'Sessions Terminées',
    averageSession: 'Session Moyenne',
    currentStreak: 'Série Actuelle',
    completionRate: 'taux de réussite',
    perSession: 'par session terminée',
    best: 'Meilleur',
    productivityTrends: 'Tendances de Productivité',
    trendsSubtitle: 'Visualisez vos modèles de concentration au fil du temps',
    recentSessions: 'Sessions Récentes',
    recentSessionsSubtitle: 'Vos dernières activités de concentration',
    exportCsv: 'Exporter CSV',
    noSessions: 'Aucune session encore',
    noSessionsDesc: 'Commencez votre première session de concentration pour voir vos progrès ici !',
    startFirstSession: 'Commencer Votre Première Session',
    
    // Time ranges
    last7Days: '7 derniers jours',
    last30Days: '30 derniers jours',
    last90Days: '90 derniers jours',
    
    // Chart types
    sessions: 'Sessions',
    focusTime: 'Temps de Concentration',
    line: 'Ligne',
    bar: 'Barre',
    
    // Auth
    welcomeTo: 'Bienvenue à',
    authSubtitle: 'Connectez-vous pour suivre vos sessions de concentration et augmenter la productivité',
    signUp: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    createAccount: 'Créer un Compte',
    continueWithGoogle: 'Continuer avec Google',
    orContinueWith: 'ou continuer avec email',
    demoCredentials: 'Identifiants de Démo',
    
    // Common
    minutes: 'minutes',
    minute: 'minute',
    hour: 'heure',
    hours: 'heures',
    session: 'session',
    completed: 'Terminé',
    loading: 'Chargement...',
    
    // Notifications
    sessionSavedTitle: 'Session Sauvegardée !',
    sessionSavedDesc: 'Votre session de {duration} minutes a été sauvegardée dans l\'historique.',
    welcomeBack: 'Bon retour !',
    welcomeBackDesc: 'Vous vous êtes connecté avec succès à FocusFlow.',
    accountCreated: 'Compte créé !',
    accountCreatedDesc: 'Bienvenue à FocusFlow ! Vous pouvez maintenant commencer à suivre vos sessions de concentration.',
    
    // History page specific
    loadingHistory: 'Chargement de votre historique de concentration...',
    signInToViewHistory: 'Connectez-vous pour voir votre historique',
    trackSessionsDesc: 'Suivez vos sessions de concentration et analyses de productivité',
    acrossAllSessions: 'sur toutes les sessions',
    noChartData: 'Aucune donnée de graphique disponible',
    of: 'de',
    loadingFailed: 'Échec du Chargement',
    loadingFailedDesc: 'Impossible de charger votre historique. Veuillez actualiser la page.',
    noData: 'Aucune Donnée',
    noDataDesc: 'Aucune session à exporter.',
    exportSuccessful: 'Exportation Réussie',
    exportSuccessfulDesc: 'Vos données de session ont été exportées en CSV.',
    
    // Notifications
    notificationsEnabled: 'Notifications Activées',
    notificationsDisabled: 'Notifications Désactivées',
    soundEnabled: 'Son Activé',
    soundDisabled: 'Son Désactivé',
    notificationPermissionGranted: 'Vous serez notifié lorsque votre session de concentration se termine.',
    notificationPermissionDenied: 'Veuillez activer les notifications dans les paramètres de votre navigateur.',
    notificationStatusEnabled: 'Notifications du navigateur activées - vous serez alerté lorsque votre session se termine',
    notificationStatusDisabled: 'Activez les notifications pour être alerté lorsque votre session se termine',
    
    // Settings page
    settings: 'Paramètres',
    accountSettings: 'Paramètres du Compte',
    settingsSubtitle: 'Gérez vos préférences de compte et informations de profil',
    signInToViewSettings: 'Connectez-vous pour voir vos paramètres',
    settingsRequireAuth: 'Vous devez vous connecter pour accéder aux paramètres de votre compte',
    profileInformation: 'Informations du Profil',
    profileDesc: 'Gérez vos informations personnelles et détails du compte',
    displayName: 'Nom d\'Affichage',
    emailAddress: 'Adresse Email',
    memberSince: 'Membre Depuis',
    verified: 'Vérifié',
    preferences: 'Préférences',
    dataPrivacy: 'Données et Confidentialité',
    exportData: 'Exporter Mes Données',
    deleteAccount: 'Supprimer le Compte',
    accountStats: 'Statistiques du Compte',
    accountStatsDesc: 'Votre parcours FocusFlow en un coup d\'œil',
    enabled: 'Activé',
    language: 'Langue',
    notifications: 'Notifications',
    nameUpdated: 'Nom Mis à Jour',
    nameUpdatedDesc: 'Votre nom d\'affichage a été mis à jour avec succès.',
    noDisplayName: 'Aucun nom d\'affichage défini',
    enterDisplayName: 'Entrez votre nom d\'affichage',
  },
  
  de: {
    // Header
    timer: 'Timer',
    history: 'Verlauf',
    signIn: 'Anmelden',
    logout: 'Abmelden',
    
    // Hero
    heroTagline: 'Fokussieren. Arbeiten. Erreichen.',
    heroSubtitle: 'Kostenloser Online-Timer für Pomodoro-Sitzungen, tiefe Arbeit und Lernzeit',
    startFocusing: 'Sofort mit dem Fokussieren beginnen',
    
    // Timer modes
    pomodoro: 'Pomodoro',
    deepFocus: 'Tiefe Konzentration',
    custom: 'Benutzerdefiniert',
    customDuration: 'Benutzerdefinierte Dauer (Minuten)',
    
    // Timer states
    focusing: 'Fokussierung...',
    paused: 'Pausiert',
    readyToFocus: 'Bereit zum Fokussieren',
    sessionCompleted: 'Sitzung Abgeschlossen!',
    sessionCompletedDesc: 'Fantastische Arbeit! Sie haben eine {duration}-minütige Fokussitzung abgeschlossen.',
    sessionSaved: 'Sitzung in Ihrem Verlauf gespeichert!',
    
    // Controls
    start: 'Starten',
    pause: 'Pausieren',
    stop: 'Stoppen',
    reset: 'Zurücksetzen',
    
    // Instructions
    timerInstructions: 'Klicken Sie auf den Timer, um Ihre Sitzung zu starten, zu pausieren oder fortzusetzen',
    
    // Stats
    todaysFocus: 'Heutiger Fokus',
    thisWeek: 'Diese Woche',
    streak: 'Serie',
    totalSessions: 'Gesamte Sitzungen',
    days: 'Tage',
    
    // History page
    focusHistory: 'Ihre Fokus-Reise',
    productivityInsights: 'Ihre Produktivitätseinblicke',
    historySubtitle: 'Verfolgen Sie Ihre Produktivität und entwickeln Sie bessere Fokusgewohnheiten mit detaillierten Analysen',
    totalFocusTime: 'Gesamte Fokuszeit',
    sessionsCompleted: 'Abgeschlossene Sitzungen',
    averageSession: 'Durchschnittliche Sitzung',
    currentStreak: 'Aktuelle Serie',
    completionRate: 'Abschlussrate',
    perSession: 'pro abgeschlossener Sitzung',
    best: 'Beste',
    productivityTrends: 'Produktivitätstrends',
    trendsSubtitle: 'Visualisieren Sie Ihre Fokusmuster über die Zeit',
    recentSessions: 'Letzte Sitzungen',
    recentSessionsSubtitle: 'Ihre neuesten Fokusaktivitäten',
    exportCsv: 'CSV Exportieren',
    noSessions: 'Noch keine Sitzungen',
    noSessionsDesc: 'Starten Sie Ihre erste Fokussitzung, um hier Ihren Fortschritt zu sehen!',
    startFirstSession: 'Ihre Erste Sitzung Starten',
    
    // Time ranges
    last7Days: 'Letzte 7 Tage',
    last30Days: 'Letzte 30 Tage',
    last90Days: 'Letzte 90 Tage',
    
    // Chart types
    sessions: 'Sitzungen',
    focusTime: 'Fokuszeit',
    line: 'Linie',
    bar: 'Balken',
    
    // Auth
    welcomeTo: 'Willkommen bei',
    authSubtitle: 'Melden Sie sich an, um Ihre Fokussitzungen zu verfolgen und die Produktivität zu steigern',
    signUp: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort Bestätigen',
    createAccount: 'Konto Erstellen',
    continueWithGoogle: 'Mit Google Fortfahren',
    orContinueWith: 'oder mit E-Mail fortfahren',
    demoCredentials: 'Demo-Anmeldedaten',
    
    // Common
    minutes: 'Minuten',
    minute: 'Minute',
    hour: 'Stunde',
    hours: 'Stunden',
    session: 'Sitzung',
    completed: 'Abgeschlossen',
    loading: 'Laden...',
    
    // Notifications
    sessionSavedTitle: 'Sitzung Gespeichert!',
    sessionSavedDesc: 'Ihre {duration}-minütige Sitzung wurde im Verlauf gespeichert.',
    welcomeBack: 'Willkommen zurück!',
    welcomeBackDesc: 'Sie haben sich erfolgreich bei FocusFlow angemeldet.',
    accountCreated: 'Konto erstellt!',
    accountCreatedDesc: 'Willkommen bei FocusFlow! Sie können jetzt mit der Verfolgung Ihrer Fokussitzungen beginnen.',
    
    // History page specific
    loadingHistory: 'Lade Ihren Fokusverlauf...',
    signInToViewHistory: 'Melden Sie sich an, um Ihren Verlauf zu sehen',
    trackSessionsDesc: 'Verfolgen Sie Ihre Fokussitzungen und Produktivitätsanalysen',
    acrossAllSessions: 'über alle Sitzungen',
    noChartData: 'Keine Diagrammdaten verfügbar',
    of: 'von',
    loadingFailed: 'Laden Fehlgeschlagen',
    loadingFailedDesc: 'Ihr Verlauf konnte nicht geladen werden. Bitte aktualisieren Sie die Seite.',
    noData: 'Keine Daten',
    noDataDesc: 'Keine Sitzungen zum Exportieren.',
    exportSuccessful: 'Export Erfolgreich',
    exportSuccessfulDesc: 'Ihre Sitzungsdaten wurden als CSV exportiert.',
    
    // Notifications
    notificationsEnabled: 'Benachrichtigungen Aktiviert',
    notificationsDisabled: 'Benachrichtigungen Deaktiviert',
    soundEnabled: 'Ton Aktiviert',
    soundDisabled: 'Ton Deaktiviert',
    notificationPermissionGranted: 'Sie werden benachrichtigt, wenn Ihre Fokussitzung abgeschlossen ist.',
    notificationPermissionDenied: 'Bitte aktivieren Sie Benachrichtigungen in Ihren Browsereinstellungen.',
    notificationStatusEnabled: 'Browser-Benachrichtigungen aktiviert - Sie werden benachrichtigt, wenn Ihre Sitzung abgeschlossen ist',
    notificationStatusDisabled: 'Aktivieren Sie Benachrichtigungen, um benachrichtigt zu werden, wenn Ihre Sitzung abgeschlossen ist',
    
    // Settings page
    settings: 'Einstellungen',
    accountSettings: 'Kontoeinstellungen',
    settingsSubtitle: 'Verwalten Sie Ihre Kontopräferenzen und Profilinformationen',
    signInToViewSettings: 'Melden Sie sich an, um Ihre Einstellungen zu sehen',
    settingsRequireAuth: 'Sie müssen sich anmelden, um auf Ihre Kontoeinstellungen zuzugreifen',
    profileInformation: 'Profilinformationen',
    profileDesc: 'Verwalten Sie Ihre persönlichen Informationen und Kontodetails',
    displayName: 'Anzeigename',
    emailAddress: 'E-Mail-Adresse',
    memberSince: 'Mitglied Seit',
    verified: 'Verifiziert',
    preferences: 'Präferenzen',
    dataPrivacy: 'Daten und Datenschutz',
    exportData: 'Meine Daten Exportieren',
    deleteAccount: 'Konto Löschen',
    accountStats: 'Kontostatistiken',
    accountStatsDesc: 'Ihre FocusFlow-Reise auf einen Blick',
    enabled: 'Aktiviert',
    language: 'Sprache',
    notifications: 'Benachrichtigungen',
    nameUpdated: 'Name Aktualisiert',
    nameUpdatedDesc: 'Ihr Anzeigename wurde erfolgreich aktualisiert.',
    noDisplayName: 'Kein Anzeigename festgelegt',
    enterDisplayName: 'Geben Sie Ihren Anzeigenamen ein',
  },
  
  hi: {
    // Header
    timer: 'टाइमर',
    history: 'इतिहास',
    signIn: 'साइन इन',
    logout: 'लॉगआउट',
    
    // Hero
    heroTagline: 'फोकस करें। काम करें। हासिल करें।',
    heroSubtitle: 'पोमोडोरो सेशन, गहरे काम और अध्ययन समय के लिए मुफ्त ऑनलाइन टाइमर',
    startFocusing: 'तुरंत फोकस करना शुरू करें',
    
    // Timer modes
    pomodoro: 'पोमोडोरो',
    deepFocus: 'गहरा फोकस',
    custom: 'कस्टम',
    customDuration: 'कस्टम अवधि (मिनट)',
    
    // Timer states
    focusing: 'फोकस कर रहे हैं...',
    paused: 'रोका गया',
    readyToFocus: 'फोकस के लिए तैयार',
    sessionCompleted: 'सेशन पूरा हुआ!',
    sessionCompletedDesc: 'शानदार काम! आपने {duration} मिनट का फोकस सेशन पूरा किया है।',
    sessionSaved: 'सेशन आपके इतिहास में सहेजा गया!',
    
    // Controls
    start: 'शुरू करें',
    pause: 'रोकें',
    stop: 'बंद करें',
    reset: 'रीसेट करें',
    
    // Instructions
    timerInstructions: 'अपना सेशन शुरू करने, रोकने या फिर से शुरू करने के लिए टाइमर पर क्लिक करें',
    
    // Stats
    todaysFocus: 'आज का फोकस',
    thisWeek: 'इस सप्ताह',
    streak: 'लगातार',
    totalSessions: 'कुल सेशन',
    days: 'दिन',
    
    // History page
    focusHistory: 'आपकी फोकस यात्रा',
    productivityInsights: 'आपकी उत्पादकता अंतर्दृष्टि',
    historySubtitle: 'विस्तृत विश्लेषण और अंतर्दृष्टि के साथ अपनी उत्पादकता को ट्रैक करें और बेहतर फोकस आदतें बनाएं',
    totalFocusTime: 'कुल फोकस समय',
    sessionsCompleted: 'पूरे किए गए सेशन',
    averageSession: 'औसत सेशन',
    currentStreak: 'वर्तमान लगातार',
    completionRate: 'पूर्णता दर',
    perSession: 'प्रति पूर्ण सेशन',
    best: 'सर्वश्रेष्ठ',
    productivityTrends: 'उत्पादकता रुझान',
    trendsSubtitle: 'समय के साथ अपने फोकस पैटर्न को देखें',
    recentSessions: 'हाल के सेशन',
    recentSessionsSubtitle: 'आपकी नवीनतम फोकस गतिविधियां',
    exportCsv: 'CSV निर्यात करें',
    noSessions: 'अभी तक कोई सेशन नहीं',
    noSessionsDesc: 'यहां अपनी प्रगति देखने के लिए अपना पहला फोकस सेशन शुरू करें!',
    startFirstSession: 'अपना पहला सेशन शुरू करें',
    
    // Time ranges
    last7Days: 'पिछले 7 दिन',
    last30Days: 'पिछले 30 दिन',
    last90Days: 'पिछले 90 दिन',
    
    // Chart types
    sessions: 'सेशन',
    focusTime: 'फोकस समय',
    line: 'लाइन',
    bar: 'बार',
    
    // Auth
    welcomeTo: 'स्वागत है',
    authSubtitle: 'अपने फोकस सेशन को ट्रैक करने और उत्पादकता बढ़ाने के लिए साइन इन करें',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    createAccount: 'खाता बनाएं',
    continueWithGoogle: 'Google के साथ जारी रखें',
    orContinueWith: 'या ईमेल के साथ जारी रखें',
    demoCredentials: 'डेमो क्रेडेंशियल',
    
    // Common
    minutes: 'मिनट',
    minute: 'मिनट',
    hour: 'घंटा',
    hours: 'घंटे',
    session: 'सेशन',
    completed: 'पूर्ण',
    loading: 'लोड हो रहा है...',
    
    // Notifications
    sessionSavedTitle: 'सेशन सहेजा गया!',
    sessionSavedDesc: 'आपका {duration} मिनट का सेशन इतिहास में सहेजा गया है।',
    welcomeBack: 'वापस स्वागत है!',
    welcomeBackDesc: 'आपने सफलतापूर्वक FocusFlow में साइन इन किया है।',
    accountCreated: 'खाता बनाया गया!',
    accountCreatedDesc: 'FocusFlow में आपका स्वागत है! अब आप अपने फोकस सेशन को ट्रैक करना शुरू कर सकते हैं।',
    
    // History page specific
    loadingHistory: 'आपका फोकस इतिहास लोड हो रहा है...',
    signInToViewHistory: 'अपना इतिहास देखने के लिए साइन इन करें',
    trackSessionsDesc: 'अपने फोकस सेशन और उत्पादकता विश्लेषण को ट्रैक करें',
    acrossAllSessions: 'सभी सेशन में',
    noChartData: 'कोई चार्ट डेटा उपलब्ध नहीं',
    of: 'का',
    loadingFailed: 'लोडिंग असफल',
    loadingFailedDesc: 'आपका इतिहास लोड नहीं हो सका। कृपया पेज को रिफ्रेश करें।',
    noData: 'कोई डेटा नहीं',
    noDataDesc: 'निर्यात करने के लिए कोई सेशन नहीं।',
    exportSuccessful: 'निर्यात सफल',
    exportSuccessfulDesc: 'आपका सेशन डेटा CSV में निर्यात किया गया है।',
    
    // Notifications
    notificationsEnabled: 'सूचनाएं सक्षम',
    notificationsDisabled: 'सूचनाएं अक्षम',
    soundEnabled: 'ध्वनि सक्षम',
    soundDisabled: 'ध्वनि अक्षम',
    notificationPermissionGranted: 'आपका फोकस सेशन पूरा होने पर आपको सूचित किया जाएगा।',
    notificationPermissionDenied: 'कृपया अपनी ब्राउज़र सेटिंग्स में सूचनाएं सक्षम करें।',
    notificationStatusEnabled: 'ब्राउज़र सूचनाएं सक्षम - आपका सेशन पूरा होने पर आपको अलर्ट किया जाएगा',
    notificationStatusDisabled: 'आपका सेशन पूरा होने पर अलर्ट पाने के लिए सूचनाएं सक्षम करें',
    
    // Settings page
    settings: 'सेटिंग्स',
    accountSettings: 'खाता सेटिंग्स',
    settingsSubtitle: 'अपनी खाता प्राथमिकताएं और प्रोफ़ाइल जानकारी प्रबंधित करें',
    signInToViewSettings: 'सेटिंग्स देखने के लिए साइन इन करें',
    settingsRequireAuth: 'आपको अपनी खाता सेटिंग्स तक पहुंचने के लिए साइन इन करना होगा',
    profileInformation: 'प्रोफ़ाइल जानकारी',
    profileDesc: 'अपनी व्यक्तिगत जानकारी और खाता विवरण प्रबंधित करें',
    displayName: 'प्रदर्शन नाम',
    emailAddress: 'ईमेल पता',
    memberSince: 'सदस्य बने',
    verified: 'सत्यापित',
    preferences: 'प्राथमिकताएं',
    dataPrivacy: 'डेटा और गोपनीयता',
    exportData: 'मेरा डेटा निर्यात करें',
    deleteAccount: 'खाता हटाएं',
    accountStats: 'खाता आंकड़े',
    accountStatsDesc: 'एक नज़र में आपकी FocusFlow यात्रा',
    enabled: 'सक्षम',
    language: 'भाषा',
    notifications: 'सूचनाएं',
    nameUpdated: 'नाम अपडेट किया गया',
    nameUpdatedDesc: 'आपका प्रदर्शन नाम सफलतापूर्वक अपडेट किया गया है।',
    noDisplayName: 'कोई प्रदर्शन नाम सेट नहीं',
    enterDisplayName: 'अपना प्रदर्शन नाम दर्ज करें',
  }
};

// Get browser language or default to English
export const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0] as Language;
  return Object.keys(languages).includes(browserLang) ? browserLang : 'en';
};

// Translation helper function
export const t = (key: keyof typeof translations.en, lang: Language = 'en', params?: Record<string, string | number>): string => {
  let translation = translations[lang]?.[key] || translations.en[key] || key;
  
  // Replace parameters in translation
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{${param}}`, String(value));
    });
  }
  
  return translation;
};