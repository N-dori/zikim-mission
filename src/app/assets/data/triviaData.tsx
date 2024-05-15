function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
export interface Question {

  id: string,
  question: string,
  answers: [{
    id: string,
    answer: string,
    currect: boolean
  },
    {
      id: string,
      answer: string,
      currect: boolean
    },
    {
      id: string,
      answer: string,
      currect: boolean
    },
    {
      id: string,
      answer: string,
      currect: boolean
    }
  ],
  explanation: string,
  img: {
    url: string,
    desc: string
  }

}
export const questions: Question[] = [
  {
    id: makeId(),
    question: 'מה מקור שמה של החטיבה?',
    answers: [{
      id: makeId(),
      answer: 'ראם -ראשי תיבות של ראש מלחמה.',
      currect: false
    },
    {
      id: makeId(),
      answer: 'השם ניתן לחטיבה על שמו של מפקד החטיבה במלחמת ששת הימים, אורי רום.',
      currect: false
    },
    {
      id: makeId(),
      answer: 'מקור השם בברכה שנשא משה בטרם מותו לבני ישראל בה ניסה לתאר את כוחם האדיר " וְקַרְנֵי רְאֵם קַרְנָיו ".',
      currect: true
    },
    {
      id: makeId(),
      answer: 'ראם = RM שמו של הטנק הראשון של החטיבה',
      currect: false
    }
    ],
    explanation: `השם ראם ניתן לאחת מן המפוארות שבחטיבות השיריון של צה"ל ונלקח מספר דברים לג,17 '' בְּכוֹר שׁוֹרוֹ הָדָר לוֹ, וְקַרְנֵי רְאֵם קַרְנָיו--בָּהֶם עַמִּים יְנַגַּח יַחְדָּו.''הראם הוא אחת מהחיות הבר הקדומות של ארץ ישראל, בני ישראל יחסו לו תכונות של יופי, עוצמה, חוסן ונחישות. משה רבנו שהיה גם רועה צאן, הכיר את המדבר ואת בעלי החיים. לפני מותו מברך משה את בני ישראל ובברכתו מבקש לתאר את כוחם האדיר.`,
    img: { url: 'moses.jpeg', desc: `צ'רלטון הסטון כמשה ב"עשרת הדברות". מברך את עם ישראל' `}
  },
  {
    id: makeId(),
    question: 'מה היה מספרה של החטיבה עם הקמתה?',
    answers: [{
      id: makeId(),
      answer: '179',
      currect: false
    },
    {
      id: makeId(),
      answer: '37',
      currect: true
    },
    {
      id: makeId(),
      answer: '673',
      currect: false
    },
    {
      id: makeId(),
      answer: '971',
      currect: false
    }
    ],
    explanation: `עם הקמתה היה מספרה של החטיבה 37. בתום כל מלחמה שונה מספרה של החטיבה. בתום מלחמת ששת הימים שונה מספר החטיבה ל179 , אחרי מלחמת יום כיפור הפכה לחטיבה 673 ובשנת 2016 נקראה שוב חטיבה 179.`,
    img: { url: 'RAM.png', desc: 'סמל החטיבה' }
  },
  {

    id: makeId(),
    question: 'מה יעודה של החטיבה במקור?',
    answers: [{
      id: makeId(),
      answer: 'עתודה קרבית של פיקוד דרום .',
      currect: false
    },
    {
      id: makeId(),
      answer: '. החטיבה  היא חטיבה מטכ"לית ולכן אין לה יעוד אחד בלבד.',
      currect: false
    },
    {
      id: makeId(),
      answer: 'עתודה קרבית של פיקוד צפון.',
      currect: true
    },
    {
      id: makeId(),
      answer: 'עתודת קרב ליום הדין בלבד.',
      currect: false
    }
    ],
    explanation: `חטיבת המילואים 37 נועדה במקור לשמש עתודה קרבית של פיקוד צפון. במקרה הצורך הייתה אמורה חטיבה זו להיות מוזנקת ראשונה לקרב ולסייע בתגבור הכוחות הסדירים.`,
    img: { url: 'ramat_ha_golan.jpg', desc: 'רמת הגולן' }
  },
  {
    id: makeId(),
    question: 'באיזו שנה הוקמה החטיבה ?',
    answers: [{
      id: makeId(),
      answer: 'ב1967 לאחר מלחמת ששת הימים',
      currect: false
    },
    {
      id: makeId(),
      answer: 'עם הקמת צהל ב1948 ',
      currect: false
    },
    {
      id: makeId(),
      answer: 'ב1973 לאחר מלחמת יום כיפור ',
      currect: false
    },
    {
      id: makeId(),
      answer: 'ב1955 וביוזמתו של הרמטכ"ל משה דיין',
      currect: true
    }
    ],
    explanation: `במאי 23 1955, בעת כהונתו של משה דיין כרמטכ"ל צה"ל, הוחלט להקים במסגרת חיל השיריון שתי חטיבות מילואים. חטיבה 27 פעלה בדרום , ובצפון הוצבה חטיבה 37, שנקראה לימים חטיבת ראם.`,
    img: { url: 'moshe_dayan.jpg', desc: 'משה דיין' }
  },
  {
    id: makeId(),
    question: 'מה הייתה טבילת האש הראשונה של החטיבה?',
    answers: [{
      id: makeId(),
      answer: '"מבצע מוקד" עם פרוץ מלחמת ששת הימים.  ',
      currect: false
    },
    {
      id: makeId(),
      answer: 'ב1956 כיבוש עזה.',
      currect: true
    },
    {
      id: makeId(),
      answer: 'בסוף מלחמת ששת הימים בקרבות על הגולן.',
      currect: false
    },
    {
      id: makeId(),
      answer: '2016 במלחמת לבנון השנייה.',
      currect: false
    }
    ],
    explanation: `לאחר הקמת המדינה , ישראל התמודדה עם אתגרים עצומים בחינוך בכלכלה ובביטחון . לתחומי המדינה חדרו חוליות מחבלים מדרום , פדאיון בתרגום חופשי "המחרפים את נפשם" הם פגעו ברכוש ובנפש, וכל אזרחי המדינה חשו איום קיומי מתמיד, המפגעים היו עשויים לחבל בכל זמן בכל מקום. בשנת 1956 החריפו עוד יותר היחסים בין ישראל למצריים. נשיא מצרים נאצר קרא קריאות להשמדת ישראל והכריז על הלאמת תעלת סואץ. צעד שפגע בצרפת ובריטניה  שהחזיקו בזכויות השיט בתעלה . הצורך בשיתוף פעולה כנגד מצרים הוביל להתלכדות אינטרסים בין בריטניה צרפת וישראל. בשיחות חשאיות נקבע שישראל תצא לפעולה מוגבלת נגד מצרים כדי להבהיר לנצאר שהוא צריך לחזור בו מדבריו וכוונותיו להלאים את תעלת סואץ, ואם הוא לא בריטניה וצרפת יצטרפו גם הן למערכה. בצה"ל היה חשש שבריטניה וצרפת לא יקימו את חלקם בהסכם ושיציאה לפעולה מוגבלת ושליחה של כוח קטן מידי יסכן את הלוחמים בעומק שטח האויב על בסיס זה היו ויכוחים מרים בצמרת צה"ל. באוקטובר 1956 יוצא לדרך "מבצע מכבש" לימים "מבצע קדש" צה"ל פורץ אל אל-עריש הצנחנים יוצאים לצניחה היסטורית בלב מדבר סיני . החשש שבריטניה וצרפת לא יצרפו למערך התברר כנכון וישראל ניצבה פעם נוספת לבדה במערכה כשצה"ל ניצב לבדו מול המצרים ומשום כך נקראה חטיבה 37 שעדיין עמדה בתהליכי הקמה לצאת לקרב לפני שהוכנה כראוי. לוחמי גדוד החרמ"ש התרכזו באזור קיבוץ בארי ומשם חדרו לתוך שטח רצועת עזה הצפופה. הם התקדמו מערבה. האזור היה זרוע מוצבים של הצבא המצרי, ובהם כוחות גדולים מצוידים בנשק נ"ט. עד מהרה נתקלו הלוחמים באש כבדה. שני מטוסי "מוסקיטו " עמוסי פצצות המטירו אש על המוצבים המצריים בעזה והבלימה המצרית נשברה.  לוחמי חטיבה 37 נכנסו לעיר עזה והתמקמו בתחנת המשטרה וממנה התקדמו עד רפיח . בקרב על עזה נהרגו 11 מלוחמי החטיבה.
    ב31  באוקטובר התחילו כוחות השריון של חטיבה 37 , בכניסה קרקעית לחצי האי סיני.   
   `,
    img: { url: 'rem_worrires.jpg', desc: 'לוחמי חטיבה 37' }
  },
  {
    id: makeId(),
    question: 'מי היה מפקד החטיבה הראשון?',
    answers: [{
      id: makeId(),
      answer: 'שמואל גלינקא ',
      currect: true
    },
    {
      id: makeId(),
      answer: 'אריה שחר',
      currect: false
    },
    {
      id: makeId(),
      answer: 'תמיר היימן',
      currect: false
    },
    {
      id: makeId(),
      answer: 'אורי רום ',
      currect: false
    }
    ],
    explanation: `ב1956 שמואל גלינקא  מונה להיות מפקד החטיבה הראשון. שמואל גלינקא נולד ב1927 למשפחה ציונית מעמק יזרעאל, שמואל הצטרף לפלמ"ח. במלחמת העצמאות לחם כקצין בחטיבת הראל, נפצע,ושב לשדה הקרב. מעשי גבורתו היו לשם דבר. עם קום המדינה התגייס לקבע ואמר לבני משפחתו " אין ברירה, הגנת הארץ היא העיקר ". ב1956 מונה למפקד חטיבה המשוריינת 37, ועוד בטרם השלים את תהליך הקמת החטיבה יצא בראש לוחמיו לקרב באום-כתף שבסיני, זחל"ם המח"ט נפגע ובתוכו כל הצוות. בן 29 היה במותו.`,
    img: { url: 'shamuel_galinka.jpg', desc: 'שמואל גלינקא' }
  },
  {
    id: makeId(),
    question: 'מתי חל יום גייסות השריון?',
    answers: [{
      id: makeId(),
      answer: '31 באוקטובר',
      currect: true
    },
    {
      id: makeId(),
      answer: '29 בנובמבר',
      currect: false
    },
    {
      id: makeId(),
      answer: '14 למאי ',
      currect: false
    },
    {
      id: makeId(),
      answer: '7 באוקטובר ',
      currect: false
    }
    ],
    explanation: `על אף האבדות והכשלים הרבים הצליח צה"ל במשימותיו וכבש בתוך ימים ספורים את כל מרחבי חצי אי סיני . כוחות גדולים של צה"ל שהיו פרוסים בסיני איפשרו לישראלים רבים לטייל בנופים הפראיים של מדבר סיני וחופיו . ישראל תפסה את סיני עד סוף שנת 1956 ואז נסוגה חזרה בעקבות לחץ בין לאומי. נחיצותם של הטנקים ויעילותם הוכחו מעל לכל ספק בקרבות מבצע קדש, ובעקביותם נקבע יום ה31 באוקטובר ליום גייסות השריון.`,
    img: { url: 'armer_brigad.jpeg', desc: 'חייל השיריון' }
  },
  {
    id: makeId(),
    question: 'למה קיבלה החטיבה את כינוי חטיבת דפנה',
    answers: [{
      id: makeId(),
      answer: 'בגלל שמרבית הלוחמי הגיעו מקיבוץ דפנה.',
      currect: false
    },
    {
      id: makeId(),
      answer: `כדי להקרין על חוסנה של החטיבה.  'ער אציל'  הוא עץ איתן ובשמו הנפוץ דפנה.`,
      currect: false
    },
    {
      id: makeId(),
      answer: 'על שמה של אישתו של מפקד החטיבה דפנה.',
      currect: false
    },
    {
      id: makeId(),
      answer: 'על שם הסיגריות הזולות שחולקו חינם בקיבוצים.',
      currect: true
    }
    ],
    explanation: `: בשנים שלאחר מבצע קדש , פעילות החטיבה כללה אימונים סדירים ותעסוקה מבצעית- על פי רוב אחיזה בקו הגבול שבין דרום רמת הגולן ובין ישובי עמק הירדן. מרבית מחיילי וממפקדי החטיבה היו בני הקיבוצים וההתיישבות העובדת, שהכירו אחד את השני גם מהחיים האזרחיים, בילו יחד, ערכו טיולים משותפים , ונפגשו בשמחות. ההווי המיוחד של החטיבה יצר את כינויה "חטיבת דפנה", רמז לסיגריות הזולות ומעלו העשן שחולקו חינם לחברי הקיבוצים ושנהגו לעשן בני ההתיישבות העובדת  .`,
    img: { url: 'daphna_soilder.jpg', desc: `"חטיבת דפנה- על שם הסיגריות הזולות שחולקו לחברי הקיבוצים"` }
  },
  {
    id: makeId(),
    question: 'מה היה השם המקורי של גדוד 8130',
    answers: [{
      id: makeId(),
      answer: '377',
      currect: false
    },
    {
      id: makeId(),
      answer: '278',
      currect: true
    },
    {
      id: makeId(),
      answer: '54',
      currect: false
    },
    {
      id: makeId(),
      answer: '266',
      currect: false
    }
    ],
    explanation: `:  הגדוד הוותיק 278 הוקם עם הקמת החטיבה ב1955 ולחם במבצע קדש במלחמת ששת הימים ומלחמת יום כיפור . בשנת 2000 הוסבה בהדרגה החטיבה משימוש בטנקי שוט לשימוש בטנקים מדגם מרכבה סימן 3 . החלפת הטנקים הוחלפו גם הלוחמים  ולמעשה החטיבה הוקמה מחדש.  שמות הגדודים הוחלפו, אך כל גדוד שימר את הזיקה לגדוד ההיסטורי ממנו צמח. גדוד 278 הוותיק מעתה יקרא 8130 וגדוד 266 מעתה יקרא 7029. `,
    img: { url: 'shot-tank.jpg', desc: 'טנק שוט היה בשימוש עד שנת 2002' }
  },

]