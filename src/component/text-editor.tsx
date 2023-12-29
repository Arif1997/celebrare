import React, { useRef, useState } from 'react';
import { TextProps } from '../interface';
import { fontSizes, wordFonts } from '../data';



const TextEditor: React.FC = () => {
    const [textState, setTextState] = useState<TextProps>({
        text: '',
        font: 'Arial',
        fontSize: '16px',
        fontColor: '#000000',
        position: { x: 0, y: 0 },
        dragging: false,
        dragStart: { x: 0, y: 0 }
    });
const editorDiv = useRef<HTMLDivElement>(null);
    const [texts, setTexts] = useState<TextProps[]>([]);
    const { text, font, fontSize, fontColor, position} = textState;

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTextState({
            ...textState,
            [e.target.name]: e.target.value,
        });
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>, index: number) => {

        const updatedTexts = [...texts];
        updatedTexts[index] = {
            ...updatedTexts[index],
            dragging: true,
            dragStart: { x: e.clientX - updatedTexts[index].position.x, y: e.clientY - updatedTexts[index].position.y }
        };
        setTexts(updatedTexts);
    };

    
    const handleMouseUp = (index: number) => {
        const updatedTexts = [...texts];
        updatedTexts[index] = {
            ...updatedTexts[index],
            dragging: false,
        };
        setTexts(updatedTexts);
    };


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {

        if (texts[index].dragging && editorDiv.current) {
            const editorRect = editorDiv.current?.getBoundingClientRect();
            if (editorRect) {
                const maxX = editorRect.width - parseFloat(texts[index].fontSize);
                const maxY = editorRect.height - parseFloat(texts[index].fontSize);
    
                const x = e.clientX - texts[index].dragStart.x;
                const y = e.clientY - texts[index].dragStart.y;
    
                const boundedX = Math.min(Math.max(-250, x), maxX);
                const boundedY = Math.min(Math.max(-200, y), maxY);
    
                setTexts((prevTexts) => {
                    const updatedTexts = [...prevTexts];
                    updatedTexts[index] = {
                        ...updatedTexts[index],
                        position: { x: boundedX, y: boundedY },
                    };
                    return updatedTexts;
                });
            }
        }
    };

    const handleAddText = () => {
        setTexts([...texts, textState]);
        setTextState({
            text: '',
            font: 'Arial',
            fontSize: '16px',
            fontColor: '#000000',
            position: { x: 0, y: 0 },
            dragging: false,
            dragStart: { x: 0, y: 0 }
        });
    };

    return (
        <div>
            <input
                type="text"
                name="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Type anything"
            />
            <select name="font" value={font} onChange={handleTextChange}>
                {wordFonts.map((font, index)=><option value={font} key={index}>{font}</option>)}
                
            </select>
            <select name="fontSize" value={fontSize} onChange={handleTextChange}>
                {fontSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
            <input
                type="color"
                name="fontColor"
                value={fontColor}
                onChange={handleTextChange}
            />
            <button onClick={handleAddText}>Add Text</button>

            <div
                style={{ position: 'relative', width: '600px', height: '500px', borderRadius: '20px', backgroundColor: 'lightGray' }}
                ref={editorDiv}

            >
                {texts.map((textItem, index) => (
                    <p
                        key={index}
                        onMouseDown={(e) => handleMouseDown(e, index)}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseUp={() => handleMouseUp(index)}
                        style={{
                            fontFamily: textItem.font,
                            fontSize: textItem.fontSize,
                            color: textItem.fontColor,
                            position: 'relative',
                            cursor: 'move',
                            left: textItem.position.x + 'px',
                            top: textItem.position.y + 'px',
                        }}
                    >
                        {textItem.text}
                    </p>
                ))}

                {text && (
                    <p style={{ fontFamily: font, fontSize, color: fontColor, top: `${position.y}`, left: `${position.x}` }}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TextEditor;