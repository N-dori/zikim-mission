
import React from 'react'
import ArticleImage from '../cmps/ArticleImage'
import { ProgressBar } from '../cmps/ProgressBar'
import { getServerSession } from 'next-auth'
import { AuthOptions } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { Tuser } from '../types/types';
import { getUser } from '../utils/utils';

type Props = {}

export default async function otefAaza({ }: Props) {

    const session = await getServerSession(authOptions as AuthOptions)
    console.log('server session', session);
    let user :Tuser
    if (session) {
    user = await getUser(session)
    }
    return (
        <main className="main-content flex-col gc2">
               <ProgressBar user={user} articel={'otef'}/>
            <h2>עוטף עזה שטח הפקר</h2>

            <p>פה ננסה להבין האם נכון לכנות את השטח שבו פועל הגדוד עוטף עזה?  איך הפך שטח בתחום הנגב המערבי בו הוקמו קיבוצים, מושבים וישובים קהילתיים, שחלקם בעיצוב הגבולות של מדינת ישראל היה גדול לאין שיעור, לשטח הפקר? ולמה הוא נקרא עוטף עזה?  למה לא  למשל יישובי הנגב המערבי? ולמה לא עוטף ישראל? , ולמה לא  נקרא בכל שם שמקשר את חבל הארץ הזה, למדינת ישראל. איך הפך עוטף עזה להיות שטח ישראלי שבשמו הוא קשור לישות אחרת ?  האם יכול להיות שהשם עוטף עזה השפיע על האופן שבו התייחסנו לשטח הזה? כאן ננסה לשאול גם, איך הפכה העיר עזה שהייתה משך מאות בשנים מקום מרכזי וחשוב מבחינה מסחרית ומדינית, למקום שאף אחד לא רוצה קשר אליו? ישראל לא רוצה שום קשר אליו, ונראה שגם מצריים. איך הפכה עזה למקום שכוח כה אפל שולט בו? </p>
            <ArticleImage width={150} height={150} src="/otef_aza.webp" alt="עוטף עזה" 
            desc={'בארי לאחר ההרס והחורבן עוטף עזה'}/>

            <h2>עזה שטח ביניים</h2>
            <p>רצועת עזה היא מרחב ביניים, למרחב שכזה קוראים גם שטח לימינלי. המילה היא מילה לטינית, לימן= גבול, סף. גם בחקר של תרבויות עתיקות מקובל להסתכל על מצבי ביניים חברתיים והמעבר שבין הילדות לעולם המבוגרים. לכל חברה יש את הטקסים שלה כמובן. זה מצב בחיים שאתה לא כאן ולא שם. כולנו היינו שם. עומדים עם פלומת השפם הראשונה וקול בלתי נשלט שעולה ויורד וקוראים את פרשת הבר מצווה לקול צהלולים ומטח סוכריות בכינון ישיר.</p>
            <ArticleImage width={150} height={150} src={"/bar-mitzva.jpg"} alt="תמונה של בר מצווה" 
            desc={'בר מצווה מצב לימינלי חברתי'}/>
            <p>אז בהקשר של תרבות, מצב לימינלי הוא מצב מאוד ברור, מצב של מעבר בחיים של אדם. בהקשר שלנו, שטח לימינלי הוא שטח שקיים בין ישויות והוא לא באמת שייך עוד הסוף לכל אחת מהישויות שתוחמות אותו. שטח שנמצא בין עולמות. כזאת היא רצועת עזה, ישות שמצריים לא רוצה ובטח לא ישראל.</p>
            <p>לכן השם עוטף עזה הוא שם קצת מטעה. מטעה משום שהוא שטח שנמצא בישראל ושייך לישראל, אבל עדיין נקרא עם שם הישות השנייה. לא קוראים לעוטף עזה על שם הישות אליה הוא שייך. אז איך קרה ששטח ישראלי נקרא על שם הישות השנייה?  כאן גם ננסה לבחון מה ההשפעות של זה, גם על השטח וגם אבל על האנשים שחיים במרחב שכזה. מה היחס של אותם אנשים לישות אליה הם שייכים (ישראל)? ומה היחס שלהם לתרבויות השכנות? וכדי להבין את זה טוב יותר, ניקח כמקרה מבחן את הנגב המערבי בתקופה הביזאנטית.</p>
           
            <h2>יישור קו לפני שממשיכים </h2>
            <p>בהיסטוריה העתיקה של מרחב הנגב עזה תופסת מקום מאוד מרכזי. עזה היא עיר נמל  וצומת מסחר של העולם העתיק. עזה הייתה עיר שער למדבריות ערב הסעודית ותימן מצד אחד, ומצד אחר עזה היא שטח ביניים בין כנען ומצרים שיושב על צומת דרכים חשובה. צומת של נתיבי סחר ימיים מרכזית, שמחברת את המזרח אל נמלי הים התיכון. אז מה קרה שהיום אנחנו מדברים עלייה כמקום מנותק שאנחנו לא רוצים שום קשר אליו לא אנחנו ולא המצרים? </p>
            <ArticleImage width={150} height={150} src={"/via_maris_2jpg.jpg"} alt="דרך הים נתיב סחר עולמי" 
            desc={'דרך הים- נתיב סחר של העולם הקדום עובר בעזה'}/>
           
            <h2>תוכנית החלוקה של האום</h2>
            <p>אולי יהיה נכון להתחיל מתוכנית החלוקה של האום. הבריטים מתכננים לעזוב את הארץ, והם מעבירים את המנדט שניתן להם לשלוט על ארץ ישראל חזרה לאו'ם. והאו'ם, באמצעות ועדה מיוחדת מחליט על חלוקה  למדינה יהודית  ומדינה ערבית בנוסף לשטח בינלאומי בירושלים . </p>
            <ArticleImage width={150} height={150} src={"/UN_Palestine_Partition_Versions_1947.jpg"} alt="תוכנית החלוקה" 
            desc={'בצהוב(השטח שיועד למדינה הערבית) בכחול(השטח שיודע למדינה היהודית) בלבן(שטח בשליטה בנילאומית) '}/>
            <p>זאת היא חלוקה שלא הטבע הכתיב על ידי נחלים גדולים או רכסי הרים נרחבים, זאת חלוקה שמשהו אחר הכתיב אותה. ב1947 נשלחה לארץ הועדה המיוחדת של האו"ם לענייני פלסטין (UNSCOP) הידועה גם בשם משלחת אונסקופ. משלחת אונסקופ הייתה וועדת חקירה שמונתה ע"י האו'ם לסייר בארץ ולהגיש את המלצותיה בנוגע אופן שבו הארץ תחולק. אחרי שלושה חודשים שבהם חברי הוועדה סיירו בארץ, ביקרו בקיבוצים ובכפרים הערביים. הוועדה הגישה את המלצותיה חזרה לאום, ובה החולט שהארץ תחולק על פי 'שיטת הרוב'. ההיגיון היה לתת לאזורים שבהם היה רוב יהודי למדינה היהודית ואזורים עם רוב ערבי למדינה הערבית.  אם זה ההגיון שהתווה את חלוקת הארץ אפשר להבין למה הרצועה הזאת החל מרפיח דיר אל בלח, חאן יונס, העיר עזה , מג'דל (אשקלון), איסדוד(אשדוד) נכנסה לתוך השטח הערבי. השאלה הנשאלת היא מה הגרם לאו'ם לייצר רצועה צרה וארוכה מה הגדיר את הגבול המזרחי שלה?</p>
            <ArticleImage width={150} height={150} src={"/unscop1.jpg"} alt="חברי וועדת אונסקופ" 
            desc={'חברי וועדת אונסקופ UNSCOP'}/>
            
            <h2>ההתיישבות הציונית בעשור שקדם לקום המדינה </h2>
            <p>החל מ1939 אנחנו רואים גל התיישבותי רציני מאוד.  סדרה מרשימה של ישובים מוקמים במרחב הנגב,   נגבה, גת, גברעם, יד מרדכי, דורות, ניצנים, רוחמה, בארות יצחק.  זה היה הגל הראשון של קיבוצים שמוקמים בנגב</p>
            <p>ב1943 מוקמים שלושת המצפים: גבולות רביבים ובית אשל וככה נוספות עוד שלוש נקודות על המפה</p>
            <p>בעקבות השמועות שהגיעו אל הנהגת הישוב היהודי בארץ על בואה של ועדת החלוקה של האו'ם, מחליטים בהנהגה הציונית על הקמה של ישובים חדשים בנגב. על אף הגבלות של רכישת קרקעות ליהודים והקמה של ישובים חדשים, גל נוסף של חלוצים יוצא אל הנגב. במבצע חשאי במוצאי יום כיפור מתחת לאף של הבריטים עולות על המפה ב1946 עוד 11 נקודות של התיישבות יהודית, בארי, נירים, אורים, כפר דרום, חצרים, נבטים, משמר הנגב, תקומה, שובל, משמר הנגב, גלאון, קדמה. המטרה של כל הנקודות האלה הייתה לייצר עובדות בשטח כי עוד רגע תיהיה כאן חלוקה ויכול להיות שהשטח הזה יחולק לישות אחרת, זאת הייתה ההבנה, שצריך להאחז בקרקע לפני שיש תוכנית חלוקה. </p>
            <p>ב1947 עולות על המפה עוד שלוש נקודות מבטחים, עלומים, ושורשים(לימים צאלים). </p>
            <ArticleImage width={150} height={150} src={"/11_points.webp"} alt="11 ישובים קמים בלילה אחד" 
            desc={'11 ישובים קמים בלילה אחד'}/>
            <p>עכשיו אנחנו יכולים להבין שבאותו זמן, את מי שוועדת החלוקה של האום פוגשת בשטחי הנגב הם, את אותם המתיישבים היהודים. ב1947 יש כבר לא מעט היאחזויות יהיודיות בנגב. מה שבמידה רבה מכתיב את הגבול המזרחי של הרצועה שתוכננה להיות חלק מהמדינה הערבית. יש ריכוז מאוד גדול של ישובים שלמעשה תוחם אותה.</p>
            <ArticleImage width={150} height={150} src={"/settelment_in_the_naegev39-47.png"} alt="התיישבות הציונית בנגב 1939-1947" 
            desc={'התיישבות הציונית בנגב 1939-1947'}/>
            <ArticleImage width={150} height={150} src={"/unscop2.jpg"} alt="ועדת אונסקופ בביקור בישובי הנגב" 
            desc={'ועדת אונסקופ בביקור בישובי הנגב'}/>

            <h2>התגובה לתוכנית החלוקה של האום</h2>
            <p>בקרב הישוב היהודי בארץ השמחה הייתה בלתי נתפסת, יהודים יצאו לשיר ולרקוד ברחובות מאושר. בעוד בצד הערבי היה כעס נורא גדול, תחושה של אי צדק וחוסר הסכמה שהוביל לחצי שנה של לחימת גרילה כנגד הבריטים ופעולות נקם כנגד מטרות יהודיות. ב14 במאי  בריטניה נסוגה סופית משליטתה על ארץ ישראל, וכאשר אחרון הבריטים עולה על האוניה, בן גוריון מכריז עצמאות בתל אביב, יום לאחר מכן פולשים לארץ צבאות ערב והמערכת של מלחמת העצמאות מתרחבת. </p>
            <ArticleImage width={150} height={150} src={"/dancing_indpendnce.jpg"} alt="רוקדים במעגלי הורה " 
            desc={'רוקדים במעגלי הורה '}/>
            <ArticleImage width={150} height={150} src={"/48war.jpeg"} alt="מלחמת העצמאות 1948" 
            desc={'מלחמת העצמאות 1948'}/>
            <p>לאחר שביתת הנשק בין ישראל למצרים רצועת עזה נותרת כמובלעת בתוך השטח הישראלי יחד עם עוד אזור שנקרא כיס פאלוג'ה באזור קריית גת כיום צומת פלוגות .
                למעשה לפי הסכם שביתת הנשק, רצועת עזה הייתה אמורה להיות צרה יותר וארוכה מעט יותר, כשהיא כוללת את אזור של נחל שקמה באזור מושב נתיב העשרה. אך אז קמה התנגדות בקבינט הישראלי גאולוג בשם פארקר תבע שיש לקבוע את נחל שקמה בצד הישראלי מכיוון שניקז כמויות גדולות של מים וניתן היה להקים שם מאגר מים גדול. החלטה שאומצה בחיוב וישראל דורשת לקצר מעט את הרצועה, המצרים מצדם לא היו פראיירים ודרשו בתמורה את הכפר עבסאן בדרום הרצועה וכך קיבלנו את הרצועה שאנחנו מכירים היום רצועה מוארכת עם בטן בחלק הדרומי.
            </p>
            <ArticleImage width={150} height={150} src={"/origenal aggriment.png"} alt="גבול רצועת עזה כפי שהוצע במקור" 
            desc={'גבול רצועת עזה כפי שהוצע במקור'}/>
           <ArticleImage width={150} height={150} src={"/new_aggriment.png"} alt="רצועת עזה כולל העבסאנים בדרום(בצהוב), נחל שקמה (באדום) והגיאולוג פארקר" 
            desc={'רצועת עזה כולל העבסאנים בדרום(בצהוב), נחל שקמה (באדום) והגיאולוג פארקר'}/>
            <p>עד כה הבנו למה רצועת עזה נראית כמו שהיא נראית כמו שהיא נראית  ומה היו הגורמים שהשפיעו על האופן שבו תחולק הארץ ב1947, נראה שלא רק פעולות צבאיות הגדירו את תוכנית החלוקה כפי שהוצע באום, אלא זה האנשים שהלכו ובפועל התיישבו גרו בצריף עבדו בחלאות הקימו מצפים . הם אלו שבסוף הכתיבו את גבולות התוכנית החלוקה של האו'ם.</p>

            <h2>נתן אלתרמן צריף בנגב</h2>
            <p className='poem'>יוֹם חֹשֶׁךְ וַיְהִי עֶרֶב. יָרֵחַ נִדְלַק, מִתְנַכֵּר וְרַע-עַיִן, מוּל אֶרֶץ סִינַי. וַאֲנַחְנוּ נִכְנַסְנוּ לַצְּרִיף הַדַּק, שֶׁבָּרוּחַ רַעַד כְּמוֹ חַי. </p>
            <p className='poem'>בְּבוֹאֵנוּ רָאִינוּ בַּצְּרִיף נַעֲרָה, הִיא בְּסֵפֶר קָרְאָה. לָהּ צַמָּה וְסִנָּר. וְרַק עבי שֶׁל קֶרֶשׁ בֵּין צְחוֹר סִנָּרָהּ וּבֵין לֵיל הַגּוֹפְרִית וְחוּקַת הַמִּדְבָּר.</p>
            <p className='poem'>גַּם לְלוֹנְדוֹן הָיָה בַּמִּזְרָח הַתּיכוֹן קַל יוֹתֵר, לְלֹא הִיא וְסִפְרָה שֶׁצָּנַח. עֵת רָאשֵׁי מֶמְשָׁלוֹת עוֹצְמִים עַיִן לִישׁן, אוֹר חַדְרָהּ מְשַׁנֶּה אֶת מַפַּת הַמִּזְרָח. </p>

            <p>השיר מדבר על האנשים בנגב, אלו שנאחזו באותם 11 הנקודות בנגב שעמדו אל מול המרחבים השוממים של הנגב והפריחו את השממה שמולה אפילו  "הצריף רעד כמו חי". האנשים, כמו אותה נערה מתוך השיר, זאת שיושבת לאור בנר בחדרה, הם אלה שמשנים את מפת המזרח התכון לפעמים יותר מראשי ממשלות. </p>
            <p>"אם תשים נקודה זוהרת על המפה בכל קיבוץ תקבל את מפת גבולות ארץ ישראל " בסופו של יום צריך אנשים שישבו במקומות האלה ואזרחים שיאיישו את הגבולות האלה. זה היה התפקיד של אותם ישובים באותם שנים. בארי היא דוגמה יפה לכך.</p>
            <ArticleImage width={150} height={150} src={"/natan_alterman.jpeg"} alt="נתן אלתרמן " 
            desc={'נתן אלתרמן '}/>
         
            <h2>בארי כמקרה מבחן </h2>
            <p>בארי במקור הוקמה מעל וואדי שנקרא וואדי נח'ביר (כיום נחל סחף) מקור השם מן הנוף המבותר והסחוף של האזור (לכן גם הפך להיות אזור סינגלים מפורסם לרוכבי האופנים) בארי המקורית ישבה במקום גבוה ושולט עם חשיבות אסטרטגית צבאית בשליטה על הגבול. </p>
            <ArticleImage width={150} height={150} src={"/nahabir-beerri.png"} alt="נח'ביר בארי הישנה הוקמה במקור קרוב יותר לגבול" 
            desc={`נח'ביר בארי הישנה הוקמה במקור קרוב יותר לגבול`}/>
               <ArticleImage width={150} height={150} src={"/singel-beeri.jpg"} alt="נח'ביר בארי הישנה הוקמה במקור קרוב יותר לגבול" 
            desc={`בארי נוף סחוף שבילי אופנים `}/>
            <p>אחרי קום המדינה בארי המקורית נעזבת ומועברת כ2.5ק"מ דרום מזרחה . לאזור יותר שטוח יותר מתון, מה שאפשר קרבה גם לשטחים החקלאיים. מה שמראה גם את הצרכים שהיו לפני 48 ואחרי 48 . </p>

            <h2>העוטף מהאוויר</h2>
            <p>כשמסתכלים על תצלומי אוויר של אזור עוטף עזה, אי אפשר שלא להבחין שמה שתופס את השטח הזה הוא שטחי החקלאות, החקלאות המייצגת בסופו של דבר את אותם אנשים שבידיים וברגלים עבדו את השדות עם המחרשה ועם הטרקטור ישרו את התלמים. הם האנשים שאיישו את הגבולות מתוך תפיסה שאנחנו מכירים כבר מן המקורות.<span className='indent'> "כאשר בבור אין מים מיד נחשים ועקרבים יש בו"</span> כלומר זה שלמדינה יש שטח בשליטתה על נייר זה בסדר, אבל בלי שמישהו יבנה שם בית, יגדל שם ירקות, יקים תעשיה וישמש את השטח לצרכים שונים, דיי במהרה השטח הזה לא ישאר בידי המדינה. עכשיו שאנחנו מבינים את התפקיד הלאומי והחשיבות העצומה של קיום גידולים חקלאים בגבולות המדינה. אפשר לומר שזאת לא הפעם הראשונה בהיסטוריה שחקלאות מגדירה גבולות בנגב.</p>
            <ArticleImage width={150} height={150} src={"/agriclture_from_the_air.png"} alt="עוטף עזה תצלום לוויני" 
            desc={`עוטף עזה תצלום לוויני`}/>
            
            <h2>חקלאות מגדירה גבולות </h2>
            <p>ישנם לא מעט קווים מקבילים בין עזה של ימינו, לנגב בתקופה הביזאנטית מהבחינה של היחס של המדינה לאזור והפיתוח שלו. בתקופה הביזאנטית (324-648 לספירה) רואים ממש בבירור את האינטרס של המדינה להשקיע ולפתח את אזור הנגב. </p>
            <ArticleImage width={150} height={150} src={"/byzantin_empire_6century.png"} alt="האימפריה הביזנטית במאה השישית לספירה<" 
            desc={`האימפריה הביזנטית במאה השישית לספירה`}/>
            <p>הגבול הדרום מזרחי של האימפריה  האדירה הזאת עובר בדיוק בנגב שלנו . ממש כמו שהגדנו את עוטף עזה של היום כאזור ספר שיושב על הגבול, גם אז הנגב התנהל באותה צורה. אזור ששייך לביזנטיים ועומד מנגד מול שבטי המדבר שגורמים ללא מעט צרות לאורך הגבול. </p>

            <h2>ערי הנגב הביזאנטיות </h2>
            <p>בהתאמה כמעט מוחלטת לתוואי הגבול אנחנו רואים איך שהביזנטיים מקימים ערים בנגב: ניצנה, שבטה, חלוצה, עובדת, ממשית. היו אלה ערים גדולות עם המון אנשים שחיים בהם וגם מסביב להם. כלומר הביזנטיים הגשימו את החזון של בן גוריון של כיבוש השממה כבר לפני 1500 שנה. והם עשו את זה טוב, בתקופה הביזאנטית הנגב היה מקום מאוד חי. הייתה כמות מרשימה של אנשים, מתקנים חקלאיים ומסחר. ובשביל שכל זה יתאפשר היה צריך, את תמיכתה של המדינה משום שבסופו של דבר, זה לא אזור קל לחיות בו ללא תמיכה. אם רוצים שיהיו חיים בנגב צריך לדאוג שתהיה חקלאות. </p>
            <ArticleImage width={150} height={150} src={"/avdat.jpg"} alt="גן לאומי עבדת " 
            desc={`גן לאומי עבדת `}/>
           <ArticleImage width={150} height={150} src={"/mmshit.jpg"} alt="גן לאומי ממשית" 
            desc={`גן לאומי ממשית`}/>
    
            <p>מיכאל אבן-ארי היה חוקר של החקלאות הביזנטית, וכחלק מהמחקר שלו הקים בן-ארי חווה ניסיונית בעבדת. לפי הערכות שלו היו עשרות אלפי דונמים של שטחים חקלאיים בנגב שתמכו במאות אלפי אנשים שחיו בנגב. כלומר מי שהיה מבקר בשטחי הנגב באותה התקופה היה עובר דונמים רבים של שטחים חקלאיים, כרמים, גתות, בתי בד, מבנים חקלאיים שונים והיה כנראה פוגש עשרות אנשים על הדרך. כלומר האזור הזה היה ההפך משממה אלא מאוד מאוד חי.</p>
            <ArticleImage width={150} height={150} src={"/החווה-החקלאית-המשוחזרת-ליד-עבדת.jpg"} alt="החווה החקלאית המשוחזרת ליד עבדת, ממחישה איך הבזנטים ניצלו את תוואי הנחלים לבניית טרסות" 
            desc={`החווה החקלאית המשוחזרת ליד עבדת, ממחישה איך הבזנטים ניצלו את תוואי הנחלים לבניית טרסות`}/>

            <h2>קנקני עזה בעולם</h2>
            <p>כמות הגתות שנמצאה בערי הנגב הביזנטיות  עידו על יכולת יצור אדירה.  על פי הערכות בנגב יוצר יותר יין, מכפי שצרכו. היין אוכסן בקנקנים שזכו לשם קנקני עזה. קנקני עזה משום שבנמל עזה יוצא הועמס היין שיוצר בנגב על גבי ספינות ונשלח לנמלים מסביב לים התיכון. כלומר אנחנו מדברים על הנגב בתקופה הביזאנטית כמעצמה חקלאית, אבל שלא יכולה להתקיים לבדה! היה צריך את הממשל שיבין שהגבול הדרום מזרחי של האימפריה מאוד מאוד חשוב ואנחנו צריכים שאנשים בפועל ילכו להתיישב באזור הזה, כי אם לא נעבד את האזור, נאבד אותו.</p>
            <ArticleImage width={150} height={150} src={"/gaza_jars.png"} alt="תפוצת קנקני עזה" 
            desc={`תפוצת קנקני עזה`}/>        
            
            <h2>איפה היה הצבא?</h2>
            <p>ארכיאולוג בריטי  בשם קולט חופר בלא מעט אתרים בנגב, בשבטה ובניצנה. בשבטה הוא מוצא כמעט בכל בית בור מים שמאפשרים אספקת מים לאנשים ולחקלאות, בשבטה אין מעיין או מקור מים טבעי ולכן גם שקולט הולך לחפור בשבטה הוא מבין שקשה מאוד יהיה לו לארגן אספקת מים קבועה למקום. ולכן החליט להסתמך על בורות המים הקדומים של שבטה הקדומה,  אלא מה שבאותה שנה לא ירדו מספיק גשמים ובורות המים היו ריקים. ולכן, הוא עובר לחפור בניצנה ששם יש מי תהום שופעים ובנחל מתחת לנצנה (נקרא עוג'ה אל-חפיר) נמצאה באר מים מאוד יפה ומספר בורות מים. ומה שהוא מוצא בניצנה זה החלום הרטוב של כל ארכיאולוג.</p>
            <ArticleImage width={150} height={150} src={"/Kolt_digging_mission.png"} alt="משלחת החפירות של קולט לנגב" 
            desc={`משלחת החפירות של קולט לנגב`}/>
             <ArticleImage width={150} height={150} src={"/Nitzana.jpg"} alt="ניצנה הכנסייה הדרומית ובור המים" 
            desc={`ניצנה הכנסייה הדרומית ובור המים`}/>
            
            <h2>פפירוסי ניצנה</h2>
            <p>כקולט חופר בתחת תל ניצנה הוא מוצא מאגר גדול של פפירוסים שמלמדים אותנו המון על התקופה,  על ענייני שגרת החיים, כמו מיסים נישואין וגירושין ושאר עניינים אזרחיים של אותה התקופה . 17 מן הפפירוסים האלה מתארים יחידה צבאית בשם "התאודיסיאנים הנאמנים" שמתיישבת לאורך הגבול הדרומי של האימפריה. ומה שאנחנו מגלים זה שהחיילי היחידה הזאת קיבלו הטבות  מן הממשל, הטבות כמו מתן שטחים בנגב ופטור ממיסים, וכל זאת כדי שיתפסו את השטחים האלו יעבדו אותם. ובנוסף חיילי היחידה שימשו כחיל מצב שיכול לתת מענה ביטחוני אם הם נדרשים לכך. מה שמייד מזכיר לנו שגם היום מציעים לאנשי קבע דיור מוזל והטבות מס בעבור מגורים בנגב, למשל כמו באזור סביב עיר בהד"ים ובמקומות אחרים בנגב. מסתבר, שאלו דברים שהיו קיימים כבר בתקופה הרומית-ביזאנטית.</p>
            <ArticleImage width={150} height={150} src={"/Nitzana_archive.png"} alt="המקום בו נמצאו הפפירוסים" 
            desc={`המקום בו נמצאו הפפירוסים`}/>
                 <ArticleImage width={150} height={150} src={"/Nitzana_papiros.png"} alt="פפירוס ניצנה מתאר התיישובות של יחידות צבאיות בנגב" 
            desc={`פפירוס ניצנה מתאר התיישובות של יחידות צבאיות בנגב`}/>
                 <ArticleImage width={150} height={150} src={"/cheap_housing_for_army_people.png"} alt="הטבות במגורים ובמיסים למתיישבים באזורי הגבול בימינו" 
            desc={`הטבות במגורים ובמיסים למתיישבים באזורי הגבול בימינו`}/>
            
            <h2>שורשיה של הקונספציה נעוצים בתקופה הביזנטית</h2>
            <p>מתוך הפפירוסים שנמצאו בניצנה אנחנו לומדים שבשלב מסוים השתנתה התפיסה הביטחונית לצד הגבול, חוקר בשם קרמר שעבד על הפפירוסים, מסביר את השינוי בגישה של תפיסת הגבול  כך : "השבטים הסמוכים לגבולות אזור הישוב, עמם הצליחו הביזנטיים לקיים יחסי שכנות טובים פחות או יותר, נבחרו לשמש כשומרי אותם הגבולות. הם נמנעו, תמורת שכר קבוע, מתקיפת הישובים או שיירות הסחר, ומנעו גם את השבטים היושבים בעומק המדבר מפעולות עויינות " מה באה ואומרת הגישה הזאת? אני משלם שכר נאה וקבוע לאותם שבטים כדי, ישמשו  הם, כשומרי הגבולות. "אם יהיה להם טוב יהיה לי טוב" זה היה ההיגיון מאחרי ההחלטה להפסיק לממן ישירות את יחידות הצבא על גבול האימפריה ולשלם "פרוטקשין" לשבטי המדבר . בכך חשבו הביזנטיים שהם מייתרים לשבטי המדבר את הצורך לתקוף. כי טוב להם אין להם סיבה . הייתרון לטווח הקצר ברור. אין צורך להחזיק כוח צבאי גדול במיוחד לאורך הגבול ולסכן את אנשיי, כי עכשיו משלמים למישהו אחר שיעשה את העבודה.</p>
            <ArticleImage width={150} height={150} src={"/desert_tribs.png"} alt="שבטי המדבר(אילוסטרציה)" 
            desc={`שבטי המדבר(אילוסטרציה)`}/>
            
            <h2>הקונספציה קורסת עם הכיבוש הערבי</h2>
            <p>בשלב מסוים האימפריה הביזאנטית הראתה קצת חולשה, והשבטים, אותם אלו ששילמו להם סוג של "פרוטקשיין" בסופו של דבר החליפו צד והתחברו לקבוצת האסלאם. השבטים, עזרו להם לחצות את הגבולות אל תוך פנים הארץ, ובכך אפשרו כיבוש מהיר של השטח. בשנת 622 מסתיים הכיבוש של כל המרחב של ארץ ישראל ע"י הערבים. חשוב לציין בתחומי הנגב הכיבוש לא היה אלים במיוחד. אם מסתכלים למשל על שבטה ,מוצאים ישוב שממשיך להתקיים ושהמבנים בו לא ניזוקים במעבר בין התקופות. מוצאים למשל מסגד על יד הכנסייה, לא כי חלק מאנשי העיר הלכו לכנסייה וחלק הלכו למסגד זה לא היה המצב וכנראה שהלכו רק למסגד. אבל כן מלמד שהאוכלוסייה שתפה פעולה שינה את אורחות חייה והתאסלמה. </p>
            <ArticleImage width={150} height={150} src={"/shivta_church _and_mosqe.png"} alt="שיבטה במאה השביעית כנסייה ולידו מסגד" 
            desc={`שיבטה במאה השביעית כנסייה ולידו מסגד`}/>
           
            <h2>עול המיסוי של הכיבוש הערבי</h2>
            <p>אפשר לומר שהחל משנת 622 לספירה כל המרחב הזה הופך להיות חלק מאותה ישות אסלאמית, מתוך הפפירוסים שמוצאים בניצנה אנחנו לומדים שמושל הערבי העלה מיסים בצורה כל כך חדה שהאוכלוסייה המקומית לא יכולה לממן את תשלום המיסים ולהתקיים בעת ובעונה אחת. ממש אפשר לראות שעם תחילת התקופה הערבית הנגב הולך ומתרוקן ממתיישבים. כי בלי התמיכה והעידוד של הממשל אי אפשר להתקיים באזור. בנוסף הנגב איננו עוד אזור גבול כפי שהיה תחת האימפריה הביזנטית. הוא נמצע בלב שטח ענק של אימפריה ממוסלמית שחולשת על כל המרחב ואין יותר צורך לעודד התיישבות ולאבטח אותו באמצעות מתיישבים. התוצאה היא שהאזור פשוט ננטש למשך מאות שנים.</p>
            <ArticleImage width={150} height={150} src={"/nagev.jpg"} alt="הנגב " 
            desc={`...`}/>
            
            <h2>החקלאות המודרנית  וחוסן חברתי בעוטף עזה</h2>
            <p>ההיסטוריה חוזרת על עצמה שוב. וגם היום צריך תמיכה ועידוד של המדינה כדי ליישב ולעבד את שטחי הגבול, ללא אותם המתיישבים ובלי קיום של חקלאות לאורך הגבול, לא תהיה למדינה יכולת לשלוט על מה שקורה שם במקרה הטוב, ובמקרה הרע יגרום לישויות אחרות לתפס את השטח וכל האזור הזה יעבור שינויים מאוד משמעותיים. </p>
            <p>לעומת זאת תמיכה של הממשל בלהביא אנשים איכותיים וטובים, לפתח את אזור בחקלאות, בתעשייה, בהיי טק, בתיירות, להחזיר את תחושת הביטחון אל האזור. יחד עם זאת להנציח את העבר המפואר של כל קהילה וקהילה. וכן גם הטראומה של השביעי באוקטובר תהיה חלק מהסיפור. וכך תבנה חברה חסונה. חברה חסונה, הינה חברה שמצליחה לשמור על הזהות שלה על אף הפרעות סביבתיות וטראומות קולקטיביות, שנגרמים לה. הזהות נשמרת ומועברת לדורות הבאים ע"י חינוך מיתוסים חברתיים ושימור הזיכרון הקולקטיבי. </p>
            <ArticleImage width={150} height={150} src={"/beeri_not_coming_back.png"} alt="כתבה בארי מתלבטים האם לחזור" 
            desc={``}/>
            <p>תרבויות שויתרו על הזהות שלהם על המנהגים שלהם על זיכרון הקולקטיבי שלהם פשוט נעלמו מעל דפי ההיסטוריה, כך קרה לפלישתים לנבטים ואפילו לרומאים. העם היהודי הוא דוגמה נפלאה בהיבט הזה, כיהודים אנחנו מצווים ב"הגדת לבנך" שימור ההיסטוריה והסיפור שלנו כעם לא רק מלמד אותנו על ניסיונם של אלו שהיו כאן לפנינו אלא גם שומר עליינו חסונים ומלוכדים. עם ישראל חי.    </p>
            <p></p>
        </main>
    )
}