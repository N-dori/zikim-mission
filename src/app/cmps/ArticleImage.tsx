import Image from 'next/image'
import React from 'react'

type Props = {
    width:number,
    height:number,
    src:string,
    alt:string,
    desc:string
}

export default function ArticleImage({width,height,src,alt,desc}: Props) {
  return (
    <>
    <Image className="Image" width={width} height={height} src={src} alt={alt} />
    <span className="Image-desc">{desc}</span>

    </>

)
}