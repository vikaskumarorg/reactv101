import {accordianData} from './data';
import { useState } from 'react';
import './App.css';

const Accordian = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleSection = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            {accordianData.map((item, index) => (
                <div key={item.id} className="accordionItem">
                    <div className="accordionHeader" onClick={() => toggleSection(index)}>
                        {item.title}
                        <span className={`arrow ${activeIndex === index ? 'up' : 'down'}`}></span>
                    </div>
                    {activeIndex === index && <div className="accordionContent"><p>{item.content}</p></div>}
                </div>
            ))} 
            </>
    );
}
export default Accordian;