const messages = {
  en: {
    //signIn
    emailValidation: "Please enter a valid email",
    passwordValidation: "Please enter a valid password",
    passwordRequirements:
      "Password must be between 6 and 16 characters long, contain at least one digit and one uppercase letter, and consist of Latin characters only",
    emailMaxCharacters: "Email must be at most 50 characters",
    emailRequired: "Email is required",
    passwordMaxCharacters: "Password must be at most 16 characters",
    passwordRequired: "Password is required",

    // registrationSchema
    firstNameValidation: "Please enter a valid name",
    firstNameRequired: "Name is required",
    firstNameMaxCharacters: "Name must be at most 20 characters",
    passwordMatch: "Passwords must match",
    passwordConfirmRequired: "Password confirmation is required",
    "header.teachers": "Home",
    "header.becomeTeacher": "Become a teacher",
    "header.aboutUs": "About us",
    "header.login": "Login",
    "header.logout": "Logout",
    "header.registration": "Registration",
    signIn: "Sign In",
    enterEmail: "Enter e-mail",
    enterPassword: "Enter password",
    forgotPassword: "Forgot password?",
    loading: "Loading...",
    signInButton: "Sign In",
    newUser: "New user?",
    createAccount: "Create an account",

    //homepage
    findTeacher: "Find the perfect teacher",
    learnMore: "Learn more",
    list1: "Over 1000 teachers",
    list2: "Over 20 languages",
    list3: "Professional teachers and native speakers",

    //about

    aboutSubtitle:
      "Our platform is your reliable partner on the journey to mastering a new language.",
    aboutText1:
      "It is a unique interactive platform that makes the process of online language learning as personalized and effective as possible. Each user has the opportunity to choose the perfect teacher for themselves and at the same time start teaching others - all in an online format, with the ability to choose a convenient schedule and flexible payment system.",
    aboutText2: "The platform also offers:",
    aboutList1: "a wide selection of languages for learning and teaching;",
    aboutList2: "modern teaching methods;",
    aboutList3:
      "the ability to ask the teacher questions through the messaging chat.",
    aboutText3: "Start your unique educational journey today with us!",
    aboutCard1: "of the teachers have international certificates",
    aboutCard2: "lessons are held every hour",
    aboutCard3: "registrations for trial lessons are received every week",
    aboutCard4: "satisfied students over 5 years",
    aboutTitle1: "Functionality of the platform",
    aboutText4:
      "The platform for language learning offers users a personal profile, a chat for communication, a questionnaire for teachers, and a page with a list of all available teachers",
    userProfileDetails:
      "In the user profile, each platform user can change personal information, view their classes, schedule, posted and liked announcements, and more",
    chatDetails:
      "The ability to maintain communication between students and teachers is extremely important. Arranging a meeting, receiving feedback on completed homework can be easily done without even leaving the platform",
    teacherProfileDetails:
      "Every registered user has the opportunity to fill out a teacher profile and post their own advertisement, the editing of which is provided in the profile",
    allTeachersDetails:
      "The platform includes a page with advertisements of all teachers, which can be sorted by the teacher's country of origin, the price of a trial lesson, language, or teaching specialization",
    aboutGreenPoster1:
      "Student or graduate, teacher or enthusiast — everyone can join the community ",
    aboutGreenPoster2: "We are already waiting for you!",
    aboutTrial: "How to order a trial lesson",
    aboutTrial2:
      "The website interface allows you to buy a trial lesson in just a few clicks - it's as simple as possible and doesn't require any extra effort from the user",
    chooseTeacherTitle: "Choose a Teacher",
    chooseTeacherText:
      "Select the perfect teacher for yourself using various filters on the Home page.",
    checkAdvertTitle: "Check the Advertisement",
    checkAdvertText:
      "Make sure the teaching languages, specializations, country of origin, and other information about the teacher provided in the advertisement suit you.",
    setTrialTitle: "Schedule a Trial Lesson",
    setTrialText:
      "Choose a time for the lesson, provide brief information about yourself, including your current language level, the language you want to learn, your country of origin, native language, and learning goals",
    payLessonTitle: "Pay for the Lesson",
    payLessonText:
      "You can pay with a card from any country or use Apple/Google Pay",
    forChildren: "For children",
    forBasic: "Basic learning",
    forSpeaking: "Spoken language",
    forBusiness: "For business",
    orderTrialText1: "Take a trial lesson ",
    orderTrialText2:
      "If you are not satisfied with your trial lesson, we will offer a lesson with another teacher or a full refund",
    orderTrialButton: "Book a trial lesson",
    aboutText4:
      "Share knowledge and earn without leaving home. Register to start teaching on Coach&Couch",
    aboutListTitle: "With our platform, you're sure to:",
    aboutList4: "find new students;",
    aboutList5: "grow your own business;",
    aboutList6: "be confident in lesson payments.",
    aboutText5:
      "Starting a teaching career is easy - just fill out the form. It'll take a maximum of ",
    aboutText6: "10 minutes",
    aboutText7: " of your time!",
    pricePerLesson: "Price per hour",
    priceOfLesson: "Lesson price",
    with: "with",
    for: "for",

    // ReviewList
    titleRewiewForm: "Leave a comment about the teacher",
    reviewMark: "Rate this type 1 to 5:",
    reviewMessage: "Your comment",
    shareReview: "Will be published for everyone",
    deleteAccount: "Delete account",
    filterAdverts: "There are no adverts in the selected categories",
    dashboard: "Dashboard",
    "personalAccount.profile": "Profile",
    // "personalAccount.lessons": "My Lessons",
    "personalAccount.schedule": "Calendar",
    "personalAccount.messages": "Messages",
    "personalAccount.likes": "Favourites",
    "personalAccount.advertisements": "My advert",
    "personalAccount.feedback": "Feedback",
    "personalAccount.dashboard": "Dashboard",
    "personalAccount.settings": "Settings",
    "personalAccount.logout": "Logout",
    rate: "Rate",
    showAll: "Show more feedbacks",
    hide: "Hide",

    "signup.registration": "Registration",
    "signup.firstName": "Your name",
    "signup.email": "Enter your email",
    "signup.password": "Create a password",
    "signup.confirmPassword": "Confirm your password",
    "signup.showPassword": "Show password",
    "signup.createAccount": "Create an account",
    "signup.checking": "Checking...",
    "signup.termsAndConditions1": "By logging in, I accept ",
    "signup.termsLink": "Terms of Service",
    "signup.termsAndConditions2": "and confirm that I have read ",
    "signup.privacyLink": "Privacy Policy",
    "signup.alreadyHaveAccount": "Already have an account?",
    "signup.signIn": "Sign In",
    "footer.text":
      "Learn your favorite language through individual lessons at any convenient place and time.",
    "footer.social": "Our social media",
    "footer.confidential": "Privacy Policy",
    "footer.conditions": "Terms and Conditions",
    "footer.developers": "Developer Team Contacts",
    "footer.copyright": "©2023 Coach&Couch. All rights reserved.",

    //404
    errorTitle: "Oops! Page not found.",
    errorSubtitle: "Check the URL or return to the main page.",

    // Setings

    theme: "Theme",
    darkTheme: "Dark Mode",
    lightTheme: "Light Mode",
    changePassword: "Change password",
    newPassword: "New password",
    repeatPassword: "Repeat password",

    // Buttons
    sendBtn: "Send",
    trialLessonBtn: "Trial lesson",
    writeMeBtn: "Contact us",
    homepageBtn: "to main page",
    message: "Send message",
    publishBtn: "Publish",
    editBtn: "Edit",
    cancelBtn: "Cancel",
    saveBtn: "Save",
    saveChanges: "Save changes",
    goBack: "Go back",
    fillAdv: "Fill out the form",
    payBtn: "Pay",

    //Status
    online: "Online",
    offline: "Offline",
    noAdvertisement: "You don't have any advertisements yet",
    noFavorites: "You haven't added any teachers to your favorites yet",

    //Repeating
    lessons: "Lessons",
    languagesTeaching: "Teaching languages",
    languagesSpoken: "Languages spoken",
    language: "Language",
    country: "Country",
    price: "Price",
    specialization: "Specialization",
    platforms: "Platforms",
    aboutMe: "About me",
    feedback: "Feedback",
    teacherForm: "Teacher form",
    name: "First name",
    lastName: "Last name",
    birthday: "Date of birth",
    registrationDate: "Registration date",
    pricePerHour: "Price per hour",
    description: "Description",
    sex: "Sex",
    male: "Male",
    female: "Female",
    other: "Other",
    uploadPhoto: "Upload your photo",
    addPhoto: "+ Add photo",
    or: "or",
    newPhoto: "New photo",
    sussessUpd: "Your data has been updated successfully",
    userProfile: "User profile",
    chat: "Business chat",
    teacherProfile: "Teacher profile",
    allTeachers: "All teachers",
    english: "English",
    polish: "Polish",
    spanish: "Spanish",
    more: "More...",
    datePlaceholder: "dd.mm.yyyy",
    remove: "Remove",

    //validation
    priceValidation: "Price is required",
    descriptionValidation: "Description is required",

    //modal
    sendMessageTitle: "Write a message to the teacher",
    messageSubject: "Message subject",
    messageEnterBody: "Enter the message",
    messageBody: "The message",
    loginSendMessageTitle: "Register to write to the teacher",
    loginSendMessageSubject:
      "To be able to write to the teacher, register or log in to your personal account",

    //img
    imgAdvise:
      "The photo size should be a minimum of 200x200 pixels and a maximum of 5 MB. Image format: JPG, PNG.",
    saveAdvise: "After uploading, click 'Save'",

    //schedule
    "schedule.today": "Today",
    "schedule.week": "Week",
    fillForm: "Fill in the details",
    formDetails: "Tell the teacher about yourself",
    booking: ", you are booking",
    yourTeacher: "Your teacher",
    dateTime: "Date and time",
    priceSchedule: "Price",
    chooseLanguage: "Select the language to learn",
    chooseLevel: "Select your language proficiency level",
    whereFrom: "Where are you from?",
    nativeLanguage: "What is your native language?",
    learningGoal: "What is your purpose for learning this language?",

    //Admin
    avatar: "Image",
    usersAdmin: "Users",
    username: "User name",
    advert: "Advert",
    registeredAt: "Registered At",
    lastVisit: "Last visit",
  },

  uk: {
    //SignIn
    emailValidation: "Будь ласка, введіть дійсний email",
    passwordValidation: "Будь ласка, введіть дійсний пароль",
    passwordRequirements:
      "Пароль повинен бути від 6 до 16 символів у довжину, містити принаймні одну цифру та одну велику літеру, і складатися лише з латинських символів",
    emailMaxCharacters: "Email повинен бути не більше 50 символів",
    emailRequired: "Email є обов'язковим",
    passwordMaxCharacters: "Пароль повинен бути не більше 16 символів",
    passwordRequired: "Пароль є обов'язковим",

    // registrationSchema
    firstNameValidation: "Будь ласка, введіть правильне ім'я",
    firstNameRequired: "Ім'я обов'язкове",
    firstNameMaxCharacters: "Ім'я повинно містити не більше 20 символів",
    passwordMatch: "Паролі повинні співпадати",
    passwordConfirmRequired: "Підтвердження пароля обов'язкове",

    "header.teachers": "Головна",
    "header.becomeTeacher": "Стати викладачем",
    "header.aboutUs": "Про нас",
    "header.login": "Вхід",
    "header.logout": "Вихід",
    "header.registration": "Реєстрація",
    "signup.registration": "Реєстрація",
    "signup.firstName": "Ваше ім'я",
    "signup.email": "Введіть ваш email",
    "signup.password": "Створіть пароль",
    "signup.confirmPassword": "Підтвердіть пароль",
    "signup.showPassword": "Показати пароль",
    "signup.createAccount": "Створити обліковий запис",
    "signup.checking": "Перевіряємо...",
    "signup.termsAndConditions1": "Входячи в систему, я приймаю ",
    "signup.termsLink": "Умови користування",
    "signup.termsAndConditions2": "та підтверджую, що мною прочитана ",
    "signup.privacyLink": "Політика конфіденційності",
    "signup.alreadyHaveAccount": "Вже є обліковий запис?",
    "signup.signIn": "Увійти",
    signIn: "Вхід",
    enterEmail: "Введіть e-mail",
    enterPassword: "Введіть пароль",
    forgotPassword: "Забули пароль?",
    loading: "Завантаження...",
    signInButton: "Увійти",
    newUser: "Новий користувач?",
    createAccount: "Створити аккаунт",

    //about
    aboutSubtitle:
      "Наша платформа - це ваш надійний партнер у подорожі до опанування нової мови.",
    aboutText1:
      "це унікальна інтерактивна платформа, що робить процес онлайн-вивчення іноземних мов максимально персоналізованим та ефективним. Кожен користувач має змогу обрати ідеального для себе викладача та водночас почати викладати іншим - і все це в онлайн-форматі, з можливістю вибору зручного розкладу та гнучкої системи оплати.",
    aboutText2: "Платформа додатково пропонує:",
    aboutList1: "широкий вибір мов для вивчення та викладання;",
    aboutList2: "сучасні методи навчання;",
    aboutList3:
      "можливість поставити запитання викладачеві через службовий чат.",
    aboutText3:
      "Розпочніть свою унікальну освітню подорож вже сьогодні разом з нами!",
    aboutCard1: "викладачів мають міжнародні сертифікати",
    aboutCard2: "уроків проводиться щогодини",
    aboutCard3: "реєстрацій на пробний урок щотижня",
    aboutCard4: "задоволених учнів за 5 років",
    aboutTitle1: "Функціонал платформи",
    aboutText4:
      "Платформа для вивчення мов пропонує користувачам персональний профіль, чат для спілкування, анкету для викладачів та сторінку з переліком усіх доступних викладачів",
    userProfileDetails:
      "Саме в ньому кожен користувач платформи має змогу змінити персональну інформацію; переглянути свої заняття, розклад, розміщені та вподобані оголошення тощо",
    chatDetails:
      "Можливість підтримувати зв’язок між учнем та викладачем є надзвичай-но важливою. Домовитися про зустріч, отримати фідбек про виконане домашнє завдання легко, навіть не виходячи з платформи",
    teacherProfileDetails:
      "Кожен зареєстрований користувач має змогу заповнити анкету викладача та викласти власне оголошення, редагування якого передбачено у профілі",
    allTeachersDetails:
      "На платформі передбачено сторінку з оголошеннями усіх викладачів, що можна сортувати за країною походження викладача, ціною пробного уроку, мовою або ж спеціалізацією викладання",
    aboutGreenPoster1:
      "Студент або випускник, викладач або любитель — кожен може приєднатися до спільноти ",
    aboutGreenPoster2: "Ми вже чекаємо на вас!",
    aboutTrial: "Як замовити пробний урок",
    aboutTrial2:
      "Інтерфейс сайту дозволяє купити пробне заняття всього за кілька кліків - це максимально просто та не вимагає зайвих зусиль від користувача",
    chooseTeacherTitle: "Оберіть викладача",
    chooseTeacherText:
      "Оберіть ідеального викладача для себе за різними фільтрами на сторінці “Головна”",
    checkAdvertTitle: "Продивіться оголошення",
    checkAdvertText:
      "Запевніться, що Вас влаштовує набір мов викладання, спеціалізації, країна походження та інша інформація про викладача, вказана в оголошенні",
    setTrialTitle: "Оформіть пробний урок",
    setTrialText:
      "Оберіть час для заняття, вкажіть коротко інформацію про себе, а саме наявний рівень мови, яку бажаєте вивчати, країну походження, рідну мову та мету вивчення",
    payLessonTitle: "Оплатіть урок",
    payLessonText:
      "Можете зробити це карткою будь-якої країни або Apple/Google Pay",
    forChildren: "Для дітей",
    forBasic: "Вивчення основ",
    forSpeaking: "Розмовна мова",
    forBusiness: "Для бізнесу",
    orderTrialText1: "Візьміть пробний урок ",
    orderTrialText2:
      "Якщо ви залишитеся незадоволеними своїм пробним уроком, ми запропонуємо урок з іншим викладачем або повну компенсацію",
    orderTrialButton: "Замовити пробний урок",
    aboutText4:
      "Діліться знаннями та заробляйте, не виходячи з дому. Реєструйтеся, щоб почати викладати на Coach&Couch",
    aboutListTitle: "З нашою платформою ти неодмінно:",
    aboutList4: "знайдеш нових учнів;",
    aboutList5: "розвинеш власний бізнес;",
    aboutList6: "будеш впевнений в оплаті уроків.",
    aboutText5:
      "Розпочати кар'єру викладача легко, заповнивши анкету. Це займе максимум ",
    aboutText6: "10 хв",
    aboutText7: " твого часу!",
    pricePerLesson: "Вартість за годину",
    priceOfLesson: "Ціна уроку",
    with: "з",
    for: "за",

    //HomePage
    findTeacher: "Знайдіть ідеального викладача",
    learnMore: "Дізнатися більше",
    list1: "Понад 1000 викладачів",
    list2: "Понад 20 мов",
    list3: "Професійні викладачі та носії мови",

    // ReviewList
    titleRewiewForm: "Залиште свій відгук про викладача",
    reviewMark: "Оцініть від 1 до 5:",
    reviewMessage: "Ваш відгук",
    shareReview: "Буде опубліковано для всіх",
    deleteAccount: "Видалити аккаунт",
    filterAdverts: "Немає оголошень за обраними категоріями",
    showAll: "Дивитися більше відгуків",
    hide: "Приховати",

    dashboard: "Дашборд",
    "personalAccount.profile": "Профіль",
    // "personalAccount.lessons": "Мої заняття",
    "personalAccount.schedule": "Календар",
    "personalAccount.messages": "Повідомлення",
    "personalAccount.likes": "Обрані",
    "personalAccount.feedback": "Відгуки",
    "personalAccount.advertisements": "Моє оголошення",
    "personalAccount.dashboard": "Дашборд",
    "personalAccount.settings": "Налаштування",
    "personalAccount.logout": "Вихід",
    rate: "Рейтинг",
    "footer.text":
      "Вивчайте свою улюблену мову на індивідуальних уроках в будь-якому зручному місці та часі.",
    "footer.social": "Ми в соцмережах",
    "footer.confidential": "Політика конфіденційності",
    "footer.conditions": "Умови використання",
    "footer.developers": "Контакти команди розробників",
    "footer.copyright": "©2023 Coach&Couch. Усі права захищені.",

    //404
    errorTitle: "Oops! Сторінку не знайдено",
    errorSubtitle: "Перевірте URL адресу сторінки або поверніться на головну",

    // Setings

    theme: "Тема",
    darkTheme: "Темна тема",
    lightTheme: "Світла тема",
    changePassword: "Змінити пароль",
    newPassword: "Новий пароль",
    repeatPassword: "Повторіть пароль",

    // Buttons
    sendBtn: "Відправити",
    message: "Написати",
    trialLessonBtn: "Пробний урок",
    writeMeBtn: "Написати",
    homepageBtn: "Перейти на головну",
    publishBtn: "Опублікувати",
    editBtn: "Редагувати",
    cancelBtn: "Скасувати",
    saveBtn: "Зберегти",
    saveChanges: "Зберегти зміни",
    goBack: "Повернутись назад",
    fillAdv: "Заповнити анкету",
    payBtn: "Сплатити",

    //Status
    online: "У мережі",
    offline: "Не в мережі",
    noAdvertisement: "Ви ще не маєте оголошення",
    noFavorites: "Ви ще не додали жодного викладача до обраних",

    //Repeating
    lessons: "Уроки",
    languagesTeaching: "Мови викладання",
    languagesSpoken: "Мови, якими розмовляєте",
    language: "Мова",
    country: "Країна",
    price: "Ціна",
    specialization: "Спеціалізація",
    platforms: "Платформи",
    aboutMe: "Про мене",
    feedback: "Відгуки",
    teacherForm: "Анкета викладача",
    name: "Ім'я",
    lastName: "Прізвище",
    birthday: "Дата народження",
    registrationDate: "Дата реєстрації",
    pricePerHour: "Вартість за годину уроку",
    description: "Опис",
    sex: "Стать",
    male: "Чоловіча",
    female: "Жіноча",
    other: "Інша",
    uploadPhoto: "Завантажте свою фотографію",
    addPhoto: "+ Додати фото",
    or: "або",
    newPhoto: "Нове фото",
    sussessUpd: "Ваші дані було успішно оновлено",
    userProfile: "Профіль користувача",
    chat: "Службовий чат",
    teacherProfile: "Анкета викладача",
    allTeachers: "Усі викладачі",
    english: "Англійська",
    polish: "Польська",
    spanish: "Іспанська",
    more: "Більше...",
    datePlaceholder: "дд.мм.рррр",
    remove: "Видалити",

    //validation
    priceValidation: "Вкажіть ціну",
    descriptionValidation: "Введіть опис",

    //modal
    sendMessageTitle: "Напишіть повідомлення до викладача",
    messageSubject: "Тема повідомлення",
    messageEnterBody: "Введіть текст",
    messageBody: "Текст повідомлення",
    loginSendMessageTitle: "Зареєструйтеся щоб написати викладачу",
    loginSendMessageSubject:
      "Щоб мати можливість написати викладачу, зареєструйтеся або увійдіть у особистий кабінет",

    //img
    imgAdvise:
      "Розмір фотографії повинен бути не менше 200x200 пікселів і не більше 5 МБ. Формат зображення JPG, PNG",
    saveAdvise: 'Після завантаження натисніть "Зберегти"',

    //schedule
    "schedule.today": "Сьогодні",
    "schedule.week": "Тиждень",
    fillForm: "Заповніть інформацію",
    formDetails: "Розкажіть викладачу про себе",
    dateTime: "Дата і час",
    priceSchedule: "Вартість",
    booking: ", ви бронюєте",
    yourTeacher: "Ваш викладач",
    chooseLanguage: "Оберіть мову для вивчення",
    chooseLevel: "Оберіть ваш рівень володіння мовою",
    whereFrom: "Звідки ви?",
    nativeLanguage: "Яка ваша рідна мова?",
    learningGoal: "Яка ваша мета вивчення цієї мови?", 

    //Admin
    avatar: "Аватарка",
    username: "Ім'я користувача",
    usersAdmin: "Користувачі",
    advert: "Оголошення",
    registeredAt: "Дата реєстраціЇ",
    lastVisit: "Востаннє на сайті",
  },
};

export default messages;
