import React from 'react'
import CreatePlayer from './CreatePlayer'


type Props = {}

export default function Group({ }: Props) {
    return (
        <main className='group-trivia-container gc2'>
            <h2>חידון חטיבה 179</h2>
            <p>חידון קצר שחושף פרטים מעניינים ומפתיעים על חטיבה 179. הוראות שימוש:   </p>
                <ul className='explnation-txt'>
                    <li>

                1.כדי לפתוח חדר משחק קבוצתי, הכניסו את שם המחלקה שלכם (זה יהיה גם שם החדר! ודאו שכולם נכנסים עם אותו השם בדיוק!)

                    </li>
                    <li>
                2.בוחרים כינוי ותמונה.

                    </li>
                    <li>
                3.מתחילים לשחק .

                    </li>
                </ul>
             
            <p>    שימו לב מי שפותח את החדר ראשון הוא מנהל הקבוצה ורק הוא יכול להתחיל משחק ולהעביר לשאלה הבאה.</p>
            <CreatePlayer/>
           
        </main>
    )
}