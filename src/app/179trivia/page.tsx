
import Link from 'next/link'

type Props = {}

export default function page({ }: Props) {


    return (
        <main className='gc2'>
            <h2>חידון חטיבה 179</h2>
            <h3 className='trivia-intro'>כניסה לחידון - חידון קצר שחושף פרטים מעניינים ומפתיעים על חטיבה 179. באפשרותכם לשחק משחק יחיד או משחק קבוצתי</h3>
   <section className=' game-type-btns-container flex-col' >

   <Link href={"/179trivia/singel"} className='w100'><button type='button' className='game-type-btn'  >משחק יחיד</button></Link>

   <Link href={"/179trivia/group"} className='w100'><button type='button' className='game-type-btn'  >משחק קבוצתי</button></Link>
   
   </section>

        </main>

    )
}