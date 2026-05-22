import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {
    return (
        <main className='gc2'>
            <h2>חידון יישובי העוטף</h2>
            <h3 className='trivia-intro'>
                יוצאים למסע היכרות עם יישובי העוטף — חידון קליל ומפתיע על ההיסטוריה, הטבע,
                האנשים והעובדות המוזרות שמאחורי הקיבוצים שראיתם על המפה.
            </h3>
            <section className='game-type-btns-container flex-col'>
                <Link href={'/otef-trivia/singel'} className='w100'>
                    <button type='button' className='game-type-btn'>משחק יחיד</button>
                </Link>
            </section>
        </main>
    )
}
