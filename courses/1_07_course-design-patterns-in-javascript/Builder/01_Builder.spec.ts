import { describe, expect, it } from 'vitest';
import { HtmlBuilder, htmlP, htmlUl, Tag } from './01_Builder';

describe('Builder', () => {
  describe('super old way fashion', () => {
    it('should say hello', () => {
      expect(htmlP.join('')).toEqual('<h1>Hello</h1>');
    });

    it('should render a list', () => {
      expect(htmlUl.join('')).toEqual(
        `<ul>
  <li>Hello</li>
  <li>World</li>
  <li>Vitest</li>
</ul>`
      );
    });
  });

  describe('HtmlBuilder', () => {
    it('should render a list of items', () => {
      const builder = new HtmlBuilder('ul');
      builder.addChild('li', 'Hello');
      builder.addChild('li', 'World');
      builder.addChild('li', 'Vitest');
      expect(builder.root.toString()).toEqual(
        `<ul>
  <li>
    Hello
  </li>
  <li>
    World
  </li>
  <li>
    Vitest
  </li>
</ul>
`
      );
    });

    it('should render a list of items', () => {
      const builder = Tag.create('ul');
      builder.addChild('li', 'Hello');
      builder.addChild('li', 'World');
      builder.addChild('li', 'Vitest');
      expect(builder.root.toString()).toEqual(
        `<ul>
  <li>
    Hello
  </li>
  <li>
    World
  </li>
  <li>
    Vitest
  </li>
</ul>
`
      );
    });

    it('should render a NEW list of items', () => {
      const builder = new HtmlBuilder('ul');
      builder.addChild('li', 'Hello');
      builder.addChild('li', 'World');
      builder.addChild('li', 'Vitest');
      expect(builder.root.toString()).toEqual(
        `<ul>
  <li>
    Hello
  </li>
  <li>
    World
  </li>
  <li>
    Vitest
  </li>
</ul>
`
      );
      builder.clear();
      builder.addChild('li', 'Hello');
      expect(builder.root.toString()).toEqual(
        `<ul>
  <li>
    Hello
  </li>
</ul>
`
      );
    });

    it('should render a list fluent', () => {
      const builder = new HtmlBuilder('ul');
      builder
        .addChildFluent('li', 'Hello')
        .addChildFluent('li', 'World')
        .addChildFluent('li', 'Vitest');
      expect(builder.root.toString()).toEqual(
        `<ul>
  <li>
    Hello
  </li>
  <li>
    World
  </li>
  <li>
    Vitest
  </li>
</ul>
`
      );
    });
  });
});
