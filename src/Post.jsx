import React , {useState , useEffect} from 'react';
import './Post.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser'
import { Button } from '@material-ui/core';
import post_data from './Post_data';
import Blog from './Blog';
import Success from './Success';
import {db} from './firebase';
import firebase from 'firebase';
import {useStateValue} from './StateProvider';
import { useHistory } from 'react-router-dom';
export default function Post() {

    const [{user},dispatch]=useStateValue();
    const [posts,setPosts]=useState([])
    const [postData,setPostData]=useState('');
    const [title,setTitle]=useState('')
    const [more , setMore]=useState(false);
    const [successOpen , setSuccessOpen] = useState(false);
    const [badge, setBadge] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id:doc.id , post:doc.data()})))
        })
     }, []);
 

    const history = useHistory();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    function getStyles(name, badge, theme) {
        return {
            fontWeight:
            badge.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        };
        }    
    const names = [
        "React",
        "Python",
        "JavaScript",
        "C++",
        "General Blog",
        "Others"    
    ];

    const handletag = (e) => {
        console.log(badge);
        setBadge(e.target.value);
    };

    const handleTitle = (e) =>{
        console.log(e.target.value);
        return (
            setTitle(e.target.value)
        )
    }

    const handleEditor = (e,editor) => {
        const post = (editor.getData());
        setPostData(post);
    }

    const handlepost = (e) =>{
        db.collection('posts').add({
            comments:6000,
            likes:5000,
            text:String(postData),
            title:title,
            badge:badge,
            userName:user?.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        }).then(data => {
            console.log("Data Posted !");
            setSuccessOpen(true);
            setTitle("");
            setPostData("");
            setBadge([]);
            setTimeout(function() {
                history.push('/');
            }, 2000);
           
        }).catch(err => alert(err.message))
    }

    const theme = useTheme();
    
    return (
        <div className="post">
            <img 
                src="https://firebasestorage.googleapis.com/v0/b/aries-website-9da3e.appspot.com/o/site_images%2Fhero__middle.gif?alt=media&token=ac24efe9-ec49-45f3-beab-ad022b16d463"
                alt="err"
                className="image__post"
            />
            <div className="post__data">
                <h1>Post</h1>
                <input 
                    placeholder="Enter Title..."
                    className="post__heading"
                    value={title}
                    name="title"
                    onChange={handleTitle}
                />
                <div className="post__editor" >
                    <CKEditor 
                        editor={ClassicEditor}
                        value={postData}
                        onChange={handleEditor} 
                    />
                </div>

                <FormControl className="post__form" >
                    <InputLabel id="demo-mutiple-chip-label"  className="post__badge">Badge</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        className="post__drop"
                        value={badge}
                        onChange={handletag}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => {
                            <div className="post__chip">
                                {selected.map((value) => (
                                    <Chip key={value} label={value} className="post__chip" />
                                ))}
                            </div>
                            }}
                    MenuProps={MenuProps}
                    >
                    {names.map((value) => (
                        <MenuItem key={value} value={value} style={getStyles(value, badge, theme)}>
                            {value}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>  
                <br />
                <Button className="post__btn" variant="contained" color="primary"  onClick={handlepost}>
                    Post 
                </Button> 
                <hr />
                <div className="post__previous">
                    <h2 className="post__previous__head">Your Posts</h2>
                    {posts?.length>0?posts?.map((data,index) => {
                        
                        console.log(posts)
                        const text = String((data.post.text).substring(0,250))
                        if (index < 3 && more === false && data.post.userName===user?.displayName){
                            return (
                                <Blog 
                                    key={data.id}
                                    id={data.id}
                                    title={data.post.title}
                                    text={text}
                                    views={data.post.views}
                                    likes={data.post.likes}
                                    badge={data.post.badge}
                                />
                            )
                        }else if (data.post.userName !== user?.displayName){
                            <h1>No Posts From You yet</h1>
                        }
                    }):<h1>No Posts from you yet...</h1>}
                </div>           
            </div>
            <Success 
                open={successOpen}
                onClose={setSuccessOpen}
                text="Your Awesome Post is now ready for the World!"
            />
            

        </div>
    )
}
