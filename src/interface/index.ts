export interface TextProps {
    text: string;
    font: string;
    fontSize: string;
    fontColor: string;
    position: { x: number; y: number };
    dragging: boolean,
    dragStart: {x:number, y: number}
  }