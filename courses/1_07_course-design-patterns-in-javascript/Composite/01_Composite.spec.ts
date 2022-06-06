import { describe, expect, it } from 'vitest';
import { Circle, GraphicObject, Square } from './01_Composite';

const drawInScreen = `
Group 0
* Red Square
* Yellow Circle
* Group 1
** Blue Circle
** Blue Square
`;

describe.skip('Composite', () => {
  it('should draw with geometric shapes', () => {
    const drawing = new GraphicObject();
    drawing.children.push(new Square('Red'));
    drawing.children.push(new Circle('Yellow'));

    const group = new GraphicObject();
    group.children.push(new Circle('Blue'));
    group.children.push(new Square('Blue'));

    drawing.children.push(group);
    console.log(drawing.toString());
    expect(drawing.toString()).toBe(drawInScreen);
  });
});
