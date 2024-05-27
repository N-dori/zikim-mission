import connectMongoDB from '../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../models/user'

export async function PUT(request) {

    try {

        const { email, articel, scrollProcentage } = await request.json()

       
            await connectMongoDB()
            const user = await User.findOne({ email })
            console.log('user', user);

            if (articel === 'early History') {
                user.readingProgress.isEarlyHistoryCompleted = scrollProcentage
            } else {
                user.readingProgress.isOtefAzaCompleted = scrollProcentage
            }
            await User.findByIdAndUpdate(user._id, { readingProgress })
            //  to get only the id
            
            
            return NextResponse.json({ user }, { status: 201 })
        

    } catch (err) {
        console.log('had a problem updatinging user reading progress ', err);
        return NextResponse.json({ message: "had a problem finding user" }, { status: 500 })
    }
}