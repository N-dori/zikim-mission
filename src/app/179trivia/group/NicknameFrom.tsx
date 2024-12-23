import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect } from 'react';

type NicknameFromProps = {
  groupName: string;
  setNickName: (nickName: string) => void;
  setImgUrl: (imgUrl: string) => void;
  error: string;
  setError: (error: string) => void;
  imgUrl: string;
  handelSubmit :(ev:any) =>void ,
  session:any
  nickName:string
};

export default function NicknameFrom({
  error,
  nickName,
  setNickName,
  groupName,
  setImgUrl,
  imgUrl,
  handelSubmit,
  session
}: NicknameFromProps) {
 

  useEffect(() => {
    const creactPlayerImage = async () => {
      if (session?.user?.name) {
        try {
          const url = `https://robohash.org/${session.user.name}?set=set4`
          const res = await fetch(url);
          if (res.ok) {
            const blob = await res.blob();
            const imgUrl = URL.createObjectURL(blob);
            console.log('imgUrl', imgUrl);
            setImgUrl(url);
          }
        } catch (err) {
          console.log('could not fetch robohash img', err);
        }
      }
    };

    creactPlayerImage();
  }, [session, setImgUrl]);

  return (
    session ? (
      <>
        <h2 className='tac'>לפני שנכנסים לחדר {groupName} בחרו כינוי יחודי למשחק</h2>
        <div className='flex-col'>
          <form className='flex-col' onSubmit={handelSubmit}>
            <input
              className='group-name-input'
              type='text'
              onChange={(ev) => setNickName(ev.target.value)}
              placeholder='בחרו כינוי יחודי משלכם'
            />
            {error && <span className='error-txt'>{error}</span>}
            {imgUrl && <div className='flex-jc-ac'><Image src={imgUrl} width={200} height={200} alt={'user image'} /></div> }
            <button className='open-room-btn'>קדימה מתחילים</button>
          </form>
        </div>
      </>
    ) : null
  );
}