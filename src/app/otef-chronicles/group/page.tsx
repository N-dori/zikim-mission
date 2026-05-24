import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ChroniclesCreatePlayer from './ChroniclesCreatePlayer'

export default async function Group() {
    const session = await getServerSession(authOptions)

    return (
        <main className='group-trivia-container gc2'>
            <h2>רצועת עזה — משחק קבוצתי</h2>
            <p>חידון היסטורי על עזה, הנגב והעוטף. הוראות שימוש:</p>
            <ul className='explnation-txt'>
                <li>1. כדי לפתוח חדר משחק קבוצתי, הכניסו את שם המחלקה שלכם (זה יהיה גם שם החדר! ודאו שכולם נכנסים עם אותו השם בדיוק!)</li>
                <li>2. בוחרים כינוי ותמונה.</li>
                <li>3. מתחילים לשחק.</li>
            </ul>
            <p>שימו לב מי שפותח את החדר ראשון הוא מנהל הקבוצה ורק הוא יכול להתחיל משחק ולהעביר לשאלה הבאה.</p>
            {session ? (
                <ChroniclesCreatePlayer />
            ) : (
                <section className='signup-cta flex-col flex-jc-ac'>
                    <p className='tac'>כדי לפתוח חדר או להצטרף יש להירשם או להתחבר</p>
                    <Link
                        className='open-room-btn'
                        href={`/login?callbackUrl=${encodeURIComponent('/otef-chronicles/group')}`}
                    >
                        כניסה / הרשמה
                    </Link>
                </section>
            )}
        </main>
    )
}
