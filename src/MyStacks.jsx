import React from 'react';
import "./MyStacks.css"; 

export default function MyStacks() {
    return (
        <div className="stacks">
        <div className="stacks__head">
            <h1 className="stacks__title" >My Stacks</h1>
            <hr className="stacks__head__hr" />
        </div>
        <div className="stacks__wrapper">
            <div className="stack__img">
                <img 
                    src="python.png"
                    alt="stack__img__err"
                    className="stack__image up"
                /> 
                <img 
                    src="js.png"
                    alt="stack__img__err"
                    className="stack__image down"
                />
                 <img 
                    src="react.png"
                    alt="stack__img__err"
                    className="stack__image up"
                />
                 <img 
                    src="django.png"
                    alt="stack__img__err"
                    className="stack__image down"
                />
                <img 
                    src="html.png"
                    alt="stack__img__err"
                    className="stack__image up"
                />
            </div>
        </div>
            <div className="stack__text">
                <p className="stack__txt" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque odio ac magna scelerisque sollicitudin. Sed in magna placerat odio egestas ultricies. Cras ut scelerisque nulla. Etiam neque diam, tincidunt non eleifend quis, dictum eget purus. Sed porttitor est eget dignissim ullamcorper. Nam ligula urna, vulputate sed dignissim quis, varius ac est. </p>
            </div>
            <hr />
        </div>
    )
}
