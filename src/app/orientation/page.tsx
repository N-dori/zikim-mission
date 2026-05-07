"use client"
import React, { useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF , Polygon  } from '@react-google-maps/api';
import Link from 'next/link';
import { locations } from '../assets/data/locations';
import { gazaPolygonOptions , gazaPolygon, shaarHaNegevPolygon, shaarHaNegevPolygonOptions, HofAshkelonPolygon, hofAshkelonPolygonOptions, eshkolPolygon, eshkolPolygonOptions, merhavimPolygon, merhavimPolygonOptions} from '../assets/data/polygons';
import { BackSvg } from '../assets/svgs/BackSvg';
import { apiFetch } from '../libs/apiClient';

type Props = {}

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 31.604737581,
  lng: 34.519742921
}


export default function Orientation({ }: Props) {
  const [, setMap] = useState(null)
  const [zoom] = useState(11)
  const [isMarkerActive, setIsMarkerActive] = useState<null | string>(null)
  const [wikiHtml, setWikiHtml] = useState<null | string>(null)
  const [wikiStatus, setWikiStatus] = useState<'idle' | 'loading' | 'ready' | 'empty'>('idle')

  const getWikiPrase = async (txt: string) => {
    setWikiHtml(null)
    setWikiStatus('loading')
    try {
      const res = await apiFetch('/wiki', {
        method: 'POST',
        auth: false,
        body: JSON.stringify({ txt }),
      })
      if (!res.ok) { setWikiStatus('empty'); return }
      const { data } = await res.json()
      const key = Object.keys(data.query.pages).join()
      const extract = data.query.pages[key]?.extract
      if (extract) {
        setWikiHtml(extract)
        setWikiStatus('ready')
      } else {
        setWikiStatus('empty')
      }
    } catch (err) {
      console.error('wiki fetch failed', err)
      setWikiStatus('empty')
    }
  }
  
  const { isLoaded } = useJsApiLoader(
    {
    id:'google-map-script',
    googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY||'',
  })

  const onLoad = useCallback(function callback(map: any) {
    map.setZoom(zoom)
    setMap(map)
  }, [])
  const onUnmount = useCallback(function callback(_map: any) {
    setMap(null)
  }, [])
  const handelMapClick = (ev:any) =>{
    
    setIsMarkerActive(null)
    console.log("latitide = ", ev.latLng.lat());
    console.log("longitude = ", ev.latLng.lng());
  } 
  
  return (
    <main className='map-warrper gc2 tac`'>
      <section className='title-container grid '>
      <h2 className='title gc2'>קחו לכם רגע להתמצא במרחב </h2>
      <section className='color-index-container flex-col gc2'>
        <div className='region flex-ac'><span className='region-color region1'></span>מועצה אזורית חוף אשקלון</div>
        <div className='region flex-ac'><span className='region-color region2'></span>מועצה אזורית שער הנגב  </div>
        <div className='region flex-ac'><span className='region-color region3'></span>מועצה אזורית אשכול</div>
        <div className='region flex-ac'><span className='region-color region4'></span>מועצה אזורית מרחבים</div>
        <span className='Image-desc'>**מסומנים על המפה ישובי הנגב המערבי שהוקמו בעשור שלפני קום המדינה</span>
      </section>
      <Link href={"/"} className='back-btn flex-jc-ac '><BackSvg/></Link>
      </section>
      {
        isLoaded ? <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={(ev:any) => {
          handelMapClick(ev)
          
          setIsMarkerActive(null)
            }
          }
          onLoad={onLoad}
          onUnmount={onUnmount}
          >
          <>
            {locations.map((loc) =>
              <MarkerF key={loc.id} visible={true} position={loc} onClick={() => {
                getWikiPrase(loc.name)
                
                setIsMarkerActive(loc.id)
              }}>
                {
                  isMarkerActive === loc.id ?
                  <InfoWindowF position={loc} onCloseClick={() => setIsMarkerActive(null)}>
                    <div className='wiki-info'>
                      <h3 className='wiki-info-title'>{loc.name}</h3>
                      {wikiStatus === 'loading' && <p className='wiki-info-status'>טוען מידע...</p>}
                      {wikiStatus === 'ready' && wikiHtml &&
                        <div className='wiki-info-body' dangerouslySetInnerHTML={{ __html: wikiHtml }} />}
                      {wikiStatus === 'empty' && <p className='wiki-info-status'>אין סיכום זמין</p>}
                      <Link className='wiki-info-link'
                        href={`https://he.wikipedia.org/wiki/${loc.name}`}
                        target='_blank' rel='noopener noreferrer'>
                        לקריאה נוספת בויקיפדיה ←
                      </Link>
                    </div>
                  </InfoWindowF> : <></>
                }

              </MarkerF>
              
            )}
          </>
          <Polygon
      paths={gazaPolygon}
      options={gazaPolygonOptions}
      />
          <Polygon
      paths={shaarHaNegevPolygon}
      options={shaarHaNegevPolygonOptions}
      />
          <Polygon
      paths={HofAshkelonPolygon}
      options={hofAshkelonPolygonOptions}
      />
          <Polygon
      paths={eshkolPolygon}
      options={eshkolPolygonOptions}
      />
          <Polygon
      paths={merhavimPolygon}
      options={merhavimPolygonOptions}
      />
        </GoogleMap>
          : <></>
        }

    </main>
  )
}