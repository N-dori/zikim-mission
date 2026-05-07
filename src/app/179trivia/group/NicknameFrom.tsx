import Image from 'next/image';
import React from 'react';

type NicknameFromProps = {
  groupName: string;
  setNickName: (nickName: string) => void;
  error: string;
  setError: (error: string) => void;
  handelSubmit: (ev: any) => void;
  nickName: string;
};

export default function NicknameFrom({
  error,
  nickName,
  setNickName,
  groupName,
  handelSubmit,
}: NicknameFromProps) {
  const imgUrl = nickName
    ? `https://robohash.org/${encodeURIComponent(nickName)}?set=set4`
    : '';

  return (
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
          {imgUrl && (
            <div className='flex-jc-ac'>
              <Image src={imgUrl} width={200} height={200} alt={'user image'} />
            </div>
          )}
          <button className='open-room-btn'>קדימה מתחילים</button>
        </form>
      </div>
    </>
  );
}
