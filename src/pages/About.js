import Skills from "../components/Skills";

function About () {  
    return (
        <div className='page'>
            <div className="about-container"> 
                <div className="About">
                    <h1>About Me</h1>
                    <p>I am a 4th year at Northeastern University studying Computer Engineering and Computer Science with a Minor in Math.</p>
                </div>
                
                <Skills />
            </div>
        </div>
    )
}

export default About;