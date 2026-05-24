import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {
    return (
        <main className='gc2'>
            <h2>חידונים</h2>
            <h3 className='trivia-intro'>בחרו את החידון שתרצו לשחק:</h3>
            <section className='game-type-btns-container flex-col'>

                <Link href={'/179trivia'} className='w100'>
                    <button type='button' className='game-type-btn'>חידון חטיבה 179</button>
                </Link>

                <Link href={'/otef-trivia'} className='w100'>
                    <button type='button' className='game-type-btn'>חידון יישובי העוטף</button>
                </Link>

                <Link href={'/otef-chronicles'} className='w100'>
                    <button type='button' className='game-type-btn'>רצועת עזה — חידון היסטורי</button>
                </Link>

            </section>
        </main>
    )
}
