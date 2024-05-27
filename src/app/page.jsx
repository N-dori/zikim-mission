import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation'
import Link from "next/link";
export default async function Home() {
  
  const session =await getServerSession(authOptions)
  console.log('session',session);

  const userEmail =session?.user?.email
 
  if(userEmail){
    redirect(`/menu`)
  }
  return (
     <main className="intro-container gc2">
      <Image width={100} height={400} src='/hero.jpg' style={{ height: '40%' }} alt="pic" className="hero-img" layout="responsive" />
      <div className="quote-container flex-jc-ac"><p className="quote tac">"עם שאינו יודע את עברו, ההווה שלו דל ועתידו לוט בערפל" (יגאל אלון)</p></div>
      <section className="title-container flex-col">
        <h1 className="main-title">קובץ ידיעת הארץ </h1>
        <h2 className="sub-title">תעסוקה מבצעית קו זיקים-בארי</h2>
      </section>
      <section className="intro-txt-container">
        <h2>מפקדים יקרים-</h2>
        <p>קובץ ידיעת הארץ זה מוגש לכם במסגרת תעסוקה מבצעית של הגדוד במרחב זיקים-בארי, מישור החוף הדרומי של ישראל בין
          רצועת עזה לאשקלון. מטרת המסמך היא הענקת ידע והבנה כללית של האזור שבתקווה תצור מודעות רחבה יותר, שתחזק את
          הקשר ותעורר רגשי שייכות אל המרחב בו פועל הגדוד. כמאמר הציטוט המפורסם "עם שאינו יודע את עברו, ההווה שלו דל
          ועתידו לוט בערפל" (יגאל אלון). יגאל אלון בציטוטו המפורסם רוצה לומר שעם, שאינו יודע את ההיסטוריה העתיקה של
          ארצו, מקורו, תרבותו, משול לעץ ללא שורשים. אפשר לומר שללא שורשים איתנים, המוצבים על אדני ההיסטוריה, אין
          התפתחות אין צמיחה שכן כל משב רוח קלה יטלטל יזעזע יסדוק את חוסנו של העם. </p>

        <p>מסמך זה יסקור בקצרה נקודות ציון חשובות בהיסטוריה העתיקה של מישור החוף הדרומי של ישראל בדגש על רצועת עזה,
          נזכיר וניגע באירועים היסטוריים חשובים שעיצבו את המרחב למה שאנחנו מכירים היום. ולמה כל זה חשוב?! מכיוון שטבעה
          של ההיסטוריה היא לחזור על עצמה. נראה כיצד דפוסי פעולה צבאיים שנלקחו בעת העתיקה יושמו במלחמת העצמאות. או איך
          קיום של חקלאות במרחב הנגב המערבי אפשר התיישבות בארץ הנושבת, ואת ביטחונם של תושבי הארץ גם בעת העתיקה וגם בעת
          החדשה. </p>
        <p> אז לפני שנצלול פנימה לעובי הקורה בואו נקח רגע להכיר את המרחב בו אנחנו פועלים.</p>
        <p>יהי רצון וקובץ זה יסייע לנו להיות עוד קצת יותר טובים בעמידתנו במשימה מתוך שליחות ואהבת העם והארץ.

        </p>
       <p>
       בברכה,<br/>
          נדב דורי- מרכז התוכן<br/>
          טוביה ברוקנר- מג״ד<br/>

       </p>
      </section>
      <div className="flex-jc-ac">
    {session?.user?.email? <Link className="start-btn-warpper" href={"/menu"}><button className="start-btn"   >מוכנים בואו נתחיל!</button></Link> :
    <Link className="start-btn-warpper" href={"/auth/signup"}><button className="start-btn"   >מוכנים בואו נתחיל!</button></Link>
    }

      </div>
    </main> 
  );
}
