import React, { useEffect, useState } from 'react';
import "./Yt.css";
import Axios from 'axios';
import { Button } from '@material-ui/core';

export default function Yt() {
    const [data,setData]=useState([]);
    const [more , setMore]=useState(false)  
    useEffect(() => {
        async function fetchData() {
        await Axios.get('https://www.googleapis.com/youtube/v3/playlistItems' , {
        params:{
            part:'snippet',
            playlistId:"PLB4dyKeSZEApH3BYXaMJf6XpGDMwFpxyE", 
            maxResults:50
        }
        }).then(data => {
            setData(data)
        }).catch(err => console.log(err));
        }
        fetchData()
    }, [])
    console.log(data)
    console.log(data?.data?.items)


    return (
        <div className="yt">
            <h1 className="yt__head">Latest Vedios</h1>
            <hr className="yt__head__hr" />
            <div className="yt__vedios">  
                {data?.data?.items?.map((item,index) => {
                    console.log(item?.snippet?.resourceId?.videoId)
                    const vedio_link = `http://www.youtube.com/embed/${item?.snippet?.resourceId?.videoId}?enablejsapi=1&controls=1&fs=0`
                    if(index < 3 && more === false){
                        return (
                        <>
                            <div className="yt__wrapper" id={item?.id} key ={item?.id}>
                                <iframe 
                                    id={item?.id} 
                                    type="text/html" 
                                    // width="640" 
                                    // height="390"
                                    src={vedio_link}
                                    frameborder="0"
                                    alt="vedio__err"
                                    className="yt__vedio"
                                />
                                <div className="yt__data" >
                                    <div className="yt__color"></div>
                                    <p className="yt__title" >{item?.snippet?.title}</p>
                                </div>
                            </div>  
                        </>
                        );
                    }
                    
                })}
                <div onClick = {() => setMore(true)} className="yt__more"><Button>View all</Button></div>
                
            </div>
        </div>
    )
}
