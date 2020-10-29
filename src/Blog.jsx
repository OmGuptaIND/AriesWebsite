import React from 'react';
import './Blog.css';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Chip, Tooltip } from '@material-ui/core';

export default function Blog({title,text,likes,views,badge}) {
    return (
        <div className="blog">
            <div className="blog__wrapper">
                <p>{title}</p>
                <div className="blog__text">
                    {text}
                </div>
                <div className="blog__chips">
                    {badge.map(data => (
                        <Chip className="blog__chip" color="primary" label={data} />
                    ))}
                </div>
                <div className="blog__function">
                    <span className="blog__share"><ShareIcon /></span>
                    <Tooltip title={views} arrow>
                        <span className="blog__share"><VisibilityIcon /></span>
                    </Tooltip>
                    <Tooltip title={likes} arrow>
                        <span className="blog__share"><FavoriteBorderIcon /></span>
                    </Tooltip> 
                    <span className="blog__bookmark"><BookmarkBorderIcon /></span>
                </div>
                <div className="blog__more">
                    <p className="more__btn" >View<ExpandMoreIcon className="more__arrow" /></p>
                </div>
            </div>
        </div>    
    
    )
}
